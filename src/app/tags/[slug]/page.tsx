import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts } from '@/lib/notion';
import { ArrowLeft, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface TagPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tagName = slug.replace(/-/g, ' ');
    
    return {
        title: `${tagName} Articles | Island`,
        description: `Explore articles tagged with ${tagName} on Island.`,
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { slug } = await params;
    const tagSlug = slug;
    const tagName = slug.replace(/-/g, ' ');
    
    const allPosts = await getPublishedPosts();
    const postsWithTag = allPosts.filter(post => 
        post.tags && post.tags.some(tag => 
            tag.toLowerCase().replace(/\s+/g, '-') === tagSlug
        )
    );

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
                <Link 
                    href="/articles" 
                    className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Articles
                </Link>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center">
                        <Tag className="w-6 h-6 text-[var(--accent-green)]" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading-text)]">
                            {tagName}
                        </h1>
                        <p className="text-[var(--paragraph-text)]">
                            {postsWithTag.length} {postsWithTag.length === 1 ? 'article' : 'articles'}
                        </p>
                    </div>
                </div>

                {postsWithTag.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-[var(--paragraph-text)] text-lg mb-4">
                            No articles found with this tag.
                        </p>
                        <Link 
                            href="/articles" 
                            className="text-[var(--accent-green)] hover:underline"
                        >
                            Browse all articles
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {postsWithTag.map((post) => (
                            <article 
                                key={post.id} 
                                className="flex gap-6 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-green)]/30 transition-all"
                            >
                                {post.coverImage && (
                                    <Link href={`/articles/${post.slug}`} className="flex-shrink-0">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            width={160}
                                            height={100}
                                            className="w-40 h-24 object-cover rounded-xl"
                                        />
                                    </Link>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-medium text-[var(--accent-green)] uppercase tracking-wider">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-[var(--text-secondary)]">
                                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-[var(--heading-text)] mb-2 line-clamp-2">
                                        <Link href={`/articles/${post.slug}`} className="hover:text-[var(--accent-green)] transition-colors">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-sm text-[var(--paragraph-text)] line-clamp-2">
                                        {post.metaDescription}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
