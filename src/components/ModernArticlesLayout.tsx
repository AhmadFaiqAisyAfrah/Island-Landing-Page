import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/notion';

interface ModernArticlesLayoutProps {
    posts: BlogPost[];
}

function groupByCategory(posts: BlogPost[]): Map<string, BlogPost[]> {
    const grouped = new Map<string, BlogPost[]>();
    const safePosts = posts || [];
    
    for (const post of safePosts) {
        const category = post?.category || 'General';
        if (!grouped.has(category)) {
            grouped.set(category, []);
        }
        grouped.get(category)!.push(post);
    }
    
    return grouped;
}

function sortCategories(categories: string[]): string[] {
    const priorityOrder = ['Featured', 'Health', 'Economy', 'Education', 'Productivity', 'Mindset', 'Technology', 'Lifestyle'];
    
    return [...categories].sort((a, b) => {
        const aIndex = priorityOrder.indexOf(a);
        const bIndex = priorityOrder.indexOf(b);
        
        if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
        }
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        
        return a.localeCompare(b);
    });
}

function FeaturedHero({ post }: { post: BlogPost }) {
    return (
        <div style={{ 
            gridColumn: '1 / -1',
            marginBottom: '48px',
            borderBottom: '2px solid #111',
            paddingBottom: '40px'
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
                {post.coverImage && (
                    <Link href={`/articles/${post.slug}`} style={{ display: 'block' }}>
                        <Image
                            src={post.coverImage}
                            alt={post.title || 'Featured article'}
                            width={800}
                            height={500}
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                            priority
                        />
                    </Link>
                )}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        {post.featured && (
                            <span style={{
                                backgroundColor: '#111',
                                color: '#fff',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '1px',
                                padding: '4px 10px',
                                textTransform: 'uppercase'
                            }}>
                                Featured
                            </span>
                        )}
                        <span style={{
                            fontSize: '12px',
                            color: '#666',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: 500
                        }}>
                            {post.category || 'General'}
                        </span>
                    </div>
                    <h2 style={{ 
                        fontFamily: 'Georgia, "Times New Roman", serif', 
                        fontSize: '42px', 
                        fontWeight: 700, 
                        lineHeight: 1.15,
                        marginBottom: '16px',
                        letterSpacing: '-0.5px'
                    }}>
                        <Link href={`/articles/${post.slug}`} style={{ color: '#111', textDecoration: 'none' }}>
                            {post.title}
                        </Link>
                    </h2>
                    <p style={{ 
                        fontFamily: 'Georgia, serif', 
                        fontSize: '20px', 
                        color: '#444',
                        lineHeight: 1.6,
                        marginBottom: '20px'
                    }}>
                        {post.metaDescription}
                    </p>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                        {post.author && <span style={{ fontWeight: 500, color: '#333' }}>{post.author}</span>}
                        {post.author && <span> · </span>}
                        <time>
                            {new Date(post.publishDate).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}
                        </time>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArticleCard({ post, size = 'normal' }: { post: BlogPost; size?: 'normal' | 'large' }) {
    const isLarge = size === 'large';
    
    return (
        <article style={{ marginBottom: '32px' }}>
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    {post.featured && (
                        <span style={{
                            backgroundColor: '#e63946',
                            color: '#fff',
                            fontSize: '9px',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            padding: '3px 8px',
                            textTransform: 'uppercase'
                        }}>
                            Featured
                        </span>
                    )}
                    <span style={{
                        fontSize: '11px',
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 500
                    }}>
                        {post.category || 'General'}
                    </span>
                </div>
                {post.coverImage && isLarge && (
                    <Link href={`/articles/${post.slug}`} style={{ display: 'block', marginBottom: '12px' }}>
                        <Image
                            src={post.coverImage}
                            alt={post.title || 'Article'}
                            width={600}
                            height={340}
                            style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                        />
                    </Link>
                )}
                <h3 style={{ 
                    fontFamily: 'Georgia, "Times New Roman", serif', 
                    fontSize: isLarge ? '24px' : '18px', 
                    fontWeight: 700, 
                    lineHeight: 1.25,
                    marginBottom: '8px'
                }}>
                    <Link href={`/articles/${post.slug}`} style={{ color: '#111', textDecoration: 'none' }}>
                        {post.title}
                    </Link>
                </h3>
                <p style={{ 
                    fontFamily: 'Georgia, serif', 
                    fontSize: '15px', 
                    color: '#666',
                    lineHeight: 1.5,
                    marginBottom: '8px'
                }}>
                    {post.metaDescription?.substring(0, isLarge ? 140 : 100)}...
                </p>
                <time style={{ fontSize: '12px', color: '#999' }}>
                    {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
            </div>
        </article>
    );
}

function CategorySection({ category, posts }: { category: string; posts: BlogPost[] }) {
    return (
        <section style={{ marginBottom: '56px' }}>
            <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <h2 style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#111',
                    margin: 0
                }}>
                    {category}
                </h2>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }} />
            </div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '32px'
            }}>
                {posts.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

export function ModernArticlesLayout({ posts }: ModernArticlesLayoutProps) {
    const safePosts = posts || [];
    
    const featuredPost = safePosts.find((p) => p.featured) || safePosts[0];
    const nonFeaturedPosts = safePosts.filter((p) => p.id !== featuredPost?.id);
    
    const grouped = groupByCategory(nonFeaturedPosts);
    const categories = sortCategories(Array.from(grouped.keys()));
    
    if (safePosts.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#666' }}>
                    No articles published yet.
                </p>
            </div>
        );
    }
    
    return (
        <div>
            {featuredPost && <FeaturedHero post={featuredPost} />}
            
            {categories.map((category) => (
                <CategorySection 
                    key={category} 
                    category={category} 
                    posts={grouped.get(category) || []} 
                />
            ))}
        </div>
    );
}
