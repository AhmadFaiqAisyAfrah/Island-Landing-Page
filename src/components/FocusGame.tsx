"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Target, Trophy, Play, RotateCcw, ChevronLeft, Clock, Heart, Eye } from "lucide-react";
import AdBanner from "./AdBanner";

type GameMode = "timed" | "lives";
type GameState = "menu" | "playing" | "gameover";
type ObjectType = "target" | "distraction";

interface GameObject {
    id: number;
    type: ObjectType;
    x: number;
    y: number;
    size: number;
    color: string;
    shape: "circle" | "square" | "triangle";
    lifetime: number;
    createdAt: number;
}

const STORAGE_KEY_BEST = "island-focus-best";
const TOTAL_TIME = 60;
const SPAWN_INTERVAL_BASE = 800;
const OBJECT_LIFETIME = 2000;

const TARGET_COLOR = "#22c55e";
const DISTRACTION_COLORS = ["#ef4444", "#f59e0b", "#8b5cf6", "#3b82f6", "#ec4899"];
const SHAPES: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];

interface BestScores {
    timed: number;
    lives: number;
}

const getBestScores = (): BestScores => {
    if (typeof window === "undefined") return { timed: 0, lives: 0 };
    const stored = localStorage.getItem(STORAGE_KEY_BEST);
    return stored ? JSON.parse(stored) : { timed: 0, lives: 0 };
};

const setBestScore = (mode: GameMode, score: number) => {
    if (typeof window === "undefined") return;
    const scores = getBestScores();
    const key = mode === "timed" ? "timed" : "lives";
    if (score > scores[key]) {
        scores[key] = score;
        localStorage.setItem(STORAGE_KEY_BEST, JSON.stringify(scores));
    }
};

