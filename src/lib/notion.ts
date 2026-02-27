import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

// Official client for querying databases
export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

// Unofficial client for react-notion-x to get full block data
export const notionAPI = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,     // Optional but good if block access is restricted
    authToken: process.env.NOTION_TOKEN_V2,         // Needed only if pages are not public
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

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

function extractPropertyValue(property: any): any {
    if (!property) return null;

    switch (property.type) {
        case 'title':
            return property.title?.[0]?.plain_text || '';
        case 'rich_text':
            return property.rich_text?.[0]?.plain_text || '';
        case 'slug':
            return property.slug?.slug || '';
        case 'select':
            return property.select?.name || '';
        case 'date':
            return property.date?.start || '';
        case 'checkbox':
            return property.checkbox || false;
        case 'files':
            return property.files?.[0]?.file?.url || property.files?.[0]?.external?.url || '';
        default:
            return null;
    }
}

function mapNotionPageToBlogPost(page: any): BlogPost {
    return {
        id: page.id,
        title: extractPropertyValue(page.properties['Title']),
        slug: extractPropertyValue(page.properties['Slug']),
        status: extractPropertyValue(page.properties['Status']),
        metaTitle: extractPropertyValue(page.properties['Meta Title']),
        metaDescription: extractPropertyValue(page.properties['Meta Description']),
        coverImage:
            extractPropertyValue(page.properties['Cover Image']) ||
            (page.cover?.file?.url || page.cover?.external?.url || undefined),
        publishDate: extractPropertyValue(page.properties['Publish Date']) || page.created_time,
        author: extractPropertyValue(page.properties['Author']),
        featured: extractPropertyValue(page.properties['Featured']),
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

        return response.results.map(mapNotionPageToBlogPost);
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
                        property: 'Slug',
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

        return mapNotionPageToBlogPost(response.results[0]);
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
