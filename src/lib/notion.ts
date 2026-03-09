import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Official client for querying databases
export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// Unofficial client for react-notion-x to get full block data
export const notionAPI = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,     // Optional but good if block access is restricted
    authToken: process.env.NOTION_TOKEN_V2,         // Needed only if pages are not public
});

export const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

if (!NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is required');
}
if (!DATABASE_ID) {
    throw new Error('DATABASE_ID is required');
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    coverImage?: string;
    publishDate: string;
    author?: string;
    featured: boolean;
    status: 'Draft' | 'Published';
}

type NotionPropertyValue = PageObjectResponse['properties'][string];

function extractPropertyValue(property: NotionPropertyValue | null | undefined): string | boolean | null {
    if (!property) return null;

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
            return property.checkbox || false;
        case 'files':
            if (property.files?.[0]) {
                const file = property.files[0];
                if (file.type === 'file') return file.file.url;
                if (file.type === 'external') return file.external.url;
            }
            return '';
        default:
            return null;
    }
}

function mapNotionPageToBlogPost(page: PageObjectResponse): BlogPost {
    const coverUrl = page.cover
        ? page.cover.type === 'file'
            ? page.cover.file.url
            : page.cover.type === 'external'
                ? page.cover.external.url
                : undefined
        : undefined;

    return {
        id: page.id,
        title: (extractPropertyValue(page.properties['Title']) as string) || '',
        slug: (extractPropertyValue(page.properties['slug']) as string) || '',
        status: (extractPropertyValue(page.properties['Status']) as BlogPost['status']) || 'Draft',
        metaTitle: (extractPropertyValue(page.properties['Meta Title']) as string) || undefined,
        metaDescription: (extractPropertyValue(page.properties['Meta Description']) as string) || undefined,
        coverImage: (extractPropertyValue(page.properties['Cover Image']) as string) || coverUrl || undefined,
        publishDate: (extractPropertyValue(page.properties['Publish Date']) as string) || page.created_time,
        author: (extractPropertyValue(page.properties['Author']) as string) || undefined,
        featured: (extractPropertyValue(page.properties['Featured']) as boolean) || false,
    };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
    try {
        const response = await notion.databases.query({
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

        return (response.results as PageObjectResponse[]).map(mapNotionPageToBlogPost);
    } catch (error) {
        console.error('Error fetching published posts from Notion:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
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
                            equals: 'Published',
                        },
                    }
                ]
            },
            page_size: 1,
        });

        if (response.results.length === 0) {
            return null;
        }

        return mapNotionPageToBlogPost(response.results[0] as PageObjectResponse);
    } catch (error) {
        console.error(`Error fetching post with slug "${slug}":`, error);
        return null;
    }
}

export async function getPostRecordMap(pageId: string) {
    try {
        return await notionAPI.getPage(pageId);
    } catch (error) {
        console.error(`Error fetching record map for page ${pageId}:`, error);
        throw error;
    }
}
