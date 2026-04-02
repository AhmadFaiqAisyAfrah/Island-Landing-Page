import { getPublishedPosts } from '@/lib/notion';
import { ModernArticlesLayout } from '@/components/ModernArticlesLayout';
import { ClassicArticlesLayout } from '@/components/ClassicArticlesLayout';
import { ArticlesPageClient } from '@/components/ArticlesPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata = {
    title: 'Latest Articles | Island',
    description: 'Explore articles across health, economy, education, productivity, and modern life.',
};

export default async function BlogPage() {
    const posts = await getPublishedPosts();
    
    return (
        <ArticlesPageClient posts={posts} />
    );
}
