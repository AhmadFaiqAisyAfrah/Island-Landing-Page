"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Lightbulb, Trophy, Play, RotateCcw, ChevronLeft, Clock, Heart, Target } from "lucide-react";
import AdBanner from "./AdBanner";

type GameMode = "endless" | "timed";
type GameState = "menu" | "playing" | "gameover";

const STORAGE_KEY_BEST = "island-pattern-best";
const TOTAL_TIME = 60;

interface Question {
    sequence: number[];
    answer: number;
    options: number[];
    patternType: string;
}

const generateRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const generateWrongOptions = (correctAnswer: number): number[] => {
    const options: number[] = [];
    const offsets = [-15, -10, -5, -3, -2, -1, 1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 40, 50];
    const shuffledOffsets = shuffleArray(offsets);
    
    for (const offset of shuffledOffsets) {
        const wrong = correctAnswer + offset;
        if (wrong > 0 && wrong !== correctAnswer && !options.includes(wrong)) {
            options.push(wrong);
        }
        if (options.length >= 3) break;
    }
    
    while (options.length < 3) {
        const multiplier = correctAnswer > 10 ? generateRandomInt(2, 5) : generateRandomInt(2, 3);
        const wrong = correctAnswer * multiplier;
        if (wrong !== correctAnswer && !options.includes(wrong)) {
            options.push(wrong);
        }
    }
    
    return options.slice(0, 3);
};

const generateQuestion = (): Question => {
    const patterns = [
        "arithmetic",
        "geometric",
        "alternating_add",
        "alternating_mult",
        "fibonacci",
        "square",
        "mixed_add_mult",
    ];
    
    const patternType = patterns[Math.floor(Math.random() * patterns.length)];
    let sequence: number[] = [];
    let answer: number;
    
    switch (patternType) {
        case "arithmetic": {
            const start = generateRandomInt(1, 10);
            const diff = generateRandomInt(2, 8);
            sequence = [start, start + diff, start + 2 * diff, start + 3 * diff, start + 4 * diff];
            answer = start + 5 * diff;
            break;
        }
        case "geometric": {
            const start = generateRandomInt(1, 5);
            const mult = generateRandomInt(2, 3);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] * mult);
            }
            answer = sequence[4] * mult;
            break;
        }
        case "alternating_add": {
            const a = generateRandomInt(1, 10);
            const b = generateRandomInt(1, 8);
            sequence = [a, a + b, a, a + 2 * b, a];
            answer = a + 2 * b + b;
            break;
        }
        case "alternating_mult": {
            const a = generateRandomInt(1, 5);
            const m = generateRandomInt(2, 3);
            sequence = [a, a * m, a, a * m * m, a];
            answer = a * m * m * m;
            break;
        }
        case "fibonacci": {
            const a = generateRandomInt(1, 5);
            const b = generateRandomInt(1, 5);
            sequence = [a, b];
            for (let i = 2; i < 5; i++) {
                sequence.push(sequence[i - 1] + sequence[i - 2]);
            }
            answer = sequence[4] + sequence[3];
            break;
        }
        case "square": {
            const n = generateRandomInt(1, 5);
            sequence = [n * n, (n + 1) * (n + 1), (n + 2) * (n + 2)];
            sequence.push((n + 3) * (n + 3), (n + 4) * (n + 4));
            answer = (n + 5) * (n + 5);
            break;
        }
        case "mixed_add_mult": {
            const start = generateRandomInt(1, 5);
            sequence = [start, start + 2];
            for (let i = 2; i < 5; i++) {
                const prev = sequence[i - 1];
                if (i % 2 === 0) {
                    sequence.push(prev + generateRandomInt(2, 5));
                } else {
                    sequence.push(prev * 2);
                }
            }
            answer = sequence[4] % 2 === 0 
                ? sequence[4] + generateRandomInt(2, 5)
                : sequence[4] * 2;
            break;
        }
        default:
            sequence = [1, 2, 3, 4, 5];
            answer = 6;
    }
    
    const wrongOptions = generateWrongOptions(answer);
    const allOptions = shuffleArray([answer, ...wrongOptions]);
    
    return { sequence, answer, options: allOptions, patternType };
};

