"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Trophy, Play, RotateCcw, ChevronLeft, Target, Keyboard } from "lucide-react";
import AdBanner from "./AdBanner";

type GameState = "idle" | "waiting" | "ready" | "clicked" | "result" | "tooSoon";

const STORAGE_KEY_BEST = "island-reaction-best";
const TOTAL_ROUNDS = 5;

const getBestScore = (): number => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(STORAGE_KEY_BEST);
    return stored ? parseInt(stored, 10) : 0;
};

const setBestScore = (score: number) => {
    if (typeof window === "undefined") return;
    const current = getBestScore();
    if (score === 0 || score < current || current === 0) {
        localStorage.setItem(STORAGE_KEY_BEST, score.toString());
    }
};

const getPerformanceLabel = (ms: number): { label: string; color: string } => {
    if (ms < 200) return { label: "Excellent", color: "text-[var(--accent-green)]" };
    if (ms < 300) return { label: "Good", color: "text-blue-500" };
    if (ms < 400) return { label: "Average", color: "text-yellow-500" };
    return { label: "Slow", color: "text-red-500" };
};

export default function ReactionGame() {
    const [gameState, setGameState] = useState<GameState>("idle");
    const [bestScore, setBestScoreState] = useState(0);
    const [reactionTime, setReactionTime] = useState(0);
    const [round, setRound] = useState(0);
    const [roundResults, setRoundResults] = useState<number[]>([]);
    const [isMultiRound, setIsMultiRound] = useState(false);
    const [keyPressed, setKeyPressed] = useState(false);

    const waitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const isProcessingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setBestScoreState(getBestScore());
    }, []);

    useEffect(() => {
        return () => {
            if (waitTimeoutRef.current) {
                clearTimeout(waitTimeoutRef.current);
            }
        };
    }, []);

    const goToMenu = useCallback(() => {
        if (waitTimeoutRef.current) {
            clearTimeout(waitTimeoutRef.current);
        }
        isProcessingRef.current = false;
        setGameState("idle");
        setRound(0);
        setRoundResults([]);
        setReactionTime(0);
        setIsMultiRound(false);
    }, []);

    const startSingleRound = useCallback(() => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        
        setGameState("waiting");
        setReactionTime(0);

        const delay = 2000 + Math.random() * 3000;

        waitTimeoutRef.current = setTimeout(() => {
            startTimeRef.current = performance.now();
            isProcessingRef.current = false;
            setGameState("ready");
        }, delay);
    }, []);

    const startMultiRound = useCallback(() => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        
        setIsMultiRound(true);
        setRound(1);
        setRoundResults([]);
        setGameState("waiting");

        const delay = 2000 + Math.random() * 3000;

        waitTimeoutRef.current = setTimeout(() => {
            startTimeRef.current = performance.now();
            isProcessingRef.current = false;
            setGameState("ready");
        }, delay);
    }, []);

    const handleTooSoon = useCallback(() => {
        if (waitTimeoutRef.current) {
            clearTimeout(waitTimeoutRef.current);
        }
        isProcessingRef.current = false;
        setGameState("tooSoon");
    }, []);

    const handleCorrectClick = useCallback(() => {
        const endTime = performance.now();
        const time = Math.round(endTime - startTimeRef.current);
        setReactionTime(time);
        isProcessingRef.current = true;
        setGameState("clicked");
    }, []);

    const continueMultiRound = useCallback(() => {
        const newResults = [...roundResults, reactionTime];
        setRoundResults(newResults);

        if (round >= TOTAL_ROUNDS) {
            const total = newResults.reduce((a, b) => a + b, 0);
            const avg = Math.round(total / newResults.length);
            const best = Math.min(...newResults);
            setBestScore(best);
            setBestScoreState(best);
            setReactionTime(avg);
            setIsMultiRound(false);
            isProcessingRef.current = false;
            setGameState("result");
        } else {
            setRound(round + 1);
            setGameState("waiting");
            setReactionTime(0);

            const delay = 2000 + Math.random() * 3000;

            waitTimeoutRef.current = setTimeout(() => {
                startTimeRef.current = performance.now();
                isProcessingRef.current = false;
                setGameState("ready");
            }, delay);
        }
    }, [round, roundResults, reactionTime]);

    const showResult = useCallback(() => {
        const newBest = getBestScore();
        if (reactionTime > 0 && (newBest === 0 || reactionTime < newBest)) {
            setBestScore(reactionTime);
            setBestScoreState(reactionTime);
        }

        if (isMultiRound && round < TOTAL_ROUNDS) {
            continueMultiRound();
        } else {
            isProcessingRef.current = false;
            setGameState("result");
        }
    }, [reactionTime, isMultiRound, round, continueMultiRound]);

    const tryAgain = useCallback(() => {
        if (waitTimeoutRef.current) {
            clearTimeout(waitTimeoutRef.current);
        }
        isProcessingRef.current = false;
        if (isMultiRound) {
            setRound(1);
            setRoundResults([]);
            startMultiRound();
        } else {
            startSingleRound();
        }
    }, [isMultiRound, startSingleRound, startMultiRound]);

    const handleUserAction = useCallback(() => {
        if (isProcessingRef.current) return;

        switch (gameState) {
            case "idle":
                startSingleRound();
                break;
            case "waiting":
                handleTooSoon();
                break;
            case "ready":
                handleCorrectClick();
                break;
            case "tooSoon":
                tryAgain();
                break;
            case "result":
                tryAgain();
                break;
        }
    }, [gameState, startSingleRound, handleTooSoon, handleCorrectClick, tryAgain]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.code === "Enter" || e.code === "Space" || e.code === "Escape") {
            e.preventDefault();
            
            if (e.code === "Escape") {
                if (gameState === "result" || gameState === "tooSoon" || gameState === "idle") {
                    goToMenu();
                }
                return;
            }

            setKeyPressed(true);
            handleUserAction();
        }
    }, [gameState, handleUserAction, goToMenu]);

    const handleKeyUp = useCallback(() => {
        setKeyPressed(false);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.focus();
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    useEffect(() => {
        if (gameState === "clicked") {
            const timer = setTimeout(showResult, 300);
            return () => clearTimeout(timer);
        }
    }, [gameState, showResult]);

    const perf = getPerformanceLabel(reactionTime);
    const avgTime = roundResults.length > 0 ? Math.round(roundResults.reduce((a, b) => a + b, 0) / roundResults.length) : 0;
    const bestTime = roundResults.length > 0 ? Math.min(...roundResults) : 0;

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            className={`min-h-screen flex flex-col outline-none transition-colors duration-150 ${
                gameState === "waiting" || gameState === "tooSoon" ? "bg-red-500" :
                gameState === "ready" ? "bg-green-500" :
                "bg-[var(--bg-primary)]"
            } ${keyPressed ? "scale-[0.99]" : ""}`}
            onClick={handleUserAction}
        >
            <AdBanner className="absolute top-4 left-4 right-4 z-10" />

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    {gameState === "idle" && (
                        <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Zap className="w-10 h-10 text-[var(--accent-green)]" />
                            </div>
                            <h1 className="text-3xl font-bold text-[var(--heading-text)] mb-4">
                                Reaction Speed Test
                            </h1>
                            <p className="text-[var(--paragraph-text)] mb-6">
                                Test how fast your reflexes are! Click or press a key when the screen turns green.
                            </p>

                            {bestScore > 0 && (
                                <div className="flex items-center justify-center gap-2 mb-6 text-[var(--paragraph-text)]">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <span>Your Best: <strong className="text-[var(--heading-text)]">{bestScore} ms</strong></span>
                                </div>
                            )}

                            <div className="space-y-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); startSingleRound(); }}
                                    className="w-full py-4 px-8 bg-[var(--accent-green)] text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    Quick Test
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); startMultiRound(); }}
                                    className="w-full py-4 px-8 bg-blue-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <Target className="w-5 h-5" />
                                    Multi-Round (5 Rounds)
                                </button>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                                <Keyboard className="w-4 h-4" />
                                <span>Press Enter or Space to start</span>
                            </div>
                        </div>
                    )}

                    {(gameState === "waiting" || gameState === "ready" || gameState === "tooSoon") && (
                        <div className="text-center text-white">
                            {gameState === "waiting" && (
                                <>
                                    <div className="text-2xl font-bold mb-4">
                                        {isMultiRound ? `Round ${round} of ${TOTAL_ROUNDS}` : ""}
                                    </div>
                                    <div className="text-4xl md:text-5xl font-bold animate-pulse mb-4">
                                        Wait...
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-lg opacity-80">
                                        <Keyboard className="w-5 h-5" />
                                        <span>Press Enter or Space if you click early</span>
                                    </div>
                                </>
                            )}
                            {gameState === "ready" && (
                                <>
                                    <div className="text-5xl md:text-7xl font-bold mb-4">
                                        CLICK NOW!
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-lg opacity-80">
                                        <Keyboard className="w-5 h-5" />
                                        <span>Press Enter or Space!</span>
                                    </div>
                                </>
                            )}
                            {gameState === "tooSoon" && (
                                <div className="text-center">
                                    <div className="text-5xl md:text-7xl font-bold mb-4">
                                        Too Soon!
                                    </div>
                                    <p className="text-xl mb-6 opacity-80">
                                        Click when the screen turns green
                                    </p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); tryAgain(); }}
                                        className="px-8 py-4 bg-white text-red-500 rounded-full font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 mx-auto"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Try Again
                                    </button>
                                    <p className="mt-4 text-sm opacity-80">
                                        or press Enter
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {gameState === "clicked" && (
                        <div className="text-center text-white">
                            <div className="text-8xl font-bold mb-4">
                                {reactionTime}
                            </div>
                            <div className="text-2xl">
                                milliseconds
                            </div>
                        </div>
                    )}

                    {gameState === "result" && (
                        <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-lg text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Trophy className="w-10 h-10 text-yellow-500" />
                            </div>
                            
                            {isMultiRound || roundResults.length > 0 ? (
                                <>
                                    <h2 className="text-3xl font-bold text-[var(--heading-text)] mb-6">
                                        Multi-Round Complete!
                                    </h2>
                                    <div className="space-y-4 mb-8">
                                        <div className="bg-[var(--bg-primary)] rounded-xl p-4">
                                            <p className="text-sm text-[var(--text-secondary)] mb-1">Average Time</p>
                                            <p className="text-4xl font-bold text-[var(--accent-green)]">{avgTime} ms</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1 bg-[var(--bg-primary)] rounded-xl p-4">
                                                <p className="text-sm text-[var(--text-secondary)] mb-1">Best Time</p>
                                                <p className="text-2xl font-bold text-blue-500">{bestTime} ms</p>
                                            </div>
                                            <div className="flex-1 bg-[var(--bg-primary)] rounded-xl p-4">
                                                <p className="text-sm text-[var(--text-secondary)] mb-1">Rounds</p>
                                                <p className="text-2xl font-bold text-[var(--heading-text)]">{roundResults.length}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-2 flex-wrap">
                                            {roundResults.map((time, i) => (
                                                <span key={i} className="px-3 py-1 bg-[var(--bg-primary)] rounded-full text-sm">
                                                    Round {i + 1}: {time}ms
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-bold text-[var(--heading-text)] mb-2">
                                        Your Result
                                    </h2>
                                    <div className="text-7xl font-bold text-[var(--accent-green)] mb-2">
                                        {reactionTime} ms
                                    </div>
                                    <p className={`text-2xl font-semibold mb-6 ${perf.color}`}>
                                        {perf.label}
                                    </p>

                                    <AdBanner className="mb-8" />

                                    {bestScore > 0 && reactionTime <= bestScore && (
                                        <p className="text-[var(--accent-green)] font-semibold mb-6">
                                            New Personal Best!
                                        </p>
                                    )}
                                </>
                            )}

                            <div className="space-y-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); tryAgain(); }}
                                    className="w-full py-4 px-8 bg-[var(--accent-green)] text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Try Again
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); goToMenu(); }}
                                    className="w-full py-3 px-8 bg-[var(--bg-primary)] text-[var(--paragraph-text)] rounded-full font-medium hover:bg-[var(--border-color)] transition-all flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Back to Menu
                                </button>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                                <Keyboard className="w-4 h-4" />
                                <span>Press Enter to try again · Esc for menu</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
