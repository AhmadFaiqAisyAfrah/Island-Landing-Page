import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Safe environment variable handling - never throw errors
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
const DATABASE_ID = process.env.DATABASE_ID || ''; // Note: matches .env.local variable name
const NOTION_TOKEN_V2 = process.env.NOTION_TOKEN_V2 || '';

// Debug logging in development
if (process.env.NODE_ENV === 'development') {
    console.log('[Notion] NOTION_TOKEN:', NOTION_TOKEN ? '✓ Set' : '✗ Missing');
    console.log('[Notion] DATABASE_ID:', DATABASE_ID ? '✓ Set' : '✗ Missing');
    console.log('[Notion] NOTION_TOKEN_V2:', NOTION_TOKEN_V2 ? '✓ Set' : '✗ Missing');
}

// Official client for querying databases (only initialize if token exists)
export const notion = new Client({
    auth: NOTION_TOKEN || undefined,
});

// Unofficial client for react-notion-x to get full block data
export const notionAPI = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER || undefined,
    authToken: NOTION_TOKEN_V2 || undefined,
});

// Export for checking availability
export const isNotionConfigured = Boolean(NOTION_TOKEN && DATABASE_ID);
export { NOTION_TOKEN, DATABASE_ID };

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    category: string;
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

function extractPropertyValue(property: NotionPropertyValue | null | undefined): string | boolean | null {
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
    if (!page?.cover) {
        console.log('[Notion] ⚠️ No page cover found');
        return undefined;
    }
    
    try {
        if (page.cover.type === 'file' && page.cover.file?.url) {
            console.log('[Notion] ✅ Cover URL (file):', page.cover.file.url.substring(0, 80));
            return page.cover.file.url;
        }
        if (page.cover.type === 'external' && page.cover.external?.url) {
            console.log('[Notion] ✅ Cover URL (external):', page.cover.external.url.substring(0, 80));
            return page.cover.external.url;
        }
    } catch (err) {
        console.warn('[Notion] Error extracting cover URL:', err);
    }
    return undefined;
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

function mapNotionPageToBlogPost(page: PageObjectResponse | undefined): BlogPost | null {
    if (!page) return null;

    try {
        const coverUrl = getPageCoverUrl(page);
        const coverImageFromProperty = extractPropertyValue(page.properties?.['Cover Image']) as string | undefined;
        const category = getCategoryFromPage(page);
        const lastUpdated = getLastUpdated(page);
        const imageCaption = getImageCaption(page);

        // Debug: Log all property names
        const propNames = Object.keys(page.properties || {});
        console.log('[Notion] 📋 Page properties:', propNames.join(', '));
        console.log('[Notion] 📋 Mapping result:');
        console.log('    - id:', page.id);
        console.log('    - coverUrl:', coverUrl ? '✅ found' : '❌ not found');
        console.log('    - coverImageFromProperty:', coverImageFromProperty ? '✅ found' : '❌ not found');
        console.log('    - category:', category);
        console.log('    - lastUpdated:', lastUpdated);
        console.log('    - imageCaption:', imageCaption ? '✅ found' : '❌ not found');

        return {
            id: page.id || '',
            title: (extractPropertyValue(page.properties?.['Title']) as string) || 'Untitled',
            slug: (extractPropertyValue(page.properties?.['slug']) as string) || 'no-slug',
            status: (extractPropertyValue(page.properties?.['Status']) as BlogPost['status']) || 'Draft',
            category,
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
