import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Safe environment variable handling - never throw errors
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || ''; // Note: matches .env.local variable name
const NOTION_TOKEN_V2 = process.env.NOTION_TOKEN_V2 || '';
const NOTION_PRODUCTS_DB_ID = process.env.NOTION_PRODUCTS_DB_ID || '';
const NOTION_API_KEY_PRODUCTS = process.env.NOTION_API_KEY_PRODUCTS || '';

// Debug logging in development
if (process.env.NODE_ENV === 'development') {
    console.log('[Notion] NOTION_TOKEN:', NOTION_TOKEN ? '✓ Set' : '✗ Missing');
    console.log('[Notion] DATABASE_ID:', DATABASE_ID ? '✓ Set' : '✗ Missing');
    console.log('[Notion] NOTION_TOKEN_V2:', NOTION_TOKEN_V2 ? '✓ Set' : '✗ Missing');
    console.log('[Notion] NOTION_PRODUCTS_DB_ID:', NOTION_PRODUCTS_DB_ID ? '✓ Set' : '✗ Missing');
    console.log('[Notion] NOTION_API_KEY_PRODUCTS:', NOTION_API_KEY_PRODUCTS ? '✓ Set' : '✗ Missing');
}

// Official client for querying databases (only initialize if token exists)
export const notion = new Client({
    auth: NOTION_TOKEN || undefined,
});

// Separate client for products DB (may have different integration)
export const notionProducts = new Client({
    auth: NOTION_API_KEY_PRODUCTS || NOTION_TOKEN || undefined,
});

// Unofficial client for react-notion-x to get full block data
export const notionAPI = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER || undefined,
    authToken: NOTION_TOKEN_V2 || undefined,
});

// Export for checking availability
export const isNotionConfigured = Boolean(NOTION_TOKEN && DATABASE_ID);
export { NOTION_TOKEN, DATABASE_ID, NOTION_PRODUCTS_DB_ID };

// Company Pages Database
const NOTION_DATABASE_ID_COMPANY = process.env.NOTION_DATABASE_ID_COMPANY || '';

export interface CompanyPage {
    id: string;
    title: string;
    slug: string;
    order: number;
}

export async function getCompanyPages(): Promise<CompanyPage[]> {
    if (!NOTION_DATABASE_ID_COMPANY || !NOTION_TOKEN) {
        console.log('[Notion] Company DB not configured');
        return [];
    }

    try {
        const response = await notion.databases.query({
            database_id: NOTION_DATABASE_ID_COMPANY,
            filter: {
                property: 'status',
                select: {
                    equals: 'Published',
                },
            },
            sorts: [
                {
                    property: 'order',
                    direction: 'ascending',
                },
            ],
        });

        const pages: CompanyPage[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const page of response.results as any[]) {
            const props = page.properties as Record<string, unknown>;
            const nameProp = props?.Name as { title?: Array<{ plain_text?: string }> } | undefined;
            const slugProp = props?.slug as { rich_text?: Array<{ plain_text?: string }> } | undefined;
            const orderProp = props?.order as { number?: number } | undefined;
            
            pages.push({
                id: page.id,
                title: nameProp?.title?.[0]?.plain_text || '',
                slug: slugProp?.rich_text?.[0]?.plain_text || '',
                order: orderProp?.number || 0,
            });
        }

        console.log('[Notion] Company pages fetched:', pages.length);
        return pages;
    } catch (error) {
        console.error('[Notion] Error fetching company pages:', error);
        return [];
    }
}

// Reference Types for Automatic Bibliography
export interface Reference {
    author: string;
    year: string;
    title?: string;
    source?: string;
    url?: string;
}

export interface ExtractedReferences {
    inlineCitations: Reference[];
    explicitReferences: Reference[];
    combinedReferences: Reference[];
}