const getBestScore = (): number => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(STORAGE_KEY_BEST);
    return stored ? parseInt(stored, 10) : 0;
};

const setBestScore = (score: number) => {
    if (typeof window === "undefined") return;
    const current = getBestScore();
    if (score > current) {
        localStorage.setItem(STORAGE_KEY_BEST, score.toString());
    }
};

export default function PatternGame() {
    const [gameState, setGameState] = useState<GameState>("menu");
    const [gameMode, setGameMode] = useState<GameMode>("endless");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [bestScore, setBestScoreState] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [question, setQuestion] = useState<Question | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isLocked, setIsLocked] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setBestScoreState(getBestScore());
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
        };
    }, []);

    const startTimer = useCallback(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    setGameState("gameover");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const goToMenu = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (feedbackTimeoutRef.current) {
            clearTimeout(feedbackTimeoutRef.current);
        }
        setScore(0);
        setLives(3);
        setTimeLeft(TOTAL_TIME);
        setQuestion(null);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setIsLocked(false);
        setGameState("menu");
    }, []);

    const startGame = useCallback((mode: GameMode) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (feedbackTimeoutRef.current) {
            clearTimeout(feedbackTimeoutRef.current);
        }
        
        setGameMode(mode);
        setScore(0);
        setLives(3);
        setTimeLeft(TOTAL_TIME);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setIsLocked(false);
        setQuestion(generateQuestion());
        setGameState("playing");
        
        if (mode === "timed") {
            startTimer();
        }
    }, [startTimer]);

    const handleAnswer = useCallback((answer: number) => {
        if (isLocked || !question) return;
        
        setIsLocked(true);
        setSelectedAnswer(answer);
        
        const correct = answer === question.answer;
        setIsCorrect(correct);
        
        if (correct) {
            setScore((prev) => prev + 1);
            
            feedbackTimeoutRef.current = setTimeout(() => {
                setQuestion(generateQuestion());
                setSelectedAnswer(null);
                setIsCorrect(null);
                setIsLocked(false);
            }, 800);
        } else {
            if (gameMode === "endless") {
                setLives((prev) => {
                    const newLives = prev - 1;
                    if (newLives <= 0) {
                        feedbackTimeoutRef.current = setTimeout(() => {
                            setGameState("gameover");
                        }, 1000);
                    } else {
                        feedbackTimeoutRef.current = setTimeout(() => {
                            setQuestion(generateQuestion());
                            setSelectedAnswer(null);
                            setIsCorrect(null);
                            setIsLocked(false);
                        }, 1500);
                    }
                    return newLives;
                });
            } else {
                feedbackTimeoutRef.current = setTimeout(() => {
                    setQuestion(generateQuestion());
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                    setIsLocked(false);
                }, 1500);
            }
        }
    }, [isLocked, question, gameMode]);

    useEffect(() => {
        if (gameState === "gameover") {
            setBestScore(score);
            setBestScoreState(getBestScore());
        }
    }, [gameState, score]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] py-8 px-4">
            <div className="max-w-lg mx-auto">
                <AdBanner className="mb-6" />

                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-lg">
                    {gameState === "menu" && (
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Lightbulb className="w-8 h-8 text-[var(--accent-green)]" />
                            </div>
                            <h1 className="text-2xl font-bold text-[var(--heading-text)] mb-3">
                                Number Pattern Test
                            </h1>
                            <p className="text-[var(--paragraph-text)] mb-6 text-sm">
                                Find the next number in the sequence. Challenge your logic and IQ!
                            </p>

                            <div className="mb-6">
                                <p className="text-xs text-[var(--text-secondary)] mb-2 font-medium">Select Mode</p>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => setGameMode("endless")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            gameMode === "endless"
                                                ? "bg-[var(--accent-green)] text-white"
                                                : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                        }`}
                                    >
                                        Endless (3 Lives)
                                    </button>
                                    <button
                                        onClick={() => setGameMode("timed")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            gameMode === "timed"
                                                ? "bg-[var(--accent-green)] text-white"
                                                : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                        }`}
                                    >
                                        Timed (60s)
                                    </button>
                                </div>
                            </div>

                            {bestScore > 0 && (
                                <div className="flex items-center justify-center gap-2 mb-4 text-sm text-[var(--paragraph-text)]">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    <span>Best: <strong className="text-[var(--heading-text)]">{bestScore}</strong></span>
                                </div>
                            )}

                            <button
                                onClick={() => startGame(gameMode)}
                                className="w-full max-w-xs mx-auto py-3 px-6 bg-[var(--accent-green)] text-white rounded-full font-semibold text-base hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Start Game
                            </button>
                        </div>
                    )}

                    {gameState === "playing" && question && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-[var(--text-secondary)]" />
                                    <span className="text-base font-semibold text-[var(--heading-text)]">
                                        {score}
                                    </span>
                                </div>
                                {gameMode === "endless" && (
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <Heart
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < lives ? "text-red-500 fill-red-500" : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                                {gameMode === "timed" && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
                                        <span className={`text-base font-semibold ${timeLeft <= 10 ? "text-red-500" : "text-[var(--heading-text)]"}`}>
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>
                                )}
                                <button
                                    onClick={goToMenu}
                                    className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                                    title="Back to Menu"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            </div>

                            <div className={`mb-6 p-4 rounded-xl text-center transition-all ${
                                isCorrect === true ? "bg-green-500/20" :
                                isCorrect === false ? "bg-red-500/20" :
                                "bg-[var(--bg-primary)]"
                            }`}>
                                <p className="text-2xl md:text-3xl font-mono font-bold text-[var(--heading-text)] tracking-wider">
                                    {question.sequence.join(", ")}, ?
                                </p>
                            </div>

                            {isCorrect === false && selectedAnswer !== null && (
                                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
                                    <p className="text-sm text-red-500">
                                        The correct answer was: <strong>{question.answer}</strong>
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        disabled={isLocked}
                                        className={`py-4 px-6 rounded-xl font-mono font-bold text-xl transition-all ${
                                            isLocked && option === question.answer
                                                ? "bg-[var(--accent-green)] text-white ring-2 ring-[var(--accent-green)]"
                                                : selectedAnswer === option
                                                    ? isCorrect
                                                        ? "bg-green-500 text-white"
                                                        : "bg-red-500 text-white"
                                                    : "bg-[var(--bg-primary)] text-[var(--heading-text)] hover:bg-[var(--border-color)]"
                                        } ${isLocked && selectedAnswer !== option && option !== question.answer ? "opacity-50" : ""}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {gameState === "gameover" && (
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-2">
                                {gameMode === "endless" ? "Game Over!" : "Time's Up!"}
                            </h2>
                            <p className="text-[var(--paragraph-text)] mb-6 text-sm">
                                {gameMode === "endless" 
                                    ? "You ran out of lives!" 
                                    : "Great effort! Here's how you did:"}
                            </p>

                            <AdBanner className="mb-6" />

                            <div className="bg-[var(--bg-primary)] rounded-xl p-4 mb-6">
                                <p className="text-sm text-[var(--text-secondary)] mb-1">Final Score</p>
                                <p className="text-4xl font-bold text-[var(--accent-green)]">{score}</p>
                                {score >= bestScore && score > 0 && (
                                    <p className="mt-2 text-sm text-[var(--accent-green)] font-semibold">
                                        New Best Score!
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => startGame(gameMode)}
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
                    )}
                </div>
            </div>
        </div>
    );
}
