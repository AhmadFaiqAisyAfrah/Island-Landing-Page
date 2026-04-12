'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLayoutMode, LayoutSwitcher } from '@/components/LayoutSwitcher';
import { ModernArticlesLayout } from '@/components/ModernArticlesLayout';
import { ClassicArticlesLayout } from '@/components/ClassicArticlesLayout';
import type { BlogPost } from '@/lib/notion';

interface ArticlesPageClientProps {
    posts: BlogPost[];
}

function NYTimesHeader() {
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div style={{
            borderBottom: '1px solid #e5e5e5',
            paddingBottom: '16px',
            marginBottom: '16px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'Georgia, "Times New Roman", serif'
            }}>
                <time style={{
                    fontSize: '14px',
                    color: '#333'
                }}>
                    {formattedDate}
                </time>
                <span style={{
                    fontSize: '14px',
                    color: '#666'
                }}>
                    Island
                </span>
            </div>
        </div>
    );
}

function CategoryNav({ 
    categories, 
    selected, 
    onSelect 
}: { 
    categories: string[]; 
    selected: string | null;
    onSelect: (cat: string | null) => void;
}) {
    return (
        <nav style={{
            borderBottom: '1px solid #e5e5e5',
            marginBottom: '24px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
        }}>
            <style>{`
                .category-nav::-webkit-scrollbar { display: none; }
            `}</style>
            <div 
                className="category-nav"
                style={{
                    display: 'flex',
                    gap: '0',
                    paddingBottom: '0',
                    minWidth: 'max-content'
                }}
            >
                <button
                    onClick={() => onSelect(null)}
                    style={{
                        padding: '12px 20px',
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '13px',
                        fontWeight: selected === null ? 700 : 400,
                        color: selected === null ? '#111' : '#666',
                        background: 'none',
                        border: 'none',
                        borderBottom: selected === null ? '2px solid #111' : '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                    }}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onSelect(cat)}
                        style={{
                            padding: '12px 20px',
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            fontSize: '13px',
                            fontWeight: selected === cat ? 700 : 400,
                            color: selected === cat ? '#111' : '#666',
                            background: 'none',
                            border: 'none',
                            borderBottom: selected === cat ? '2px solid #111' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </nav>
    );
}

function TagNav({ 
    tags, 
    selected, 
    onSelect,
    showAll = false,
    onToggleAll
}: { 
    tags: { name: string; count: number }[]; 
    selected: string | null;
    onSelect: (tag: string | null) => void;
    showAll?: boolean;
    onToggleAll?: () => void;
}) {
    const MAX_VISIBLE_TAGS = 8;
    const displayTags = showAll ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
    const hasMore = !showAll && tags.length > MAX_VISIBLE_TAGS;

    if (tags.length === 0) return null;

    return (
        <nav style={{
            marginBottom: '24px',
            padding: '16px 0',
            borderBottom: '1px solid #eee'
        }}>
            <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={() => onSelect(null)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: selected === null ? 600 : 500,
                        color: selected === null ? '#fff' : '#666',
                        backgroundColor: selected === null ? '#111' : '#f5f5f5',
                        border: selected === null ? '1px solid #111' : '1px solid #e0e0e0',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px'
                    }}
                >
                    Semua
                </button>
                {displayTags.map(({ name, count }) => (
                    <button
                        key={name}
                        onClick={() => onSelect(name)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: selected === name ? 600 : 500,
                            color: selected === name ? '#fff' : '#555',
                            backgroundColor: selected === name ? '#111' : '#f5f5f5',
                            border: selected === name ? '1px solid #111' : '1px solid #e0e0e0',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {name}
                        <span style={{
                            fontSize: '10px',
                            opacity: 0.7,
                            fontWeight: 400
                        }}>
                            ({count})
                        </span>
                    </button>
                ))}
                {hasMore && (
                    <button
                        onClick={onToggleAll}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#e63946',
                            backgroundColor: 'transparent',
                            border: '1px solid #e63946',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        +{tags.length - MAX_VISIBLE_TAGS} lainnya
                    </button>
                )}
                {showAll && tags.length > MAX_VISIBLE_TAGS && (
                    <button
                        onClick={onToggleAll}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#666',
                            backgroundColor: 'transparent',
                            border: '1px solid #ddd',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Tutup
                    </button>
                )}
            </div>
        </nav>
    );
}

function SearchBar({ 
    value, 
    onChange 
}: { 
    value: string; 
    onChange: (value: string) => void;
}) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search articles or topics..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontFamily: 'Georgia, serif',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                }}
            />
        </div>
    );
}