// Detect inline citations (Author, Year) pattern like (Bank Indonesia, 2024)
const CITATION_PATTERN = /\(([A-Z][^(]*?),\s*(\d{4})(?:\s*[-–]\s*(\d{4}))?\)/g;

// Reference section headers (Indonesian & English)
const REFERENCE_HEADERS = [
    'referensi',
    'daftar pustaka',
    'sources',
    'bibliography',
    'references',
    'sumber',
];

function isReferenceHeader(text: string): boolean {
    const normalizedText = text.toLowerCase().trim();
    return REFERENCE_HEADERS.some(header => normalizedText.includes(header));
}

function extractTextFromRichText(richText: Array<{ plain_text?: string }>): string {
    return richText.map(t => t?.plain_text || '').join('');
}

function extractInlineCitations(content: string): Reference[] {
    const citations: Reference[] = [];
    const matches = content.matchAll(CITATION_PATTERN);
    
    for (const match of matches) {
        const author = match[1]?.trim();
        const year = match[2]?.trim();
        
        if (author && year && author.length > 1) {
            citations.push({
                author,
                year,
            });
        }
    }
    
    return citations;
}

export function extractReferencesFromBlocks(blocks: unknown[]): ExtractedReferences {
    const inlineCitations: Reference[] = [];
    const explicitReferences: Reference[] = [];
    let inReferenceSection = false;
    
    for (const block of blocks) {
        if (!block || typeof block !== 'object') continue;
        
        const blockAny = block as Record<string, unknown>;
        const blockType = blockAny.type as string;
        const blockContent = blockAny[blockType] as Record<string, unknown> | undefined;
        
        if (!blockContent) continue;
        
        // Handle different block types
        let text = '';
        
        if (blockType === 'heading_1' || blockType === 'heading_2' || blockType === 'heading_3') {
            const richText = blockContent.rich_text as Array<{ plain_text?: string }> || [];
            text = extractTextFromRichText(richText);
            
            // Check if this is a reference section header
            if (text && isReferenceHeader(text)) {
                inReferenceSection = true;
                continue;
            }
            
            // Stop collecting if we hit another major section after reference
            if (inReferenceSection && !isReferenceHeader(text)) {
                const firstFewWords = text.toLowerCase().split(' ').slice(0, 3).join(' ');
                if (REFERENCE_HEADERS.every(h => !firstFewWords.includes(h))) {
                    // Check if it's a normal heading that marks new section
                    if (blockType === 'heading_2' && text.length > 5) {
                        inReferenceSection = false;
                    }
                }
            }
        } else if (blockType === 'paragraph') {
            const richText = blockContent.rich_text as Array<{ plain_text?: string }> || [];
            text = extractTextFromRichText(richText);
        } else if (blockType === 'bulleted_list_item' || blockType === 'numbered_list_item') {
            const richText = blockContent.rich_text as Array<{ plain_text?: string }> || [];
            text = extractTextFromRichText(richText);
        }
        
        if (!text) continue;
        
        // Extract inline citations from all text
        const citations = extractInlineCitations(text);
        inlineCitations.push(...citations);
        
        // Collect explicit references from reference section
        if (inReferenceSection) {
            // Parse explicit reference format: Author. (Year). Title. Source
            const refMatch = text.match(/^(.+?)\.\s*\((\d{4})\)(?:[\.,]\s*(.+?))?[\.,]?\s*(.+)?$/);
            if (refMatch) {
                explicitReferences.push({
                    author: refMatch[1]?.trim() || '',
                    year: refMatch[2]?.trim() || '',
                    title: refMatch[3]?.trim() || undefined,
                    source: refMatch[4]?.trim() || undefined,
                });
            } else {
                // Fallback: just use the whole line as a reference
                explicitReferences.push({
                    author: text,
                    year: '',
                });
            }
        }
    }
    
    // Deduplicate citations
    const seen = new Set<string>();
    const uniqueInlineCitations = inlineCitations.filter(ref => {
        const key = `${ref.author}|${ref.year}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
    
    // Combine: explicit references first, then inline (deduplicated)
    const combinedReferences = [...explicitReferences];
    for (const citation of uniqueInlineCitations) {
        const existsInExplicit = explicitReferences.some(
            r => r.author === citation.author && r.year === citation.year
        );
        if (!existsInExplicit) {
            combinedReferences.push(citation);
        }
    }
    
    console.log('[References] Extracted:', {
        inlineCitations: inlineCitations.length,
        explicitReferences: explicitReferences.length,
        combinedReferences: combinedReferences.length,
        references: combinedReferences,
    });
    
    return {
        inlineCitations: uniqueInlineCitations,
        explicitReferences,
        combinedReferences,
    };
}

export function formatHarvard(reference: Reference): string {
    const { author, year, title, source } = reference;
    
    if (!author) return '';
    
    // If no year, just return author
    if (!year) return author;
    
    let formatted = `${author}. (${year})`;
    
    if (title) {
        formatted += `. ${title}`;
    }
    
    if (source) {
        formatted += `. ${source}`;
    }
    
    return formatted;
}

export function formatSimpleCitation(reference: Reference): string {
    if (!reference.author || !reference.year) return '';
    return `(${reference.author}, ${reference.year})`;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    category: string;
    tags: string[];
    metaTitle?: string;
    metaDescription?: string;
    coverImage?: string;
    imageCaption?: string;
    publishDate: string;
    lastUpdated?: string | null;
    author?: string;
    featured: boolean;
    status: 'Draft' | 'Published';
}

type NotionPropertyValue = PageObjectResponse['properties'][string];

function extractPropertyValue(property: NotionPropertyValue | null | undefined): string | boolean | number | null {
    // Guard against null/undefined property
    if (!property) return null;

    // Guard against invalid property type
    if (!property.type) return null;

    try {
        switch (property.type) {
            case 'title':
                return property.title?.[0]?.plain_text || '';
            case 'rich_text':
                return property.rich_text?.[0]?.plain_text || '';
            case 'select':
                return property.select?.name || '';
            case 'date':
                return property.date?.start || '';
            case 'checkbox':
                return property.checkbox ?? false;
            case 'number':
                return property.number ?? 0;
            case 'files':
                if (property.files && property.files.length > 0) {
                    const file = property.files[0];
                    if (file?.type === 'file' && file.file?.url) return file.file.url;
                    if (file?.type === 'external' && file.external?.url) return file.external.url;
                }
                return '';
            default:
                return null;
        }
    } catch (err) {
        console.warn('[Notion] Error extracting property value:', err);
        return null;
    }
}

function getPageCoverUrl(page: PageObjectResponse | undefined): string | undefined {
    if (!page) {
        console.log('[Notion] ⚠️ Page is undefined');
        return undefined;
    }
    
    let coverUrl: string | undefined = undefined;
    
    // Find ANY property with type "files" dynamically
    const props = page.properties || {};
    const propEntries = Object.entries(props);
    console.log('[Notion] 📋 ALL PROPERTIES:', propEntries.map(([k, v]) => `${k}:${v.type}`).join(', '));
    
    // Find first property with files type that has files
    const filePropertyEntry = propEntries.find(
        ([, prop]) => {
            const p = prop as { type?: string; files?: unknown[] } | undefined;
            return p?.type === 'files' && p?.files && p.files.length > 0;
        }
    );
    
    if (filePropertyEntry) {
        const [propName, fileProp] = filePropertyEntry;
        console.log('[Notion] 📋 FILES PROPERTY FOUND:', propName);
        
        const file = (fileProp as { files: unknown[] }).files[0] as { type?: string; file?: { url: string }; external?: { url: string } };
        console.log('[Notion] 📋 File raw:', JSON.stringify(file).substring(0, 150));
        
        if (file?.type === 'file' && file.file?.url) {
            coverUrl = file.file.url;
            console.log('[Notion] ✅ Resolved from', propName, '(file):', coverUrl.substring(0, 80));
        }
        else if (file?.type === 'external' && file.external?.url) {
            coverUrl = file.external.url;
            console.log('[Notion] ✅ Resolved from', propName, '(external):', coverUrl.substring(0, 80));
        }
    }
    else {
        console.log('[Notion] ⚠️ No files property found');
    }
    
    // Fallback to page.cover (legacy)
    if (!coverUrl && page.cover) {
        console.log('[Notion] 📋 Trying page.cover fallback');
        const cover = page.cover as { type: string; file?: { url: string }; external?: { url: string } };
        if (cover?.type === 'file' && cover.file?.url) {
            coverUrl = cover.file.url;
        }
        else if (cover?.type === 'external' && cover.external?.url) {
            coverUrl = cover.external.url;
        }
    }
    
    console.log('[Notion] 📋 FINAL RESOLVED COVER URL:', coverUrl?.substring(0, 80) || 'UNDEFINED');
    
    if (!coverUrl) {
        console.log('[Notion] ⚠️ No cover image found');
    }
    
    return coverUrl;
}

function getCategoryFromPage(page: PageObjectResponse | undefined): string {
    if (!page?.properties) return 'General';
    
    const props = page.properties;
    
    const categoryProp = 
        props['News Section'] ||
        props.category || 
        props.Category || 
        props.Kategori || 
        props.category_old ||
        undefined;
    
    if (!categoryProp) {
        console.log('[Notion] No category property found, defaulting to General');
        return 'General';
    }
    
    let category = 'General';
    
    if (categoryProp.type === 'select') {
        category = categoryProp.select?.name || 'General';
    } else if (categoryProp.type === 'multi_select') {
        category = categoryProp.multi_select?.[0]?.name || 'General';
    } else if (categoryProp.type === 'rich_text') {
        category = categoryProp.rich_text?.[0]?.plain_text || 'General';
    } else if (categoryProp.type === 'title') {
        category = categoryProp.title?.[0]?.plain_text || 'General';
    }
    
    console.log(`[Notion] Category extracted: "${category}" from property type: ${categoryProp.type}`);
    
    return category;
}

function getLastUpdated(page: PageObjectResponse | undefined): string | null {
    if (!page?.properties) return null;
    
    const props = page.properties;
    
    // Try multiple property names (Indonesian + English)
    // Priority: DIperbaharui (all caps, as found in database)
    const lastUpdatedProp = 
        props['DIperbaharui'] ||
        props['Diperbaharui'] ||
        props['Last Updated'] ||
        props['lastUpdated'] ||
        props['Updated'] ||
        props['Updated Date'] ||
        undefined;
    
    if (!lastUpdatedProp) {
        console.log('[Notion] ⚠️ No "Diperbaharui" property found on page:', page?.id);
        console.log('[Notion] Available props:', Object.keys(props).join(', '));
        return null;
    }
    
    console.log('[Notion] ✅ Found "Diperbaharui" property, type:', lastUpdatedProp.type);
    console.log('[Notion] Property raw value:', JSON.stringify(lastUpdatedProp));
    
    if (lastUpdatedProp.type === 'date') {
        const date = lastUpdatedProp.date?.start || null;
        console.log('[Notion] ✅ Diperbaharui (date):', date);
        return date;
    }
    
    if (lastUpdatedProp.type === 'rich_text') {
        const text = lastUpdatedProp.rich_text?.map(t => t.plain_text).join('') || null;
        console.log('[Notion] ✅ Diperbaharui (text):', text);
        return text;
    }
    
    return null;
}

function getImageCaption(page: PageObjectResponse | undefined): string | undefined {
    if (!page?.properties) return undefined;
    
    const props = page.properties;
    
    // Try multiple property names
    const captionProp = 
        props['Informasi gambar'] ||
        props['Informasi Gambar'] ||
        props['Image Caption'] ||
        props['Caption'] ||
        props.imageCaption ||
        undefined;
    
    if (!captionProp) {
        console.log('[Notion] ⚠️ No "Informasi gambar" property found');
        return undefined;
    }
    
    console.log('[Notion] ✅ Found "Informasi gambar" property, type:', captionProp.type);
    
    if (captionProp.type === 'rich_text') {
        // Join all rich_text items to preserve line breaks
        const caption = captionProp.rich_text
            ?.map(t => t.plain_text)
            .join('') || undefined;
        console.log('[Notion] ✅ Image Caption:', caption?.substring(0, 100));
        return caption;
    }
    
    return undefined;
}

function getTagsFromPage(page: PageObjectResponse | undefined): string[] {
    if (!page?.properties) return [];
    
    const props = page.properties;
    
    // Try multiple property names
    const tagsProp = 
        props['Tags'] ||
        props['tags'] ||
        props['Tag'] ||
        undefined;
    
    if (!tagsProp) {
        return [];
    }
    
    if (tagsProp.type === 'multi_select') {
        const tags = tagsProp.multi_select?.map(t => t.name) || [];
        return tags;
    }
    
    return [];
}

function mapNotionPageToBlogPost(page: PageObjectResponse | undefined): BlogPost | null {
    if (!page) return null;

    try {
        const coverUrl = getPageCoverUrl(page);
        
        // Try multiple property names for cover image
        const coverImageFromProperty = 
            extractPropertyValue(page.properties?.['Cover Image']) as string | undefined ||
            extractPropertyValue(page.properties?.['Gambar']) as string | undefined ||
            extractPropertyValue(page.properties?.['Cover Image ']) as string | undefined ||
            extractPropertyValue(page.properties?.['Image']) as string | undefined;
        
        const category = getCategoryFromPage(page);
        const lastUpdated = getLastUpdated(page);
        const imageCaption = getImageCaption(page);
        const tags = getTagsFromPage(page);

        // Debug: Log all property names
        const propNames = Object.keys(page.properties || {});
        console.log('[Notion] 📋 Page properties:', propNames.join(', '));
        console.log('[Notion] 📋 Mapping result:');
        console.log('    - id:', page.id);
        console.log('    - coverUrl (page cover):', coverUrl ? '✅ found' : '❌ not found');
        console.log('    - coverImageFromProperty:', coverImageFromProperty ? '✅ found' : '❌ not found');
        console.log('    - category:', category);
        console.log('    - lastUpdated:', lastUpdated);
        console.log('    - imageCaption:', imageCaption ? '✅ found' : '❌ not found');
        console.log('    - tags:', tags.length > 0 ? tags.join(', ') : 'none');

        return {
            id: page.id || '',
            title: (extractPropertyValue(page.properties?.['Title']) as string) || 'Untitled',
            slug: (extractPropertyValue(page.properties?.['slug']) as string) || 'no-slug',
            status: (extractPropertyValue(page.properties?.['Status']) as BlogPost['status']) || 'Draft',
            category,
            tags,
            metaTitle: (extractPropertyValue(page.properties?.['Meta Title']) as string) || undefined,
            metaDescription: (extractPropertyValue(page.properties?.['Meta Description']) as string) || undefined,
            coverImage: coverImageFromProperty || coverUrl || undefined,
            imageCaption,
            publishDate: (extractPropertyValue(page.properties?.['Publish Date']) as string) || page.created_time || new Date().toISOString(),
            lastUpdated,
            author: (extractPropertyValue(page.properties?.['Author']) as string) || undefined,
            featured: (extractPropertyValue(page.properties?.['Featured']) as boolean) || false,
        };
    } catch (err) {
        console.warn('[Notion] Error mapping page to blog post:', err);
        return null;
    }
}

export async function getAllPosts(): Promise<BlogPost[]> {
    if (!NOTION_TOKEN || !DATABASE_ID) {
        console.warn('[Notion] Not configured - returning empty posts.');
        return [];
    }

    try {
        console.log('[Notion] getAllPosts() - Fetching ALL posts without filter...');
        
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
        });

        console.log('[Notion] Total pages found:', response.results.length);

        const posts = (response.results as (PageObjectResponse | undefined)[])
            .map((page) => mapNotionPageToBlogPost(page))
            .filter((post): post is BlogPost => post !== null);

        console.log('[Notion] getAllPosts() - Final posts:', posts.length);
        console.log('[Notion] Posts:', posts.map(p => ({ id: p.id, title: p.title, status: p.status })));

        return posts;
    } catch (error) {
        console.error('[Notion] Error in getAllPosts():', error);
        return [];
    }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
    // Check if Notion is properly configured
    if (!NOTION_TOKEN || !DATABASE_ID) {
        console.warn('[Notion] Not configured - returning empty posts. Set NOTION_TOKEN and DATABASE_ID to enable articles.');
        return [];
    }

    try {
        console.log('🔥🔥🔥 NOTION DEBUG START 🔥🔥🔥');
        console.log('[Notion] Database ID:', DATABASE_ID);
        console.log('[Notion] Token exists:', !!NOTION_TOKEN);
        
        // Step 1: Query ALL pages WITHOUT filter to discover status values
        console.log('[Notion] Step 1: Fetching ALL pages (no filter)...');
        
        const allPagesResponse = await notion.databases.query({
            database_id: DATABASE_ID,
        });

        console.log('🔥 FULL NOTION RESPONSE (all pages):');
        console.log('  object:', allPagesResponse.object);
        console.log('  has_more:', allPagesResponse.has_more);
        console.log('  results.length:', allPagesResponse.results.length);

        // Log every single page found
        console.log('[Notion] 📄 ALL PAGES IN DATABASE:');
        const statusValues = new Set<string>();
        const categoryValues = new Set<string>();
        (allPagesResponse.results as PageObjectResponse[]).forEach((page, index) => {
            const statusProp = page.properties?.['Status'];
            const status = statusProp?.type === 'select' ? statusProp.select?.name : 'NO_STATUS_PROP';
            statusValues.add(status || 'undefined');
            
            const titleProp = page.properties?.['Title'];
            const title = titleProp?.type === 'title' ? titleProp.title?.[0]?.plain_text : 'NO_TITLE_PROP';
            
            // Log all property names for debugging
            const allPropNames = Object.keys(page.properties || {});
            console.log(`  [${index + 1}] Property names: [${allPropNames.join(', ')}]`);
            
            const catProp = page.properties?.['News Section'] || page.properties?.category || page.properties?.Category || page.properties?.Kategori;
            let category = 'NO_CATEGORY';
            if (catProp?.type === 'select') {
                category = catProp.select?.name || 'NO_CATEGORY';
            } else if (catProp?.type === 'multi_select') {
                category = catProp.multi_select?.[0]?.name || 'NO_CATEGORY';
            }
            if (category && category !== 'NO_CATEGORY') {
                categoryValues.add(category);
            }
            
            console.log(`  [${index + 1}] Title: "${title}" | Status: "${status}" | Category: "${category}"`);
        });
        
        console.log('[Notion] ✅ Unique Status values found:', Array.from(statusValues));
        console.log('[Notion] ✅ Unique Category values found:', Array.from(categoryValues));
        
        console.log('[Notion] ✅ Unique Status values found:', Array.from(statusValues));

        // Step 2: Query with filter using discovered status values
        console.log('[Notion] Step 2: Fetching published posts...');
        
        // Check what status values to use for filtering
        const hasPublished = statusValues.has('published');
        const hasPublishedCapital = statusValues.has('Published');
        
        let response;
        
        if (hasPublished) {
            // Use lowercase "published"
            console.log('[Notion] Using filter: "published"');
            response = await notion.databases.query({
                database_id: DATABASE_ID,
                filter: {
                    property: 'Status',
                    select: {
                        equals: 'published',
                    },
                },
                sorts: [
                    {
                        property: 'Publish Date',
                        direction: 'descending',
                    },
                ],
            });
        } else if (hasPublishedCapital) {
            // Use capitalized "Published"
            console.log('[Notion] Using filter: "Published"');
            response = await notion.databases.query({
                database_id: DATABASE_ID,
                filter: {
                    property: 'Status',
                    select: {
                        equals: 'Published',
                    },
                },
                sorts: [
                    {
                        property: 'Publish Date',
                        direction: 'descending',
                    },
                ],
            });
        } else {
            // No published status found - return all posts
            console.log('[Notion] ⚠️ No "published" or "Published" status found. Returning ALL posts.');
            response = allPagesResponse;
        }

        console.log('🔥 FULL NOTION RESPONSE (filtered):');
        console.log('  object:', response.object);
        console.log('  results.length:', response.results.length);

        // If still empty results, return all pages as fallback
        if (!response.results || response.results.length === 0) {
            console.log('[Notion] ⚠️ No results with status filter. Returning ALL posts.');
            response = allPagesResponse;
        }

        // Map results to BlogPost
        const posts = (response.results as (PageObjectResponse | undefined)[])
            .map((page) => mapNotionPageToBlogPost(page))
            .filter((post): post is BlogPost => post !== null);
        
        console.log('✅ FINAL POSTS:', posts.map(p => ({ id: p.id, title: p.title, slug: p.slug, status: p.status })));
        console.log('🔥🔥🔥 NOTION DEBUG END 🔥🔥🔥');

        return posts;
    } catch (error) {
        console.error('[Notion] ❌ Error fetching published posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    // Check if Notion is properly configured
    if (!NOTION_TOKEN || !DATABASE_ID) {
        console.warn('[Notion] Not configured - cannot fetch post by slug.');
        return null;
    }

    try {
        console.log(`[Notion] Fetching post with slug: "${slug}"`);

        // Use lowercase "published" since that's what the database uses
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            filter: {
                and: [
                    {
                        property: 'slug',
                        rich_text: {
                            equals: slug,
                        },
                    },
                    {
                        property: 'Status',
                        select: {
                            equals: 'published',
                        },
                    },
                ],
            },
            page_size: 1,
        });

        // Debug: Log response
        console.log(`[Notion] Post query response for "${slug}":`, {
            found: response.results.length > 0,
            totalResults: response.results.length,
        });

        if (!response.results || response.results.length === 0) {
            console.warn(`[Notion] No post found with slug: "${slug}"`);
            return null;
        }

        const post = mapNotionPageToBlogPost(response.results[0] as PageObjectResponse | undefined);
        
        if (!post) {
            console.warn(`[Notion] Failed to map post with slug: "${slug}"`);
            return null;
        }
        
        // Debug: Log mapped post
        console.log(`[Notion] Mapped post:`, {
            id: post.id,
            title: post.title,
            slug: post.slug,
            status: post.status,
        });

        return post;
    } catch (error) {
        console.error(`[Notion] Error fetching post with slug "${slug}":`, error);
        return null;
    }
}

export async function getPostRecordMap(pageId: string) {
    try {
        return await notionAPI.getPage(pageId);
    } catch (error) {
        console.error(`[Notion] Error fetching record map for page ${pageId}:`, error);
        return null;
    }
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    discountPrice: number | null;
    currency: string;
    image: string | undefined;
    category: string;
    tags: string[];
    link: string;
    status: 'Active' | 'Inactive';
    inStock: boolean;
}

export async function getAllProducts(): Promise<Product[]> {
    if (!NOTION_TOKEN || !NOTION_PRODUCTS_DB_ID) {
        console.warn('[Notion] Not configured - returning empty products. Set NOTION_TOKEN and NOTION_PRODUCTS_DB_ID.');
        console.log('[Notion] NOTION_TOKEN:', NOTION_TOKEN ? 'set' : 'missing');
        console.log('[Notion] NOTION_PRODUCTS_DB_ID:', NOTION_PRODUCTS_DB_ID || 'missing');
        return [];
    }

    try {
        console.log('[Notion] getAllProducts() - Starting fetch...');
        console.log('[Notion] Products DB ID:', NOTION_PRODUCTS_DB_ID);
        console.log('[Notion] Using token:', NOTION_API_KEY_PRODUCTS ? 'NOTION_API_KEY_PRODUCTS' : NOTION_TOKEN ? 'NOTION_TOKEN' : 'NONE');

        if (!NOTION_API_KEY_PRODUCTS && !NOTION_TOKEN) {
            console.error('[Notion] ❌ No API key available for products!');
            return [];
        }

        // Query ALL products (no filter to fetch everything)
        const client = NOTION_API_KEY_PRODUCTS ? notionProducts : notion;
        const response = await client.databases.query({
            database_id: NOTION_PRODUCTS_DB_ID,
        });

        console.log('[Notion] 🔍 TOTAL results from Notion:', response.results.length);
        
        if (response.results.length === 0) {
            console.warn('[Notion] ⚠️ No products found. Check:');
            console.warn('[Notion] 1. Is integration shared with database?');
            console.warn('[Notion] 2. Does database have any pages?');
            return [];
        }

        // Log ALL status values found
        const statusCounts: Record<string, number> = {};
        (response.results as PageObjectResponse[]).forEach((page) => {
            const props = page.properties || {};
            const statusProp = props['status'] || props['Status'] || props['Status '];
            let status = 'NO_STATUS_PROPERTY';
            if (statusProp?.type === 'select') {
                status = statusProp.select?.name || 'EMPTY';
            }
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        console.log('[Notion] 📊 Status distribution:', statusCounts);
        
        if (response.results.length === 0) {
            console.warn('[Notion] ⚠️ No products found in database. Checking if database is empty or integration has access.');
            return [];
        }

        // Log all property names from first result for debugging
        if (response.results[0]) {
            const firstPage = response.results[0] as PageObjectResponse;
            console.log('[Notion] 📋 First product property names:', Object.keys(firstPage.properties || {}).join(', '));
        }

        const products: Product[] = [];
        
        for (const result of response.results) {
            try {
                const page = result as PageObjectResponse;
                const props = page.properties || {};
                
                // Log status for each product (only first few for debug)
                const statusProp = props['status'] || props['Status'];
                const status = statusProp?.type === 'select' ? statusProp.select?.name : null;
                const productName = extractPropertyValue(props['Name']) || extractPropertyValue(props['Title']) || 'Unnamed';
                if (products.length < 3) {
                    console.log(`[Notion] Product "${productName}" - status:`, status || 'NO_STATUS');
                }
                
                // Only skip explicitly "inactive" or "Inactive" products
                if (status === 'inactive' || status === 'Inactive') {
                    console.log('[Notion] ⚠️ Skipping inactive product:', page.id);
                    continue;
                }
                
                // Accept products with:
                // - No status property (assume published for new products)
                // Handle thumbnail - check both file and external URLs
                let thumbnail = '';
                const imageProp = props['Thumbnail'] || props['Image'] || props['image'];
                if (imageProp?.type === 'files' && imageProp.files?.length > 0) {
                    const file = imageProp.files[0];
                    if (file?.type === 'file' && file.file?.url) {
                        thumbnail = file.file.url;
                    } else if (file?.type === 'external' && file.external?.url) {
                        thumbnail = file.external.url;
                    }
                }
                
                // Get tags from multi_select
                let tags: string[] = [];
                const tagProp = props['tag'] || props['Tag'] || props['tags'];
                if (tagProp?.type === 'multi_select') {
                    tags = tagProp.multi_select?.map((t: { name: string }) => t.name) || [];
                }
                
                // Get affiliate link
                const linkProp = props['affiliate link'] || props['affiliate_link'] || props['link'];
                const affiliateLink = linkProp?.type === 'url' ? linkProp.url : '';
                
                // Get stock status
                const stockProp = props['stock'] || props['Stock'] || props['inStock'];
                const inStockValue = stockProp?.type === 'checkbox' ? stockProp.checkbox : true;
                
                // Get price directly from number type for accuracy
                const priceProp = props['price'] || props['Price'];
                const priceValue: number = (priceProp?.type === 'number' ? priceProp.number : Number(extractPropertyValue(priceProp))) || 0;
                
                // Get discount price
                const discountProp = props['discount price'] || props['discountPrice'];
                const rawDiscount = discountProp?.type === 'number' ? discountProp.number : Number(extractPropertyValue(discountProp));
                const discountValue: number | null = (rawDiscount && rawDiscount > 0) ? rawDiscount : null;
                
                if (products.length < 3) {
                    console.log(`[Notion] Price debug for "${productName}":`, {
                        priceProp: priceValue,
                        discountProp: discountValue,
                        rawPrice: props['price'],
                    });
                }
                
                products.push({
                    id: page.id || '',
                    name: (extractPropertyValue(props['Name']) as string) || (extractPropertyValue(props['Title']) as string) || 'Unnamed Product',
                    slug: (extractPropertyValue(props['slug']) as string) || (extractPropertyValue(props['Slug']) as string) || 'no-slug',
                    description: (extractPropertyValue(props['full description']) as string) || (extractPropertyValue(props['Description']) as string) || '',
                    shortDescription: (extractPropertyValue(props['short description']) as string) || '',
                    price: priceValue,
                    discountPrice: (discountValue ?? null) as number | null,
                    currency: (extractPropertyValue(props['currency']) as string) || 'IDR',
                    image: thumbnail || undefined,
                    category: (extractPropertyValue(props['category']) as string) || (extractPropertyValue(props['Category']) as string) || 'General',
                    tags,
                    link: affiliateLink || '#',
                    status: ((extractPropertyValue(props['status']) as Product['status']) || 'Active') as Product['status'],
                    inStock: Boolean(inStockValue),
                });
            } catch (err) {
                console.warn('[Notion] Error mapping product:', err);
            }
        }

        console.log('[Notion] ✅ getAllProducts() - Final products:', products.length);
        return products;
    } catch (error) {
        console.error('[Notion] Error in getAllProducts():', error);
        return [];
    }
}
