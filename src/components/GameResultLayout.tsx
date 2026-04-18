"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/notion";

const gameOverImages = [
    "https://ik.imagekit.io/kv42h83lq/download%20(11).jpg",
    "https://ik.imagekit.io/kv42h83lq/download%20(9).jpg",
    "https://ik.imagekit.io/kv42h83lq/download%20(13).jpg",
    "https://ik.imagekit.io/kv42h83lq/download%20(14).jpg",
    "https://ik.imagekit.io/kv42h83lq/download%20(12).jpg",
    "https://ik.imagekit.io/kv42h83lq/Memes.jpg",
    "https://ik.imagekit.io/kv42h83lq/download%20(10).jpg",
    "https://ik.imagekit.io/kv42h83lq/download%20(8).jpg"
];

const captions = [
    "Gapapa salah, yang penting gak nyerah 🚀",
    "Santai aja, Einstein juga pernah salah 😌",
    "Otak lagi pemanasan nih 🔥",
    "Progress > Perfect 💯",
    "Yang penting jalan terus, bro 🧠",
    "Level up butuh proses 😎",
    "Hari ini gagal, besok jago ⚡",
    "Main lagi, kali ini pasti bisa 💪"
];

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

interface GameResultLayoutProps {
    children?: ReactNode;
    score: number;
    highScore: number;
    onRestart: () => void;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    iconBgColor?: string;
    customContent?: ReactNode;
}

export default function GameResultLayout({
    score,
    highScore,
    onRestart,
    title = "Game Over!",
    subtitle = "Great effort! Keep practicing to improve your score.",
    icon,
    iconBgColor = "bg-red-100",
    customContent,
}: GameResultLayoutProps) {
    const [randomImage] = useState(() => getRandomItem(gameOverImages));
    const [caption] = useState(() => getRandomItem(captions));
    const [articles, setArticles] = useState<BlogPost[]>([]);

    useEffect(() => {
        let mounted = true;
        async function fetchArticles() {
            try {
                const response = await fetch("/api/articles", { cache: 'no-store' });
                if (!response.ok) return;
                const data = await response.json();
                const posts: BlogPost[] = data.posts || [];
                if (!mounted) return;
                const sorted = posts.sort(
                    (a: BlogPost, b: BlogPost) =>
                        new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime()
                );
                setArticles(sorted.slice(0, 3));
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        }
        fetchArticles();
        return () => { mounted = false; };
    }, []);

    const isNewHighScore = score >= highScore && score > 0;

    return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="text-center">
                    <img
                        src={randomImage}
                        alt="Game Over"
                        className="w-full max-h-56 object-contain rounded-xl mx-auto bg-gray-100"
                    />
                    <p className="mt-4 text-sm text-gray-500 italic">
                        {caption}
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <div className={`w-16 h-16 rounded-full ${iconBgColor} flex items-center justify-center`}>
                        {icon || (
                            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        )}
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mt-4">
                    {title}
                </h2>
                <p className="text-center text-gray-600 mt-2 text-sm">
                    {subtitle}
                </p>

                {customContent || (
                    <div className="bg-gray-100 rounded-xl p-6 mt-6 text-center">
                        <p className="text-sm text-gray-500 mb-2">Your Score</p>
                        <p className="text-5xl font-bold text-emerald-600">{score}</p>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">High Score</p>
                            <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                {highScore}
                            </p>
                        </div>
                        {isNewHighScore && (
                            <p className="mt-3 text-sm text-emerald-600 font-semibold">
                                🎉 New High Score!
                            </p>
                        )}
                    </div>
                )}

                <button
                    onClick={onRestart}
                    className="w-full py-4 px-6 bg-emerald-500 text-white rounded-full font-semibold text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 mt-6"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Play Again
                </button>

                {articles.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm text-gray-700 font-medium">
                                📚 Rekomendasi untuk kamu
                            </p>
                            <Link
                                href="/articles"
                                className="text-sm text-emerald-600 hover:text-emerald-700 transition"
                            >
                                Lihat semua artikel →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {articles.slice(0, 3).map(article => (
                                <Link
                                    key={article.id}
                                    href={`/articles/${article.slug}`}
                                    className="block relative z-10"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition">
                                        {article.coverImage ? (
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-purple-100 rounded-md flex items-center justify-center text-lg">
                                                📚
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 uppercase">
                                                {article.category}
                                            </p>
                                            <p className="text-sm text-gray-800 line-clamp-2">
                                                {article.title}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
