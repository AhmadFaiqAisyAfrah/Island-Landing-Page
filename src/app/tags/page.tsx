import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/notion';
import { Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Browse by Tags | Island Articles',
    description: 'Explore Island articles by topic. Find content on health, productivity, education, and more.',
};

export default async function TagsPage() {
    const posts = await getPublishedPosts();
    
    // Collect all tags with count
    const tagCounts = new Map<string, number>();
    posts.forEach(post => {
        if (post.tags && post.tags.length > 0) {
            post.tags.forEach(tag => {
                tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
            });
        }
    });
    
    // Sort tags by count (most popular first)
    const sortedTags = Array.from(tagCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count]) => ({ tag, count }));
    
    function slugify(text: string): string {
        return text.toLowerCase().replace(/\s+/g, '-');
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
                <Link 
                    href="/articles" 
                    className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors mb-8"
                >
                    ← Back to Articles
                </Link>

                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent-green)]/10 mb-6">
                        <Tag className="w-8 h-8 text-[var(--accent-green)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading-text)] mb-4">
                        Browse by Tags
                    </h1>
                    <p className="text-lg text-[var(--paragraph-text)]">
                        Find articles by topic
                    </p>
                </div>

                {sortedTags.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-[var(--paragraph-text)] text-lg">
                            No tags available yet.
                        </p>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                            Tags will appear here once articles have tags assigned in Notion.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3 justify-center">
                        {sortedTags.map(({ tag, count }) => (
                            <Link
                                key={tag}
                                href={`/tags/${slugify(tag)}`}
                                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl 
                                    bg-[var(--bg-secondary)] text-[var(--paragraph-text)] 
                                    border border-[var(--border-color)]
                                    hover:bg-[var(--accent-green)] hover:text-white hover:border-[var(--accent-green)]
                                    transition-all duration-200"
                            >
                                <span className="font-medium">{tag}</span>
                                <span className="text-xs opacity-60 group-hover:opacity-80">
                                    {count} {count === 1 ? 'article' : 'articles'}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
