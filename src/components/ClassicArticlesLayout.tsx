import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/notion';

interface ClassicArticlesLayoutProps {
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

function FeaturedStory({ post }: { post: BlogPost }) {
    return (
        <div style={{ 
            borderBottom: '1px solid #ddd',
            paddingBottom: '24px',
            marginBottom: '32px'
        }}>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1.2fr 1fr',
                gap: '40px',
                alignItems: 'start'
            }}>
                <div style={{ borderRight: '1px solid #ddd', paddingRight: '40px' }}>
                    <p style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#333',
                        marginBottom: '12px'
                    }}>
                        {post.category || 'General'}
                    </p>
                    <h2 style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '28px',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: '#111',
                        marginBottom: '12px'
                    }}>
                        <Link href={`/articles/${post.slug}`} style={{ color: '#111', textDecoration: 'none' }}>
                            {post.title}
                        </Link>
                    </h2>
                    <p style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '15px',
                        lineHeight: 1.5,
                        color: '#444',
                        marginBottom: '12px'
                    }}>
                        {post.metaDescription?.substring(0, 120)}...
                    </p>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        <span>{post.author || 'Island'}</span>
                        <span style={{ margin: '0 6px' }}>·</span>
                        <time>
                            {new Date(post.publishDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                            })}
                        </time>
                    </div>
                </div>
                
                <div style={{ borderRight: '1px solid #ddd', paddingRight: '40px' }}>
                    {post.coverImage && (
                        <Link href={`/articles/${post.slug}`}>
                            <Image
                                src={post.coverImage}
                                alt={post.title || 'Featured'}
                                width={500}
                                height={320}
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    marginBottom: '12px' 
                                }}
                                priority
                            />
                        </Link>
                    )}
                    <p style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '12px',
                        color: '#666',
                        fontStyle: 'italic'
                    }}>
                        {post.category || 'General'} · Featured Story
                    </p>
                </div>
                
                <div>
                    <p style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: '#333',
                        marginBottom: '16px',
                        paddingBottom: '8px',
                        borderBottom: '2px solid #111'
                    }}>
                        More Stories
                    </p>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                        {post.author && <span style={{ fontWeight: 500, color: '#333' }}>By {post.author}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArticleListItem({ post }: { post: BlogPost }) {
    return (
        <div style={{ 
            borderBottom: '1px solid #eee',
            paddingBottom: '16px',
            marginBottom: '16px'
        }}>
            <p style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#666',
                marginBottom: '6px'
            }}>
                {post.category || 'General'}
            </p>
            <h3 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: 1.25,
                color: '#111',
                marginBottom: '6px'
            }}>
                <Link href={`/articles/${post.slug}`} style={{ color: '#111', textDecoration: 'none' }}>
                    {post.title}
                </Link>
            </h3>
            <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '13px',
                lineHeight: 1.4,
                color: '#555',
                marginBottom: '6px'
            }}>
                {post.metaDescription?.substring(0, 80)}...
            </p>
            <time style={{ fontSize: '11px', color: '#888' }}>
                {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </time>
        </div>
    );
}

function CategorySection({ category, posts }: { category: string; posts: BlogPost[] }) {
    return (
        <section style={{ marginBottom: '48px' }}>
            <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid #111'
            }}>
                <h2 style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#111',
                    margin: 0
                }}>
                    {category}
                </h2>
            </div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: '32px'
            }}>
                {posts.slice(0, 3).map((post, index) => (
                    <div key={post.id} style={{ 
                        borderRight: index < 2 ? '1px solid #eee' : 'none',
                        paddingRight: index < 2 ? '32px' : '0'
                    }}>
                        <ArticleListItem post={post} />
                    </div>
                ))}
            </div>
            {posts.length > 3 && (
                <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                    {posts.slice(3).map((post) => (
                        <div key={post.id} style={{ flex: '1 1 200px', maxWidth: '250px' }}>
                            <ArticleListItem post={post} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export function ClassicArticlesLayout({ posts }: ClassicArticlesLayoutProps) {
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
            {featuredPost && <FeaturedStory post={featuredPost} />}
            
            <div style={{ borderBottom: '4px solid #111', marginBottom: '32px' }} />
            
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
