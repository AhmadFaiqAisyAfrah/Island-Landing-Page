"use client";

import { useState, useEffect, ReactNode } from "react";
import { Heart, Trophy, RotateCcw } from "lucide-react";
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

export const getRandomGameOverImage = () => {
    return gameOverImages[Math.floor(Math.random() * gameOverImages.length)];
};

export const getRandomGameOverCaption = () => {
    return captions[Math.floor(Math.random() * captions.length)];
};

interface GameOverMemeProps {
    className?: string;
}

export function GameOverMeme({ className = "" }: GameOverMemeProps) {
    const [randomImage, setRandomImage] = useState<string | null>(null);
    const [caption, setCaption] = useState<string | null>(null);

    useEffect(() => {
        setRandomImage(getRandomGameOverImage());
        setCaption(getRandomGameOverCaption());
    }, []);

    return (
        <div className={`mb-6 flex flex-col items-center ${className}`}>
            {randomImage && (
                <img
                    src={randomImage}
                    alt="Game Over Meme"
                    className="w-full h-auto max-h-[300px] object-contain rounded-xl bg-white animate-fadeIn"
                />
            )}
            {caption && (
                <p className="text-center text-sm italic text-gray-400 mt-3">
                    {caption}
                </p>
            )}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

interface GameOverCardProps {
    score: number;
    highScore: number;
    onRestart: () => void;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    iconBgColor?: string;
    customContent?: ReactNode;
}

export default function GameOverCard({
    score,
    highScore,
    onRestart,
    title = "Game Over!",
    subtitle = "Great effort! Keep practicing to improve your score.",
    icon = <Heart className="w-10 h-10 text-red-500" />,
    iconBgColor = "bg-red-500/20",
    customContent
}: GameOverCardProps) {
    const isNewHighScore = score >= highScore && score > 0;

    return (
        <div className="text-center">
            <GameOverMeme />

            <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${iconBgColor} flex items-center justify-center`}>
                {icon}
            </div>

            <h2 className="text-3xl font-bold text-[var(--heading-text)] mb-2">
                {title}
            </h2>

            <p className="text-[var(--paragraph-text)] mb-8">
                {subtitle}
            </p>

            {customContent || (
                <div className="bg-[var(--bg-primary)] rounded-xl p-6 mb-8">
                    <div className="mb-4">
                        <p className="text-sm text-[var(--text-secondary)] mb-1">Your Score</p>
                        <p className="text-5xl font-bold text-[var(--accent-green)]">{score}</p>
                    </div>
                    <div className="pt-4 border-t border-[var(--border-color)]">
                        <p className="text-sm text-[var(--text-secondary)] mb-1">High Score</p>
                        <p className="text-2xl font-bold text-[var(--heading-text)] flex items-center justify-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            {highScore}
                        </p>
                    </div>
                    {isNewHighScore && (
                        <p className="mt-4 text-[var(--accent-green)] font-semibold">
                            New High Score!
                        </p>
                    )}
                </div>
            )}

            <button
                onClick={onRestart}
                className="w-full py-4 px-8 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
                <RotateCcw className="w-5 h-5" />
                Play Again
            </button>

            <Link
                href="/articles"
                className="inline-block mt-4 text-sm text-[var(--accent-green)] hover:underline"
            >
                Continue Learning →
            </Link>
        </div>
    );
}
