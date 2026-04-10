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

interface SideArticlesProps {
    limit?: number;
}

export default function SideArticles({ limit = 5 }: SideArticlesProps) {
    const [articles, setArticles] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchArticles() {
            try {
                const response = await fetch("/api/articles", {
                    cache: 'no-store'
                });
                
                if (!response.ok) throw new Error("Failed to fetch");
                
                const data = await response.json();
                const posts: BlogPost[] = data.posts || [];
                
                if (!mounted) return;
                
                // Show ALL posts without filtering (DEBUG MODE)
                const allPosts = posts.sort(
                    (a: BlogPost, b: BlogPost) => {
                        const dateA = new Date(a.publishDate || 0).getTime();
                        const dateB = new Date(b.publishDate || 0).getTime();
                        return dateB - dateA;
                    }
                );

                setArticles(allPosts.slice(0, limit));
            } catch (error) {
                console.error("Error fetching side articles:", error);
                if (mounted) {
                    setArticles([]);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        fetchArticles();

        return () => {
            mounted = false;
        };
    }, [limit]);

    if (loading) {
        return (
            <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📚 Keep Learning
                </h3>
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-3 animate-pulse">
                            <div className="w-20 h-20 bg-gray-800 rounded-lg flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-16 bg-gray-800 rounded" />
                                <div className="h-4 w-full bg-gray-800 rounded" />
                                <div className="h-4 w-2/3 bg-gray-800 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📚 Keep Learning
                </h3>
                <p className="text-gray-400 text-sm">Articles coming soon...</p>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                📚 Keep Learning
            </h3>
            <div className="space-y-4">
                {articles.slice(0, 5).map((article) => (
                    <Link 
                        key={article.id} 
                        href={`/articles/${article.slug}`}
                        className="block group"
                    >
                        <div className="flex gap-3 group-hover:opacity-80 transition-opacity">
                            <div className="w-20 h-20 object-cover rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                                {article.coverImage ? (
                                    <img
                                        src={article.coverImage}
                                        alt={article.title || "Article cover"}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-green)]/20 to-purple-500/20">
                                        <span className="text-xl">📖</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                                    {article.category || "General"}
                                </p>
                                <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-[var(--accent-green)] transition-colors">
                                    {article.title || article.metaTitle || "Untitled Article"}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(article.publishDate)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Link 
                href="/articles"
                className="inline-flex items-center gap-1 mt-4 text-sm text-[var(--accent-green)] hover:underline"
            >
                Lihat Semua
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}