function NYTimesArticlesList({ posts }: { posts: BlogPost[] }) {
    const safePosts = posts || [];
    const featuredPost = safePosts.find((p) => p.featured) || safePosts[0];
    const nonFeaturedPosts = safePosts.filter((p) => p.id !== featuredPost?.id);

    if (safePosts.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#666' }}>
                    No articles found.
                </p>
            </div>
        );
    }

    return (
        <div>
            {featuredPost && (
                <article style={{
                    borderBottom: '1px solid #e5e5e5',
                    paddingBottom: '48px',
                    marginBottom: '48px'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.5fr 1fr',
                        gap: '48px',
                        alignItems: 'start'
                    }}>
                        <div>
                            <p style={{
                                fontFamily: 'Georgia, "Times New Roman", serif',
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: '#666',
                                marginBottom: '12px'
                            }}>
                                {featuredPost.category || 'General'} · Featured
                            </p>
                            <h2 style={{
                                fontFamily: 'Georgia, "Times New Roman", serif',
                                fontSize: '42px',
                                fontWeight: 700,
                                lineHeight: 1.15,
                                letterSpacing: '-0.5px',
                                color: '#111',
                                marginBottom: '16px'
                            }}>
                                <Link href={`/articles/${featuredPost.slug}`} style={{ color: '#111', textDecoration: 'none' }}>
                                    {featuredPost.title}
                                </Link>
                            </h2>
                            <p style={{
                                fontFamily: 'Georgia, serif',
                                fontSize: '18px',
                                lineHeight: 1.6,
                                color: '#444',
                                marginBottom: '16px'
                            }}>
                                {featuredPost.metaDescription}
                            </p>
                            <div style={{ fontSize: '14px', color: '#666' }}>
                                {featuredPost.author && <span style={{ fontWeight: 500 }}>{featuredPost.author}</span>}
                                {featuredPost.author && <span> · </span>}
                                <time>
                                    {new Date(featuredPost.publishDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </time>
                            </div>
                        </div>
                        {featuredPost.coverImage && (
                            <div>
                                <Link href={`/articles/${featuredPost.slug}`}>
                                    <Image
                                        src={featuredPost.coverImage}
                                        alt={featuredPost.title}
                                        width={600}
                                        height={400}
                                        style={{
                                            width: '100%',
                                            height: 'auto'
                                        }}
                                        priority
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                </article>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '40px 48px'
            }}>
                {nonFeaturedPosts.map((post) => (
                    <article key={post.id} style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '24px' }}>
                        <p style={{
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            color: '#666',
                            marginBottom: '8px'
                        }}>
                            {post.category || 'General'}
                        </p>
                        <h3 style={{
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            fontSize: '20px',
                            fontWeight: 700,
                            lineHeight: 1.25,
                            color: '#111',
                            marginBottom: '8px'
                        }}>
                            <Link href={`/articles/${post.slug}`} style={{ color: '#111', textDecoration: 'none' }}>
                                {post.title}
                            </Link>
                        </h3>
                        <p style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '15px',
                            lineHeight: 1.5,
                            color: '#555',
                            marginBottom: '8px'
                        }}>
                            {post.metaDescription?.substring(0, 120)}...
                        </p>
                        <time style={{ fontSize: '13px', color: '#888' }}>
                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </time>
                    </article>
                ))}
            </div>
        </div>
    );
}