const generateDistraction = (id: number): GameObject => {
    const color = DISTRACTION_COLORS[Math.floor(Math.random() * DISTRACTION_COLORS.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
        id,
        type: "distraction",
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: 40 + Math.random() * 30,
        color,
        shape,
        lifetime: OBJECT_LIFETIME,
        createdAt: Date.now(),
    };
};

const generateTarget = (id: number): GameObject => {
    return {
        id,
        type: "target",
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: 50 + Math.random() * 20,
        color: TARGET_COLOR,
        shape: "circle",
        lifetime: OBJECT_LIFETIME + 500,
        createdAt: Date.now(),
    };
};

const spawnObject = (id: number, difficulty: number): GameObject => {
    const targetChance = Math.max(0.2, 0.35 - difficulty * 0.02);
    if (Math.random() < targetChance) {
        return generateTarget(id);
    }
    return generateDistraction(id);
};

export default function FocusGame() {
    const [gameState, setGameState] = useState<GameState>("menu");
    const [gameMode, setGameMode] = useState<GameMode>("timed");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [bestScores, setBestScoresState] = useState<BestScores>({ timed: 0, lives: 0 });
    const [objects, setObjects] = useState<GameObject[]>([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [correctClicks, setCorrectClicks] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
    const [difficulty, setDifficulty] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const spawnRef = useRef<NodeJS.Timeout | null>(null);
    const objectIdRef = useRef(0);
    const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const cleanupRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setBestScoresState(getBestScores());
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (spawnRef.current) clearInterval(spawnRef.current);
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
            if (cleanupRef.current) clearInterval(cleanupRef.current);
        };
    }, []);

    const cleanupObjects = useCallback(() => {
        const now = Date.now();
        setObjects((prev) => prev.filter((obj) => now - obj.createdAt < obj.lifetime));
    }, []);

    const startSpawning = useCallback(() => {
        const spawnInterval = Math.max(300, SPAWN_INTERVAL_BASE - difficulty * 50);

        spawnRef.current = setInterval(() => {
            const newObject = spawnObject(objectIdRef.current++, difficulty);
            setObjects((prev) => [...prev, newObject]);

            setDifficulty((prev) => Math.min(prev + 1, 20));
        }, spawnInterval);
    }, [difficulty]);

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
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        if (spawnRef.current) { clearInterval(spawnRef.current); spawnRef.current = null; }
        if (feedbackTimeoutRef.current) { clearTimeout(feedbackTimeoutRef.current); }
        if (cleanupRef.current) { clearInterval(cleanupRef.current); }
        setScore(0);
        setLives(3);
        setTimeLeft(TOTAL_TIME);
        setObjects([]);
        setTotalClicks(0);
        setCorrectClicks(0);
        setFeedback(null);
        setDifficulty(0);
        setGameState("menu");
    }, []);

    const startGame = useCallback((mode: GameMode) => {
        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
        if (spawnRef.current) { clearInterval(spawnRef.current); spawnRef.current = null; }
        if (feedbackTimeoutRef.current) { clearTimeout(feedbackTimeoutRef.current); }
        if (cleanupRef.current) { clearInterval(cleanupRef.current); }

        objectIdRef.current = 0;
        setGameMode(mode);
        setScore(0);
        setLives(3);
        setTimeLeft(mode === "timed" ? TOTAL_TIME : 999);
        setObjects([]);
        setTotalClicks(0);
        setCorrectClicks(0);
        setFeedback(null);
        setDifficulty(0);
        setGameState("playing");

        startSpawning();

        cleanupRef.current = setInterval(cleanupObjects, 100);

        if (mode === "timed") {
            startTimer();
        }
    }, [startSpawning, startTimer, cleanupObjects]);

    const handleObjectClick = useCallback((obj: GameObject) => {
        if (gameState !== "playing") return;

        setTotalClicks((prev) => prev + 1);

        if (obj.type === "target") {
            setCorrectClicks((prev) => prev + 1);
            setScore((prev) => prev + 1);
            setFeedback("correct");

            setObjects((prev) => prev.filter((o) => o.id !== obj.id));
        } else {
            setFeedback("wrong");

            if (gameMode === "lives") {
                setLives((prev) => {
                    const newLives = prev - 1;
                    if (newLives <= 0) {
                        setTimeout(() => setGameState("gameover"), 300);
                    }
                    return newLives;
                });
            } else {
                setScore((prev) => Math.max(0, prev - 1));
            }
        }

        if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = setTimeout(() => setFeedback(null), 300);
    }, [gameState, gameMode]);

    useEffect(() => {
        if (gameState === "gameover") {
            setBestScore(gameMode, score);
            setBestScoresState(getBestScores());
        }
    }, [gameState, gameMode, score]);

    useEffect(() => {
        if (gameState === "playing") {
            const spawnInterval = Math.max(300, SPAWN_INTERVAL_BASE - difficulty * 50);
            if (spawnRef.current) {
                clearInterval(spawnRef.current);
                spawnRef.current = setInterval(() => {
                    const newObject = spawnObject(objectIdRef.current++, difficulty);
                    setObjects((prev) => [...prev, newObject]);
                }, spawnInterval);
            }
        }
    }, [difficulty, gameState]);

    const formatTime = (seconds: number): string => {
        if (seconds >= 999) return "∞";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const accuracy = totalClicks > 0 ? Math.round((correctClicks / totalClicks) * 100) : 0;

    return (
        <div className="bg-[var(--bg-primary)] py-4 px-4">
            <div className="max-w-2xl mx-auto">
                {/* <AdBanner className="mb-6" /> */}

                <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-lg overflow-hidden">
                    {gameState === "menu" && (
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Eye className="w-8 h-8 text-[var(--accent-green)]" />
                            </div>
                            <h1 className="text-2xl font-bold text-[var(--heading-text)] mb-3">
                                Focus Test
                            </h1>
                            <p className="text-[var(--paragraph-text)] mb-6 text-sm">
                                Click only the green circles. Avoid all other shapes!
                            </p>

                            <div className="mb-6">
                                <p className="text-xs text-[var(--text-secondary)] mb-2 font-medium">Select Mode</p>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => setGameMode("timed")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            gameMode === "timed"
                                                ? "bg-[var(--accent-green)] text-white"
                                                : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                        }`}
                                    >
                                        <Clock className="w-4 h-4 inline mr-1" />
                                        Timed (60s)
                                    </button>
                                    <button
                                        onClick={() => setGameMode("lives")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            gameMode === "lives"
                                                ? "bg-[var(--accent-green)] text-white"
                                                : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                        }`}
                                    >
                                        <Heart className="w-4 h-4 inline mr-1" />
                                        Lives (3 ❤️)
                                    </button>
                                </div>
                            </div>

                            {bestScores[gameMode] > 0 && (
                                <div className="flex items-center justify-center gap-2 mb-4 text-sm text-[var(--paragraph-text)]">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    <span>Best: <strong className="text-[var(--heading-text)]">{bestScores[gameMode]}</strong></span>
                                </div>
                            )}

                            <button
                                onClick={() => startGame(gameMode)}
                                className="w-full max-w-xs mx-auto py-3 px-6 bg-[var(--accent-green)] text-white rounded-full font-semibold text-base hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <Play className="w-4 h-4" />
                                Start Game
                            </button>

                            <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-xl text-left">
                                <h3 className="font-semibold text-[var(--heading-text)] mb-2 text-sm">How to Play:</h3>
                                <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                                    <li className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-green-500" />
                                        <span>Click green circles to score</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-red-500" />
                                        <span>Avoid red shapes (lose points/lives)</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-yellow-500" />
                                        <span>Ignore other shapes and colors</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {gameState === "playing" && (
                        <div>
                            <div className="flex justify-between items-center p-4 bg-[var(--bg-primary)]/50 border-b border-[var(--border-color)]">
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-[var(--text-secondary)]" />
                                    <span className="text-lg font-bold text-[var(--heading-text)]">{score}</span>
                                </div>

                                {gameMode === "timed" ? (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
                                        <span className={`text-lg font-bold ${timeLeft <= 10 ? "text-red-500" : "text-[var(--heading-text)]"}`}>
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <Heart
                                                key={i}
                                                className={`w-5 h-5 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                )}

                                <button
                                    onClick={goToMenu}
                                    className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            </div>

                            <div
                                className={`relative h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden ${
                                    feedback === "correct" ? "ring-4 ring-green-500" :
                                    feedback === "wrong" ? "ring-4 ring-red-500" : ""
                                }`}
                                style={{ cursor: "crosshair" }}
                            >
                                {objects.map((obj) => (
                                    <button
                                        key={obj.id}
                                        onClick={() => handleObjectClick(obj)}
                                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity hover:scale-110 ${
                                            obj.type === "target" ? "animate-pulse" : ""
                                        }`}
                                        style={{
                                            left: `${obj.x}%`,
                                            top: `${obj.y}%`,
                                            width: obj.size,
                                            height: obj.size,
                                        }}
                                    >
                                        {obj.shape === "circle" && (
                                            <div
                                                className="w-full h-full rounded-full shadow-lg"
                                                style={{ backgroundColor: obj.color }}
                                            />
                                        )}
                                        {obj.shape === "square" && (
                                            <div
                                                className="w-full h-full rounded-lg shadow-lg"
                                                style={{ backgroundColor: obj.color }}
                                            />
                                        )}
                                        {obj.shape === "triangle" && (
                                            <div
                                                className="w-0 h-0"
                                                style={{
                                                    borderLeft: `${obj.size / 2}px solid transparent`,
                                                    borderRight: `${obj.size / 2}px solid transparent`,
                                                    borderBottom: `${obj.size}px solid ${obj.color}`,
                                                }}
                                            />
                                        )}
                                    </button>
                                ))}

                                {objects.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-white/50 text-sm">Get ready...</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 bg-[var(--bg-primary)]/50 border-t border-[var(--border-color)] text-center">
                                <p className="text-xs text-[var(--text-secondary)]">
                                    Click only <span className="text-green-500 font-semibold">green circles</span> — avoid other shapes!
                                </p>
                            </div>
                        </div>
                    )}

                    {gameState === "gameover" && (
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-2">
                                {gameMode === "lives" ? "Game Over!" : "Time's Up!"}
                            </h2>
                            <p className="text-[var(--paragraph-text)] mb-6 text-sm">
                                {gameMode === "lives" ? "You ran out of lives!" : "Great focus! Here's your result:"}
                            </p>

                            {/* <AdBanner className="mb-6" /> */}

                            <div className="bg-[var(--bg-primary)] rounded-xl p-4 mb-6">
                                <p className="text-sm text-[var(--text-secondary)] mb-1">Final Score</p>
                                <p className="text-4xl font-bold text-[var(--accent-green)]">{score}</p>
                                {accuracy > 0 && (
                                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                                        Accuracy: <strong className="text-[var(--heading-text)]">{accuracy}%</strong>
                                    </p>
                                )}
                                {score >= bestScores[gameMode] && score > 0 && (
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
