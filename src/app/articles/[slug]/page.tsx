import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPublishedPosts, type BlogPost } from '@/lib/notion';
import { extractHeadingsFromBlocks, generateAnchorId, isEmojiSection, type TocItem } from '@/lib/notion-toc';
import { ArrowLeft } from 'lucide-react';
import { Client } from '@notionhq/client';
import { ArticleCoverImage } from '@/components/ImageWithCaption';
import { TagsDisplay } from '@/components/TagsDisplay';
import { TableOfContents } from '@/components/TableOfContents';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Island',
            description: 'This article could not be found.',
        };
    }

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || `Read ${post.title} on Island.`;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://islandapp.id';

    return {
        title: `${title} | Island`,
        description,
        openGraph: {
            title: `${title} | Island`,
            description,
            type: 'article',
            url: `${baseUrl}/articles/${post.slug}`,
            publishedTime: post.publishDate,
            modifiedTime: post.lastUpdated || post.publishDate,
            authors: post.author ? [post.author] : [],
            images: post.coverImage ? [{ url: post.coverImage }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Island`,
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
    const safePosts = posts || [];
    return safePosts.map((post) => ({
        slug: String(post.slug),
    }));
}

async function getBlocks(blockId: string) {
    const notion = new Client({
        auth: process.env.NOTION_TOKEN || '',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let blocks: any[] = [];
    let cursor: string | undefined = undefined;

    try {
        do {
            const response = await notion.blocks.children.list({
                block_id: blockId,
                start_cursor: cursor,
            });

            blocks = [...blocks, ...response.results];
            cursor = response.has_more ? response.next_cursor || undefined : undefined;
        } while (cursor);

        return blocks;
    } catch (error) {
        console.error('[Notion] Error fetching blocks:', error);
        return [];
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
    if (!block || typeof block !== 'object' || !block.type) return null;

    const blockType = block.type;
    const blockContent = block[blockType];
    
    if (!blockContent || typeof blockContent !== 'object') return null;

    const richText = blockContent.rich_text || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = richText.map((t: any) => t?.plain_text || '').join('');

    switch (blockType) {
        case 'heading_1': {
            const anchorId = text.trim() ? generateAnchorId(text) : '';
            return (
                <h1 id={anchorId} key={block.id || index} style={styles.h1}>
                    {text}
                </h1>
            );
        }
        case 'heading_2': {
            const anchorId = text.trim() ? generateAnchorId(text) : '';
            return (
                <h2 id={anchorId} key={block.id || index} style={styles.h2}>
                    {text}
                </h2>
            );
        }
        case 'heading_3': {
            const anchorId = text.trim() ? generateAnchorId(text) : '';
            return (
                <h3 id={anchorId} key={block.id || index} style={styles.h3}>
                    {text}
                </h3>
            );
        }
        case 'paragraph': {
            const anchorId = isEmojiSection(text) ? generateAnchorId(text) : '';
            if (!text.trim()) return <div key={block.id || index} style={styles.paragraphSpacing} />;
            return (
                <p id={anchorId} key={block.id || index} style={styles.paragraph}>
                    {text}
                </p>
            );
        }
        case 'bulleted_list_item': {
            return (
                <li key={block.id || index} style={styles.listItem}>
                    {text}
                </li>
            );
        }
        case 'numbered_list_item':
            return (
                <li key={block.id || index} style={styles.listItem}>
                    {text}
                </li>
            );
        case 'quote':
            return (
                <blockquote key={block.id || index} style={styles.blockquote}>
                    {text}
                </blockquote>
            );
        case 'code':
            return (
                <pre key={block.id || index} style={styles.codeBlock}>
                    <code>{text}</code>
                </pre>
            );
        case 'divider':
            return (
                <hr key={block.id || index} style={styles.divider} />
            );
        case 'image': {
            const imageUrl = blockContent?.external?.url || blockContent?.file?.url || '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const caption = richText.map((t: any) => t?.plain_text || '').join('') || '';
            if (!imageUrl) return null;
            return (
                <figure key={block.id || index} style={styles.figure}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt={caption || 'Article image'} style={styles.image} />
                    {caption && <figcaption style={styles.caption}>{caption}</figcaption>}
                </figure>
            );
        }
        case 'callout': {
            const anchorId = isEmojiSection(text) ? generateAnchorId(text) : '';
            return (
                <div id={anchorId} key={block.id || index} style={styles.callout}>
                    <p style={styles.calloutText}>{text}</p>
                </div>
            );
        }
        case 'to_do': {
            const checked = blockContent.checked || false;
            return (
                <div key={block.id || index} style={styles.todoItem}>
                    <input type="checkbox" checked={checked} readOnly style={styles.checkbox} />
                    <span style={checked ? styles.todoChecked : styles.todoText}>{text}</span>
                </div>
            );
        }
        default:
            if (text.trim()) {
                return (
                    <p key={block.id || index} style={styles.paragraph}>
                        {text}
                    </p>
                );
            }
            return null;
    }
}

const styles = {
    container: {
        maxWidth: '720px',
        margin: '0 auto',
        padding: '40px 20px 80px',
    } as React.CSSProperties,
    backLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: '#666',
        fontSize: '14px',
        marginBottom: '48px',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
    } as React.CSSProperties,
    categoryLabel: {
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '1.5px',
        color: '#e63946',
        marginBottom: '12px',
    } as React.CSSProperties,
    featuredBadge: {
        display: 'inline-block',
        backgroundColor: '#111',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.5px',
        padding: '4px 10px',
        textTransform: 'uppercase' as const,
        marginBottom: '12px',
    } as React.CSSProperties,
    title: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '44px',
        fontWeight: 700,
        lineHeight: 1.15,
        color: '#111',
        marginBottom: '16px',
        letterSpacing: '-0.5px',
    } as React.CSSProperties,
    meta: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap' as const,
        alignItems: 'center',
        gap: '8px',
    } as React.CSSProperties,
    metaAuthor: {
        fontWeight: 500,
        color: '#333',
    } as React.CSSProperties,
    cover: {
        width: '100%',
        borderRadius: '8px',
        marginBottom: '48px',
    } as React.CSSProperties,
    content: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '20px',
        lineHeight: 1.8,
        color: '#111',
    } as React.CSSProperties,
    paragraph: {
        marginBottom: '24px',
    } as React.CSSProperties,
    paragraphSpacing: {
        height: '24px',
    } as React.CSSProperties,
    h1: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: 1.3,
        color: '#111',
        marginTop: '48px',
        marginBottom: '16px',
        scrollMarginTop: '100px',
    } as React.CSSProperties,
    h2: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '26px',
        fontWeight: 700,
        lineHeight: 1.3,
        color: '#111',
        marginTop: '40px',
        marginBottom: '12px',
        scrollMarginTop: '100px',
    } as React.CSSProperties,
    h3: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: 1.3,
        color: '#111',
        marginTop: '32px',
        marginBottom: '8px',
        scrollMarginTop: '100px',
    } as React.CSSProperties,
    listItem: {
        marginLeft: '24px',
        marginBottom: '12px',
        lineHeight: 1.7,
    } as React.CSSProperties,
    blockquote: {
        borderLeft: '3px solid #ccc',
        paddingLeft: '24px',
        marginLeft: 0,
        marginTop: '32px',
        marginBottom: '32px',
        fontStyle: 'italic',
        color: '#555',
        fontSize: '22px',
        lineHeight: 1.6,
    } as React.CSSProperties,
    codeBlock: {
        backgroundColor: '#1a1a1a',
        color: '#e0e0e0',
        padding: '20px',
        borderRadius: '8px',
        overflowX: 'auto' as const,
        marginTop: '24px',
        marginBottom: '24px',
        fontSize: '15px',
        lineHeight: 1.5,
    } as React.CSSProperties,
    divider: {
        border: 'none',
        borderTop: '1px solid #eee',
        margin: '40px 0',
    } as React.CSSProperties,
    figure: {
        marginTop: '32px',
        marginBottom: '32px',
    } as React.CSSProperties,
    image: {
        width: '100%',
        borderRadius: '8px',
    } as React.CSSProperties,
    caption: {
        fontSize: '14px',
        color: '#888',
        marginTop: '12px',
        textAlign: 'center' as const,
        fontStyle: 'italic' as const,
    } as React.CSSProperties,
    callout: {
        backgroundColor: '#f8f8f8',
        borderLeft: '4px solid #333',
        padding: '20px 24px',
        marginTop: '24px',
        marginBottom: '24px',
        borderRadius: '0 8px 8px 0',
    } as React.CSSProperties,
    calloutText: {
        margin: 0,
        fontSize: '18px',
        lineHeight: 1.7,
    } as React.CSSProperties,
    todoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '12px',
    } as React.CSSProperties,
    checkbox: {
        marginTop: '6px',
        accentColor: '#333',
    } as React.CSSProperties,
    todoText: {
        lineHeight: 1.7,
    } as React.CSSProperties,
    todoChecked: {
        lineHeight: 1.7,
        textDecoration: 'line-through',
        color: '#999',
    } as React.CSSProperties,
    errorBox: {
        padding: '24px',
        backgroundColor: '#fef9e7',
        borderRadius: '8px',
        textAlign: 'center' as const,
        marginTop: '32px',
    } as React.CSSProperties,
    relatedSection: {
        marginTop: '64px',
        paddingTop: '40px',
        borderTop: '1px solid #eee',
    } as React.CSSProperties,
    relatedTitle: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '28px',
        fontWeight: 700,
        color: '#111',
        marginBottom: '24px',
    } as React.CSSProperties,
    relatedGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
    } as React.CSSProperties,
    articleCard: {
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #eee',
        transition: 'all 0.3s ease',
    } as React.CSSProperties,
    articleCardImage: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
    } as React.CSSProperties,
    articleCardContent: {
        padding: '16px',
    } as React.CSSProperties,
    articleCardCategory: {
        display: 'inline-block',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        color: '#e63946',
        marginBottom: '8px',
    } as React.CSSProperties,
    articleCardTitle: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '18px',
        fontWeight: 700,
        color: '#111',
        lineHeight: 1.4,
        marginBottom: '8px',
    } as React.CSSProperties,
    articleCardDate: {
        fontSize: '13px',
        color: '#888',
    } as React.CSSProperties,
    cta: {
        marginTop: '64px',
        paddingTop: '40px',
        borderTop: '1px solid #eee',
        textAlign: 'center' as const,
    } as React.CSSProperties,
    ctaTitle: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '28px',
        fontWeight: 700,
        color: '#111',
        marginBottom: '12px',
    } as React.CSSProperties,
    ctaText: {
        color: '#666',
        marginBottom: '24px',
        fontSize: '16px',
    } as React.CSSProperties,
    ctaButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap' as const,
    } as React.CSSProperties,
    ctaPrimary: {
        padding: '14px 28px',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: '100px',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 500,
        transition: 'background-color 0.2s ease',
    } as React.CSSProperties,
    ctaSecondary: {
        padding: '14px 28px',
        backgroundColor: 'transparent',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '100px',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 500,
        transition: 'all 0.2s ease',
    } as React.CSSProperties,
};

export default async function BlogPostPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let blocks: any[] = [];
    let contentError = false;
    let tocItems: TocItem[] = [];
    let relatedArticles: BlogPost[] = [];

    try {
        blocks = await getBlocks(post.id);
        tocItems = extractHeadingsFromBlocks(blocks);
        
        const allPosts = await getPublishedPosts();
        relatedArticles = allPosts
            .filter(p => p.id !== post.id)
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
            .slice(0, 4);
    } catch (error) {
        console.error('[Notion] Failed to fetch blocks:', error);
        contentError = true;
    }

    const publishedIso = new Date(post.publishDate).toISOString();
    const lastUpdatedIso = post.lastUpdated ? new Date(post.lastUpdated).toISOString() : publishedIso;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://islandapp.id';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription || `Read ${post.title} on Island.`,
        ...(post.coverImage && { image: post.coverImage }),
        author: {
            '@type': 'Person',
            name: post.author || 'Island Team',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Island',
        },
        datePublished: publishedIso,
        dateModified: lastUpdatedIso,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/articles/${post.slug}`,
        },
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Articles', item: `${baseUrl}/articles` },
            { '@type': 'ListItem', position: 3, name: post.title, item: `${baseUrl}/articles/${post.slug}` },
        ],
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
            />

            <article style={styles.container}>
                <Link href="/articles" style={styles.backLink}>
                    <ArrowLeft style={{ width: '16px', height: '16px' }} />
                    Back to Articles
                </Link>

                {post.featured && (
                    <div style={styles.featuredBadge}>Featured</div>
                )}

                <p style={styles.categoryLabel}>
                    {post.category || 'General'}
                </p>

                <h1 style={styles.title}>
                    {post.title || 'Untitled'}
                </h1>

                <div style={styles.meta}>
                    {post.author && (
                        <span style={styles.metaAuthor}>{post.author}</span>
                    )}
                    {post.author && <span> · </span>}
                    <span>Dipublikasikan {formatDate(post.publishDate)}</span>
                    {post.lastUpdated && (
                        <>
                            <span> · </span>
                            <span>Diperbarui {formatDate(post.lastUpdated)}</span>
                        </>
                    )}
                </div>

                {post.tags && post.tags.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                        <TagsDisplay tags={post.tags} />
                    </div>
                )}

                {post.coverImage ? (
                    <ArticleCoverImage
                        src={post.coverImage}
                        alt={post.title || 'Article cover'}
                        caption={post.imageCaption}
                    />
                ) : null}

                {tocItems.length > 0 && <TableOfContents items={tocItems} />}

                <div style={styles.content}>
                    {contentError ? (
                        <div style={styles.errorBox}>
                            <p style={{ fontWeight: 500, marginBottom: '8px', color: '#856404' }}>
                                Content temporarily unavailable
                            </p>
                            <p style={{ fontSize: '14px', color: '#856404' }}>
                                This article content could not be loaded. Please try again later.
                            </p>
                        </div>
                    ) : blocks.length === 0 ? (
                        <div style={styles.errorBox}>
                            <p style={{ color: '#666' }}>This article has no content yet.</p>
                        </div>
                    ) : (
                        <div>
                            {blocks.map((block, index) => renderBlock(block, index))}
                        </div>
                    )}
                </div>

                {relatedArticles.length > 0 && (
                    <section style={styles.relatedSection}>
                        <h2 style={styles.relatedTitle}>Artikel Terbaru</h2>
                        <div style={styles.relatedGrid}>
                            {relatedArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/articles/${article.slug}`}
                                    style={styles.articleCard}
                                >
                                    {article.coverImage && (
                                        <img
                                            src={article.coverImage}
                                            alt={article.title}
                                            style={styles.articleCardImage}
                                        />
                                    )}
                                    <div style={styles.articleCardContent}>
                                        <span style={styles.articleCardCategory}>
                                            {article.category}
                                        </span>
                                        <h3 style={styles.articleCardTitle}>
                                            {article.title}
                                        </h3>
                                        <span style={styles.articleCardDate}>
                                            {formatDate(article.publishDate)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
}
