"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/notion";

function formatDate(dateString: string): string {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
        });
    } catch {
        return "";
    }
}

interface ArticleCardProps {
    article: BlogPost;
}

function ArticleCard({ article }: ArticleCardProps) {
    const coverImage = article.coverImage;
    const title = article.title || article.metaTitle || "Untitled Article";
    const description = article.metaDescription || "";
    const category = article.category || "General";
    const publishDate = formatDate(article.publishDate);

    return (
        <article className="group">
            <Link 
                href={`/articles/${article.slug}`}
                className="block bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] transition-all duration-300 rounded-xl overflow-hidden border border-white/5 hover:border-[var(--accent-green)]/30"
            >
                <div className="relative overflow-hidden">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt={title}
                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-44 bg-gradient-to-br from-[var(--accent-green)]/20 via-purple-500/10 to-blue-500/20 flex items-center justify-center">
                            <span className="text-5xl">📚</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-[var(--accent-green)] text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                            {category}
                        </span>
                    </div>
                </div>

                <div className="p-4">
                    <h3 
                        className="font-semibold text-white leading-snug line-clamp-2 group-hover:text-[var(--accent-green)] transition-colors duration-200"
                        itemProp="headline"
                    >
                        {title}
                    </h3>
                    
                    {description && (
                        <p 
                            className="text-gray-400 text-sm mt-2 line-clamp-3 leading-relaxed"
                            itemProp="description"
                        >
                            {description}
                        </p>
                    )}

                    {publishDate && (
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {publishDate}
                        </div>
                    )}
                </div>
            </Link>
        </article>
    );
}

function ArticleCardSkeleton() {
    return (
        <div className="bg-[var(--bg-secondary)] rounded-xl overflow-hidden animate-pulse">
            <div className="w-full h-44 bg-gray-800" />
            <div className="p-4">
                <div className="h-4 bg-gray-800 rounded w-1/4 mb-3" />
                <div className="space-y-2">
                    <div className="h-5 bg-gray-800 rounded" />
                    <div className="h-5 bg-gray-800 rounded w-3/4" />
                </div>
                <div className="mt-3 space-y-1.5">
                    <div className="h-3 bg-gray-800 rounded w-full" />
                    <div className="h-3 bg-gray-800 rounded w-5/6" />
                    <div className="h-3 bg-gray-800 rounded w-4/6" />
                </div>
            </div>
        </div>
    );
}

interface RecommendedArticlesProps {
    limit?: number;
    showTitle?: boolean;
    title?: string;
}

export default function RecommendedArticles({ limit = 6, showTitle = true, title = "Pilihan Untukmu" }: RecommendedArticlesProps) {
    const [articles, setArticles] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchArticles() {
            try {
                const response = await fetch("/api/articles", { cache: 'no-store' });
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                const posts: BlogPost[] = data.posts || [];
                
                if (!mounted) return;

                const allPosts = posts.sort(
                    (a: BlogPost, b: BlogPost) => {
                        const dateA = new Date(a.publishDate || 0).getTime();
                        const dateB = new Date(b.publishDate || 0).getTime();
                        return dateB - dateA;
                    }
                );

                setArticles(allPosts.slice(0, limit));
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchArticles();

        return () => { mounted = false; };
    }, [limit]);

    if (loading) {
        return (
            <section className="max-w-6xl mx-auto px-4 mb-20">
                {showTitle && (
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <span className="text-2xl">🔥</span>
                            {title}
                        </h2>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ArticleCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    if (articles.length === 0) {
        return null;
    }

    return (
        <section className="max-w-6xl mx-auto px-4 mb-20">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    {title}
                </h2>
                <Link 
                    href="/articles" 
                    className="text-[var(--accent-green)] hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-1 group"
                >
                    Lihat semua
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}