export function ArticlesPageClient({ posts }: ArticlesPageClientProps) {
    const { layoutMode, changeLayout, mounted } = useLayoutMode();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllTags, setShowAllTags] = useState(false);
    
    const safePosts = posts || [];
    
    const categories = useMemo(() => {
        const cats = new Set(safePosts.map((p) => p.category || 'General'));
        return Array.from(cats).sort();
    }, [safePosts]);

    // Filter posts by search query first
    const postsBySearch = useMemo(() => {
        if (!searchQuery.trim()) return safePosts;
        const query = searchQuery.toLowerCase();
        return safePosts.filter((p) => {
            const titleMatch = p.title?.toLowerCase().includes(query);
            const tagMatch = p.tags?.some(t => t.toLowerCase().includes(query));
            const descMatch = p.metaDescription?.toLowerCase().includes(query);
            return titleMatch || tagMatch || descMatch;
        });
    }, [safePosts, searchQuery]);

    // Filter posts by selected category
    const postsByCategory = useMemo(() => {
        if (!selectedCategory) return postsBySearch;
        return postsBySearch.filter((p) => (p.category || 'General') === selectedCategory);
    }, [postsBySearch, selectedCategory]);

    // Extract tags from filtered posts (based on selected category)
    const tagsWithCounts = useMemo(() => {
        const tagMap = new Map<string, number>();
        postsByCategory.forEach((post) => {
            if (post.tags && post.tags.length > 0) {
                post.tags.forEach((tag) => {
                    tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
                });
            }
        });
        return Array.from(tagMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }, [postsByCategory, selectedCategory]);

    // Apply tag filter to posts
    const filteredPosts = useMemo(() => {
        let result = postsByCategory;
        
        if (selectedTag) {
            result = result.filter((p) => 
                p.tags && p.tags.includes(selectedTag)
            );
        }
        
        return result;
    }, [postsByCategory, selectedTag]);

    const showNYTimesLayout = mounted && layoutMode === 'modern';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 80px' }}>
                <NYTimesHeader />
                
                <header style={{ 
                    textAlign: 'center', 
                    marginBottom: '32px',
                    paddingBottom: '24px',
                    borderBottom: '3px solid #111'
                }}>
                    <h1 style={{ 
                        fontFamily: 'Georgia, "Times New Roman", serif', 
                        fontSize: '56px', 
                        fontWeight: 700, 
                        color: '#111',
                        lineHeight: 1,
                        letterSpacing: '-1px',
                        margin: '0 0 12px 0'
                    }}>
                        Island Articles
                    </h1>
                    <p style={{ 
                        fontFamily: 'Georgia, serif', 
                        fontSize: '16px', 
                        color: '#666',
                        fontStyle: 'italic',
                        margin: 0
                    }}>
                        Ideas and insights across topics that matter in today&apos;s world.
                    </p>
                </header>

                <CategoryNav 
                    categories={categories} 
                    selected={selectedCategory}
                    onSelect={(cat) => {
                        setSelectedCategory(cat);
                        setSelectedTag(null);
                    }}
                />

                <SearchBar value={searchQuery} onChange={setSearchQuery} />

                <TagNav 
                    tags={tagsWithCounts} 
                    selected={selectedTag}
                    onSelect={(tag) => {
                        if (tag && !tagsWithCounts.some(t => t.name === tag)) {
                            setSelectedTag(null);
                        } else {
                            setSelectedTag(tag);
                        }
                    }}
                    showAll={showAllTags}
                    onToggleAll={() => setShowAllTags(!showAllTags)}
                />

                {mounted && (
                    <LayoutSwitcher 
                        currentMode={layoutMode} 
                        onModeChange={changeLayout} 
                    />
                )}

                <div style={{ 
                    opacity: mounted ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}>
                    {layoutMode === 'classic' ? (
                        <ClassicArticlesLayout posts={filteredPosts} />
                    ) : showNYTimesLayout ? (
                        <NYTimesArticlesList posts={filteredPosts} />
                    ) : (
                        <ModernArticlesLayout posts={filteredPosts} />
                    )}
                </div>

                <div style={{ 
                    borderTop: '1px solid #e5e5e5', 
                    marginTop: '64px', 
                    paddingTop: '24px', 
                    textAlign: 'center' 
                }}>
                    <Link href="/" style={{ 
                        fontFamily: 'Georgia, serif', 
                        fontSize: '14px', 
                        color: '#666', 
                        textDecoration: 'none'
                    }}>
                        ← Back to Island
                    </Link>
                </div>
            </div>
        </div>
    );
}
