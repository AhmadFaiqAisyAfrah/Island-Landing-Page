"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Brain, Trophy, Play, RotateCcw, ChevronLeft, Clock, MousePointer, Star } from "lucide-react";
import AdBanner from "./AdBanner";

type Difficulty = "easy" | "medium" | "hard";
type GameState = "menu" | "playing" | "completed";

const DIFFICULTY_CONFIG = {
    easy: { cols: 4, pairs: 8 },
    medium: { cols: 6, pairs: 12 },
    hard: { cols: 8, pairs: 16 },
};

const CARD_ICONS = [
    "🍎", "🚀", "🧠", "⭐", "⚡", "🎯", "🎨", "🌈",
    "🦋", "🌺", "🍕", "🎸", "📚", "🏆", "💎", "🎁",
    "🌙", "🔥", "💚", "🎭", "🦊", "🐱", "🦁", "🐼",
    "🌻", "🍀", "🌊", "❄️", "🌸", "🍩", "🎂", "🎈",
];

const STORAGE_KEY_BEST = "island-memory-best";

interface Card {
    id: number;
    icon: string;
    isFlipped: boolean;
    isMatched: boolean;
}

interface BestScores {
    easy: number;
    medium: number;
    hard: number;
}

const getBestScores = (): BestScores => {
    if (typeof window === "undefined") return { easy: 0, medium: 0, hard: 0 };
    const stored = localStorage.getItem(STORAGE_KEY_BEST);
    return stored ? JSON.parse(stored) : { easy: 0, medium: 0, hard: 0 };
};

const setBestScore = (difficulty: Difficulty, moves: number) => {
    if (typeof window === "undefined") return;
    const scores = getBestScores();
    const key = difficulty === "easy" ? "easy" : difficulty === "medium" ? "medium" : "hard";
    if (scores[key] === 0 || moves < scores[key]) {
        scores[key] = moves;
        localStorage.setItem(STORAGE_KEY_BEST, JSON.stringify(scores));
    }
};

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const generateCards = (difficulty: Difficulty): Card[] => {
    const { pairs } = DIFFICULTY_CONFIG[difficulty];
    const selectedIcons = shuffleArray(CARD_ICONS).slice(0, pairs);
    const cardPairs = [...selectedIcons, ...selectedIcons];
    const shuffledCards = shuffleArray(cardPairs);
    
    return shuffledCards.map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
    }));
};

