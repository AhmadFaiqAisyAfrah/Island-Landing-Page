"use client";

import { useState, ReactNode } from "react";
import { Trophy, Heart, RotateCcw } from "lucide-react";
import Link from "next/link";

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

function getPerformanceColor(score: number, highScore: number): { label: string; color: string; bgColor: string } {
    const ratio = highScore > 0 ? score / highScore : 0;
    if (ratio >= 0.8) return { label: "Pro!", color: "text-yellow-400", bgColor: "bg-yellow-400/20" };
    if (ratio >= 0.5) return { label: "Good", color: "text-green-400", bgColor: "bg-green-400/20" };
    if (ratio >= 0.25) return { label: "Average", color: "text-blue-400", bgColor: "bg-blue-400/20" };
    return { label: "Keep Trying", color: "text-gray-400", bgColor: "bg-gray-400/20" };
}

interface GameLayoutProps {
    children: ReactNode;
    score: number;
    highScore: number;
    onRestart: () => void;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    iconBgColor?: string;
    customContent?: ReactNode;
    showPerformance?: boolean;
    performanceLabel?: string;
    performanceColor?: string;
    showMeme?: boolean;
}

export default function GameLayout({
    children,
    score,
    highScore,
    onRestart,
    title = "Game Over!",
    subtitle = "Great effort! Keep practicing to improve your score.",
    icon,
    iconBgColor = "bg-red-500/20",
    customContent,
    showPerformance = true,
    performanceLabel,
    performanceColor,
    showMeme = true
}: GameLayoutProps) {
    const [randomImage] = useState(() => getRandomItem(gameOverImages));
    const [caption] = useState(() => getRandomItem(captions));
    
    const performance = performanceLabel 
        ? { label: performanceLabel, color: performanceColor || "text-gray-400", bgColor: "bg-gray-400/20" }
        : getPerformanceColor(score, highScore);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
            <aside className="lg:sticky lg:top-24 lg:h-fit order-2 lg:order-1">
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
                    <div className="text-center">
                        {showMeme && (
                            <>
                                <img
                                    src={randomImage}
                                    alt="Game Over Meme"
                                    className="w-full h-auto max-h-[200px] object-contain rounded-xl mb-4 bg-white"
                                />
                                <p className="text-sm italic text-gray-400 mb-6">
                                    {caption}
                                </p>
                            </>
                        )}

                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${iconBgColor} flex items-center justify-center`}>
                            {icon || <Heart className="w-8 h-8 text-red-500" />}
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-2">
                            {title}
                        </h2>
                        <p className="text-[var(--paragraph-text)] mb-6 text-sm">
                            {subtitle}
                        </p>

                        {customContent || (
                            <div className="bg-[var(--bg-primary)] rounded-xl p-4 mb-6">
                                <div className="mb-3">
                                    <p className="text-xs text-[var(--text-secondary)] mb-1">Your Score</p>
                                    <p className="text-4xl font-bold text-[var(--accent-green)]">{score}</p>
                                </div>
                                <div className="pt-3 border-t border-[var(--border-color)]">
                                    <p className="text-xs text-[var(--text-secondary)] mb-1">High Score</p>
                                    <p className="text-xl font-bold text-[var(--heading-text)] flex items-center justify-center gap-1">
                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                        {highScore}
                                    </p>
                                </div>
                                {score >= highScore && score > 0 && (
                                    <p className="mt-3 text-sm text-[var(--accent-green)] font-semibold">
                                        New High Score!
                                    </p>
                                )}
                            </div>
                        )}

                        {showPerformance && (
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${performance.bgColor} ${performance.color} font-semibold mb-6`}>
                                <span className="text-lg">⚡</span>
                                {performance.label}
                            </div>
                        )}

                        <button
                            onClick={onRestart}
                            className="w-full py-3 px-6 bg-[var(--accent-green)] text-white rounded-full font-semibold text-base hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Play Again
                        </button>

                        <Link
                            href="/articles"
                            className="inline-block mt-4 text-sm text-[var(--accent-green)] hover:underline"
                        >
                            Continue Learning →
                        </Link>
                    </div>
                </div>
            </aside>

            <main className="order-1 lg:order-2">
                {children}
            </main>
        </div>
    );
}
