"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/notion";

export default function ArticlesPreview() {
    const [articles, setArticles] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                console.log("[ArticlesPreview] Fetching articles from API...");
                const res = await fetch("/api/articles", {
                    next: { revalidate: 60 }
                });
                
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }
                
                const data = await res.json();
                console.log("[ArticlesPreview] API Response:", data);
                
                if (data.success && data.posts) {
                    setArticles(data.posts);
                    console.log("[ArticlesPreview] Set articles:", data.posts.length);
                } else {
                    console.warn("[ArticlesPreview] API returned no success:", data);
                    setError(data.error || "Failed to fetch articles");
                }
            } catch (err) {
                console.error("[ArticlesPreview] Fetch error:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, []);

    return (
        <section className="py-24 bg-[var(--bg-secondary)]">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--heading-text)] mb-2">
                            Latest Articles
                        </h2>
                        <p className="text-[var(--paragraph-text)]">
                            Insights and research across health, economy, and technology
                        </p>
                    </div>
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-2 text-[var(--accent-green)] font-medium hover:underline"
                    >
                        Read More Articles
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-color)] animate-pulse"
                            >
                                <div className="h-6 w-20 bg-gray-200 rounded-full mb-4" />
                                <div className="h-6 bg-gray-200 rounded mb-3" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-[var(--paragraph-text)]">Unable to load articles</p>
                        <p className="text-sm text-gray-400 mt-2">{error}</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-[var(--paragraph-text)]">No articles available yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.slug}`}
                                className="group bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-[var(--accent-green)]/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                            >
                                <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--accent-green)] bg-[var(--accent-green)]/10 rounded-full mb-4">
                                    {article.category || "General"}
                                </span>
                                <h3 className="text-lg font-bold text-[var(--heading-text)] mb-3 group-hover:text-[var(--accent-green)] transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-[var(--paragraph-text)] line-clamp-3">
                                    {article.metaDescription || article.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
