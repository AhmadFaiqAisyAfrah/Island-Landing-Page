import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Base URLs
    const baseUrl = 'https://island-web.vercel.app'; // Update this to production URL later

    // Standard routes
    const routes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/articles`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
    ];

    // Dynamically fetch and append blog posts
    try {
        const posts = await getPublishedPosts();
        const postRoutes = posts.map((post) => ({
            url: `${baseUrl}/articles/${post.slug}`,
            lastModified: new Date(post.publishDate),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        return [...routes, ...postRoutes];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return routes;
    }
}
