import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPostRecordMap, getPublishedPosts } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 300;

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Island',
        };
    }

    const title = post.metaTitle || `${post.title} | Island Articles`;
    const description = post.metaDescription || `Read ${post.title} on the Island Articles.`;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://islandapp.id';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            url: `${baseUrl}/articles/${post.slug}`,
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
            canonical: `${baseUrl}/articles/${post.slug}`,
        },
    };
}

export async function generateStaticParams() {
    const posts = await getPublishedPosts();
    return posts.map((post) => ({
        slug: String(post.slug),
    }));
}

export default async function BlogPostPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const recordMap = await getPostRecordMap(post.id);

    // Process Dates
    const publishedIso = new Date(post.publishDate).toISOString();
    const modifiedIso = new Date(post.publishDate).toISOString(); // Fallback if no specific modified date
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://islandapp.id';

    // Generate Article JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription || `Read ${post.title} on the Island Articles.`,
        ...(post.coverImage && { image: post.coverImage }),
        author: {
            '@type': 'Person',
            name: post.author || 'Ahmad Faiq', // Using requested default author if not exists
        },
        publisher: {
            '@type': 'Organization',
            name: 'Island',
            logo: {
                '@type': 'ImageObject',
                url: 'https://islandapp.id/island-logo.png', // Assuming logo path based on standard deployment
            },
        },
        datePublished: publishedIso,
        dateModified: modifiedIso,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/articles/${post.slug}`,
        },
    };

    // Generate Breadcrumb JSON-LD
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Articles',
                item: `${baseUrl}/articles`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `${baseUrl}/articles/${post.slug}`,
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col pt-32 pb-16 bg-[var(--color-cream)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
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
                        Try our free pomodoro timer and start building sustainable productivity habits today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/explore/pomodoro" className="w-full sm:w-auto px-8 py-4 bg-[var(--color-pastel-green-deep)] text-white font-medium rounded-full hover:bg-[#5FBF8F] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                            Start Focus Session
                        </Link>
                        <Link href="/explore" className="w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-text-dark)] font-medium rounded-full border border-[var(--color-pastel-sand)] hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md text-center">
                            Explore Study Tools
                        </Link>
                    </div>
                </div>

            </article>
        </div>
    );
}
