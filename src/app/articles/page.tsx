import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts } from '@/lib/notion';

export const revalidate = 300;

export const metadata = {
    title: 'Articles | Island',
    description: 'Calm Productivity Journal. Thoughts on focus, flow, and sustainable productivity.',
};

export default async function BlogPage() {
    const posts = await getPublishedPosts();

    const featuredPost = posts.find((p) => p.featured) || posts[0];
    const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

    return (
        <div className="min-h-screen flex flex-col pt-32 pb-16 bg-[var(--color-cream)]">
            <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12">
                {/* Header section */}
                <section className="mt-8 mb-20 text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-[var(--color-pastel-green-deep)] mb-6">
                        Calm Productivity Journal
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        Thoughts, essays, and resources dedicated to helping you reclaim your focus,
                        stay grounded, and practice sustainable productivity.
                    </p>
                </section>

                {/* Featured Post */}
                {featuredPost && (
                    <section className="mb-24 animate-fade-in-up delay-100">
                        <Link href={`/articles/${featuredPost.slug}`} className="group block relative overflow-hidden rounded-[32px] bg-white shadow-xl isolate aspect-[2/1] min-h-[400px]">
                            {featuredPost.coverImage ? (
                                <Image
                                    src={featuredPost.coverImage}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-pastel-green)] to-[var(--color-pastel-blue)] opacity-50" />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-4xl text-left">
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-[var(--color-pastel-green-deep)] text-white rounded-full">
                                    Featured
                                </span>
                                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <div className="flex items-center text-white/80 text-sm gap-4">
                                    {featuredPost.author && <span>{featuredPost.author}</span>}
                                    <span>•</span>
                                    <time dateTime={featuredPost.publishDate}>
                                        {new Date(featuredPost.publishDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Regular Posts Grid */}
                <section className="animate-fade-in-up delay-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post) => (
                            <Link key={post.id} href={`/articles/${post.slug}`} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-cream-dark)]">
                                    {post.coverImage ? (
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : null}
                                </div>

                                <div className="p-8">
                                    <h3 className="text-xl font-semibold text-[var(--color-text-dark)] mb-3 leading-snug group-hover:text-[var(--color-pastel-green-deep)] transition-colors">
                                        {post.title}
                                    </h3>
                                    {post.metaDescription && (
                                        <p className="text-[var(--color-text-muted)] line-clamp-2 mb-6">
                                            {post.metaDescription}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
                                        <time dateTime={post.publishDate}>
                                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </time>
                                        <span className="font-medium text-[var(--color-pastel-green-deep)] opacity-0 transform translate-x-[-10px] transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                            Read more →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-24 text-[var(--color-text-muted)]">
                            No articles published yet. Check back soon.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
