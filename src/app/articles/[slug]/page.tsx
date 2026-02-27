import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPostRecordMap, getPublishedPosts } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 300; // ISR revalidation 5 mins

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Island',
        };
    }

    const title = post.metaTitle || `${post.title} | Island Articles`;
    const description = post.metaDescription || `Read ${post.title} on the Island Articles.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            url: `https://island-web.vercel.app/articles/${post.slug}`,
            publishedTime: post.publishDate,
            authors: post.author ? [post.author] : [],
            images: post.coverImage ? [post.coverImage] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: post.coverImage ? [post.coverImage] : [],
        },
        alternates: {
            canonical: `https://island-web.vercel.app/articles/${post.slug}`,
        },
    };
}

export async function generateStaticParams() {
    const posts = await getPublishedPosts();
    return posts.map((post) => ({
        slug: String(post.slug),
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const recordMap = await getPostRecordMap(post.id);

    // Generate Article JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        image: post.coverImage ? [post.coverImage] : [],
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        author: [{
            '@type': 'Person',
            name: post.author || 'Island Team',
        }],
        description: post.metaDescription || post.title,
    };

    return (
        <div className="min-h-screen flex flex-col pt-32 pb-16 bg-[var(--color-cream)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="flex-1 w-full max-w-[800px] mx-auto px-6 md:px-0 relative animate-fade-in-up">

                {/* Back navigation */}
                <div className="mb-8">
                    <Link href="/articles" className="inline-flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-pastel-green-deep)] transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Articles
                    </Link>
                </div>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative w-full aspect-[21/9] rounded-[24px] overflow-hidden mb-12 shadow-md">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Post Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold font-sans text-[var(--color-text-dark)] leading-tight mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-[var(--color-text-muted)]">
                        {post.author && (
                            <span className="font-medium text-[var(--color-text-dark)]">{post.author}</span>
                        )}
                        {post.author && <span>•</span>}
                        <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>
                </header>

                <hr className="border-[var(--color-pastel-sand)] mb-12" />

                {/* Notion Content */}
                <div className="prose prose-lg max-w-none">
                    <NotionRenderer recordMap={recordMap} rootPageId={post.id} />
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 pt-12 border-t border-[var(--color-pastel-sand)] text-center">
                    <h3 className="text-2xl font-semibold text-[var(--color-text-dark)] mb-4">
                        Find your focus with Island
                    </h3>
                    <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
                        Design your ideal environment and start building sustainable productivity habits today.
                    </p>
                    <a href="/#download" className="inline-block px-8 py-4 bg-[var(--color-pastel-green-deep)] text-white font-medium rounded-full hover:bg-[#5FBF8F] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Get Started
                    </a>
                </div>

            </article>
        </div>
    );
}