export default function MemoryGame() {
    const [gameState, setGameState] = useState<GameState>("menu");
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [bestScores, setBestScores] = useState<BestScores>({ easy: 0, medium: 0, hard: 0 });
    const [isLocked, setIsLocked] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        setBestScores(getBestScores());
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startTimer = useCallback(() => {
        startTimeRef.current = Date.now();
        timerRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            setElapsedTime(elapsed);
        }, 100);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startGame = useCallback((diff: Difficulty) => {
        stopTimer();
        setDifficulty(diff);
        setCards(generateCards(diff));
        setFlippedCards([]);
        setMoves(0);
        setElapsedTime(0);
        setIsLocked(false);
        setMatchedPairs(0);
        setGameState("playing");
        startTimer();
    }, [stopTimer, startTimer]);

    const goToMenu = useCallback(() => {
        stopTimer();
        setGameState("menu");
        setCards([]);
        setFlippedCards([]);
        setMoves(0);
        setElapsedTime(0);
        setMatchedPairs(0);
    }, [stopTimer]);

    const handleCardClick = useCallback((cardId: number) => {
        if (isLocked) return;
        
        const card = cards.find(c => c.id === cardId);
        if (!card || card.isFlipped || card.isMatched) return;
        if (flippedCards.length >= 2) return;
        if (flippedCards.includes(cardId)) return;

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        setCards(prev => prev.map(c => 
            c.id === cardId ? { ...c, isFlipped: true } : c
        ));

        if (newFlippedCards.length === 2) {
            setMoves(prev => prev + 1);
            setIsLocked(true);

            const [firstId, secondId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
                setTimeout(() => {
                    setCards(prev => prev.map(c => 
                        (c.id === firstId || c.id === secondId) 
                            ? { ...c, isMatched: true }
                            : c
                    ));
                    setFlippedCards([]);
                    setIsLocked(false);
                    setMatchedPairs(prev => prev + 1);
                }, 300);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c => 
                        (c.id === firstId || c.id === secondId) 
                            ? { ...c, isFlipped: false }
                            : c
                    ));
                    setFlippedCards([]);
                    setIsLocked(false);
                }, 800);
            }
        }
    }, [cards, flippedCards, isLocked]);

    useEffect(() => {
        const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
        if (matchedPairs === totalPairs && matchedPairs > 0) {
            stopTimer();
            setBestScore(difficulty, moves);
            setBestScores(getBestScores());
            setGameState("completed");
        }
    }, [matchedPairs, difficulty, moves, stopTimer]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const { cols } = DIFFICULTY_CONFIG[difficulty];

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <AdBanner className="mb-6" />

                {gameState === "menu" && (
                    <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 md:p-8 shadow-lg max-w-md mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Brain className="w-8 h-8 text-[var(--accent-green)]" />
                            </div>
                            <h1 className="text-2xl font-bold text-[var(--heading-text)] mb-3">
                                Memory Card Game
                            </h1>
                            <p className="text-[var(--paragraph-text)] mb-6 text-sm">
                                Match all the pairs in as few moves as possible!
                            </p>

                            <div className="mb-6">
                                <p className="text-xs text-[var(--text-secondary)] mb-2 font-medium">Select Difficulty</p>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => setDifficulty("easy")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            difficulty === "easy"
                                                ? "bg-[var(--accent-green)] text-white"
                                                : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                        }`}
                                    >
                                        Easy (4×4)
                                    </button>
                                    <button
                                        onClick={() => setDifficulty("medium")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            difficulty === "medium"
                                                ? "bg-[var(--accent-green)] text-white"
                                                : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                        }`}
                                    >
                                        Medium (6×4)
                                    </button>
                                    <button
                                        onClick={() => setDifficulty("hard")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            difficulty === "hard"
                                                ? "bg-[var(--accent-green)] text-white"
                                                : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                        }`}
                                    >
                                        Hard (8×4)
                                    </button>
                                </div>
                            </div>

                            {bestScores[difficulty] > 0 && (
                                <div className="flex items-center justify-center gap-2 mb-4 text-sm text-[var(--paragraph-text)]">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    <span>Best: <strong className="text-[var(--heading-text)]">{bestScores[difficulty]} moves</strong></span>
                                </div>
                            )}

                            <button
                                onClick={() => startGame(difficulty)}
                                className="w-full max-w-xs mx-auto py-3 px-6 bg-[var(--accent-green)] text-white rounded-full font-semibold text-base hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Start Game
                            </button>
                        </div>
                    </div>
                )}

                {gameState === "playing" && (
                    <div className="flex flex-col items-center">
                        <div className="flex justify-between items-center w-full max-w-md mb-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
                                <span className="text-base font-semibold text-[var(--heading-text)]">
                                    {formatTime(elapsedTime)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MousePointer className="w-4 h-4 text-[var(--text-secondary)]" />
                                <span className="text-base font-semibold text-[var(--heading-text)]">
                                    {moves} moves
                                </span>
                            </div>
                            <button
                                onClick={goToMenu}
                                className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                                title="Back to Menu"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        </div>

                        <div 
                            className="w-full max-w-md"
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                gap: "8px",
                            }}
                        >
                            {cards.map((card) => (
                                <button
                                    key={card.id}
                                    onClick={() => handleCardClick(card.id)}
                                    disabled={isLocked && !flippedCards.includes(card.id)}
                                    className={`aspect-square rounded-xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 ${
                                        card.isFlipped || card.isMatched
                                            ? "bg-[var(--bg-secondary)]"
                                            : "bg-[var(--accent-green)] hover:opacity-90"
                                    } ${card.isMatched ? "ring-2 ring-[var(--accent-green)]" : ""} ${
                                        isLocked && !flippedCards.includes(card.id) && !card.isMatched
                                            ? "pointer-events-none opacity-70"
                                            : ""
                                    }`}
                                >
                                    {card.isFlipped || card.isMatched ? (
                                        <span className="select-none">{card.icon}</span>
                                    ) : (
                                        <Star className="w-5 h-5 text-white/50" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <p className="mt-4 text-xs text-[var(--text-secondary)]">
                            Match all pairs in as few moves as possible
                        </p>
                    </div>
                )}

                {gameState === "completed" && (
                    <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 md:p-8 shadow-lg max-w-md mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-2">
                                Congratulations!
                            </h2>
                            <p className="text-[var(--paragraph-text)] mb-6 text-sm">
                                You matched all the pairs!
                            </p>

                            <AdBanner className="mb-6" />

                            <div className="bg-[var(--bg-primary)] rounded-xl p-4 mb-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-[var(--text-secondary)] mb-1">Time</p>
                                        <p className="text-2xl font-bold text-[var(--accent-green)]">
                                            {formatTime(elapsedTime)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-secondary)] mb-1">Moves</p>
                                        <p className="text-2xl font-bold text-blue-500">
                                            {moves}
                                        </p>
                                    </div>
                                </div>

                                {bestScores[difficulty] === moves && (
                                    <p className="mt-3 text-sm text-[var(--accent-green)] font-semibold">
                                        New Best Score!
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => startGame(difficulty)}
                                    className="w-full py-3 px-6 bg-[var(--accent-green)] text-white rounded-full font-semibold text-base hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Play Again
                                </button>
                                <button
                                    onClick={goToMenu}
                                    className="w-full py-2.5 px-6 bg-[var(--bg-primary)] text-[var(--paragraph-text)] rounded-full font-medium text-sm hover:bg-[var(--border-color)] transition-all flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back to Menu
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
