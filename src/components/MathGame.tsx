"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Calculator, Heart, Zap, Trophy, Play } from "lucide-react";
import GameResultLayout from "./GameResultLayout";

type Operation = "+" | "-" | "×" | "÷";

interface Question {
    num1: number;
    num2: number;
    operation: Operation;
    answer: number;
    answerLength: number;
}

type GameState = "start" | "playing" | "gameover";

const STORAGE_KEY = "island-math-highscore";

const getHighScore = (): number => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
};

const setHighScore = (score: number) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, score.toString());
};

const getMaxNumber = (score: number): number => {
    if (score < 5) return 10;
    if (score < 10) return 20;
    if (score < 20) return 50;
    if (score < 30) return 100;
    if (score < 50) return 250;
    if (score < 75) return 500;
    return 1000;
};

const getTimeLimit = (score: number): number => {
    if (score < 10) return 5;
    if (score < 25) return 4.5;
    if (score < 50) return 4;
    return 3;
};

const generateQuestion = (score: number, prevQuestion?: Question): Question => {
    const operations: Operation[] = ["+", "-", "×", "÷"];
    const maxNum = getMaxNumber(score);
    const minNum = 1;

    let question: Question;
    let attempts = 0;

    do {
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1 = Math.floor(Math.random() * maxNum) + minNum;
        let num2 = Math.floor(Math.random() * maxNum) + minNum;
        let answer: number;

        switch (operation) {
            case "+":
                answer = num1 + num2;
                break;
            case "-":
                if (num1 < num2) [num1, num2] = [num2, num1];
                answer = num1 - num2;
                break;
            case "×":
                num1 = Math.floor(Math.random() * Math.min(20, maxNum / 10)) + 1;
                num2 = Math.floor(Math.random() * Math.min(20, maxNum / 10)) + 1;
                answer = num1 * num2;
                break;
            case "÷":
                num2 = Math.floor(Math.random() * 12) + 1;
                answer = Math.floor(Math.random() * 12) + 1;
                num1 = num2 * answer;
                break;
        }

        question = { num1, num2, operation, answer, answerLength: answer.toString().length };
        attempts++;
    } while (
        attempts < 10 &&
        prevQuestion &&
        question.num1 === prevQuestion.num1 &&
        question.num2 === prevQuestion.num2 &&
        question.operation === prevQuestion.operation
    );

    return question;
};

export default function MathGame() {
    const [gameState, setGameState] = useState<GameState>("start");
    const [score, setScore] = useState(0);
    const [highScore, setHighScoreState] = useState(0);
    const [lives, setLives] = useState(3);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [timeLeft, setTimeLeft] = useState(5);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const timeBarRef = useRef<HTMLDivElement>(null);
    const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setHighScoreState(getHighScore());
    }, []);

    useEffect(() => {
        return () => {
            if (feedbackTimeoutRef.current) {
                clearTimeout(feedbackTimeoutRef.current);
            }
        };
    }, []);

    const startGame = useCallback(() => {
        setScore(0);
        setLives(3);
        setUserAnswer("");
        setFeedback(null);
        setIsTransitioning(false);
        setGameState("playing");
        setCurrentQuestion(generateQuestion(0));
    }, []);

    const goToNextQuestion = useCallback((newScore: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentQuestion(generateQuestion(newScore));
            setUserAnswer("");
            setFeedback(null);
            setIsTransitioning(false);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 300);
    }, []);

    const handleCorrectAnswer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const newScore = score + 1;
        setScore(newScore);
        setFeedback("correct");

        if (newScore > highScore) {
            setHighScore(newScore);
            setHighScoreState(newScore);
        }

        goToNextQuestion(newScore);
    }, [score, highScore, goToNextQuestion]);

    const handleWrongAnswer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setFeedback("wrong");
        setLives((prevLives) => {
            const newLives = prevLives - 1;

            feedbackTimeoutRef.current = setTimeout(() => {
                if (newLives <= 0) {
                    setGameState("gameover");
                    if (score > highScore) {
                        setHighScore(score);
                        setHighScoreState(score);
                    }
                } else {
                    setCurrentQuestion((q) => generateQuestion(score, q || undefined));
                    setUserAnswer("");
                    setFeedback(null);
                    setIsTransitioning(false);
                }
            }, 500);

            return newLives;
        });
    }, [score, highScore]);

    const handleTimeout = useCallback(() => {
        if (isTransitioning) return;

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setFeedback("timeout");
        setLives((prevLives) => {
            const newLives = prevLives - 1;

            feedbackTimeoutRef.current = setTimeout(() => {
                if (newLives <= 0) {
                    setGameState("gameover");
                    if (score > highScore) {
                        setHighScore(score);
                        setHighScoreState(score);
                    }
                } else {
                    setCurrentQuestion((q) => generateQuestion(score, q || undefined));
                    setUserAnswer("");
                    setFeedback(null);
                    setIsTransitioning(false);
                }
            }, 500);

            return newLives;
        });
    }, [isTransitioning, score, highScore]);

    const validateAnswer = useCallback(() => {
        if (isTransitioning || !currentQuestion || userAnswer === "") return;

        const numericAnswer = parseInt(userAnswer, 10);
        if (isNaN(numericAnswer)) return;

        if (numericAnswer === currentQuestion.answer) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer();
        }
    }, [isTransitioning, currentQuestion, userAnswer, handleCorrectAnswer, handleWrongAnswer]);

    useEffect(() => {
        if (gameState !== "playing" || !currentQuestion || isTransitioning) return;

        const limit = getTimeLimit(score);
        setTimeLeft(limit);

        if (inputRef.current) {
            inputRef.current.focus();
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0.1) {
                    return 0;
                }
                return prev - 0.1;
            });
        }, 100);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [currentQuestion, gameState, score, isTransitioning]);

    useEffect(() => {
        if (gameState !== "playing" || !currentQuestion || isTransitioning) return;

        const limit = getTimeLimit(score);

        if (timeLeft <= 0) {
            handleTimeout();
        }

        if (timeBarRef.current) {
            const percentage = (timeLeft / limit) * 100;
            timeBarRef.current.style.width = `${percentage}%`;
            timeBarRef.current.style.backgroundColor =
                percentage > 50 ? "var(--accent-green)" :
                percentage > 25 ? "#f59e0b" : "#ef4444";
        }
    }, [timeLeft, gameState, currentQuestion, score, isTransitioning, handleTimeout]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isTransitioning || !currentQuestion) return;

        let value = e.target.value;

        if (value.length > currentQuestion.answerLength + 1) return;

        if (!/^-?\d*$/.test(value)) return;

        if (value.startsWith("0") && value.length > 1 && !value.startsWith("0-")) {
            value = value.substring(1);
        }

        setUserAnswer(value);

        if (value !== "" && !value.startsWith("-")) {
            const numericValue = parseInt(value, 10);
            if (!isNaN(numericValue)) {
                if (value.length === currentQuestion.answerLength) {
                    const numericAnswer = parseInt(value, 10);
                    if (numericAnswer === currentQuestion.answer) {
                        handleCorrectAnswer();
                    } else {
                        handleWrongAnswer();
                    }
                }
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            validateAnswer();
        }
    };

    return (
        <div className="bg-[var(--bg-primary)] py-4 px-4">
            <div className="max-w-lg mx-auto">
                {/* <div id="ad-banner-top" className="mb-8">
                    <AdBanner className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-4" />
                </div> */}

                <div className={`bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-lg transition-all duration-300 ${
                    feedback === "correct" ? "ring-4 ring-green-500/50 bg-green-500/10" :
                    feedback === "wrong" || feedback === "timeout" ? "ring-4 ring-red-500/50 bg-red-500/10" :
                    ""
                }`}>
                    {gameState === "start" && (
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Calculator className="w-10 h-10 text-[var(--accent-green)]" />
                            </div>
                            <h1 className="text-3xl font-bold text-[var(--heading-text)] mb-4">
                                Math Speed Challenge
                            </h1>
                            <p className="text-[var(--paragraph-text)] mb-8">
                                Test your mental math skills! Answer as many questions as you can before running out of lives.
                            </p>
                            <div className="space-y-4">
                                <button
                                    onClick={startGame}
                                    className="w-full py-4 px-8 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    Start Game
                                </button>
                                {highScore > 0 && (
                                    <div className="flex items-center justify-center gap-2 text-[var(--paragraph-text)]">
                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                        <span>High Score: {highScore}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {gameState === "playing" && (
                        <div className="text-center">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <Heart
                                            key={i}
                                            className={`w-6 h-6 transition-all duration-200 ${
                                                i < lives ? "text-red-500 fill-red-500 scale-100" : "text-gray-300 scale-75"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-lg font-semibold text-[var(--heading-text)]">
                                    <Zap className="w-5 h-5 text-[var(--accent-green)]" />
                                    {score}
                                </div>
                            </div>

                            <div className="h-2 bg-[var(--bg-primary)] rounded-full mb-8 overflow-hidden">
                                <div
                                    ref={timeBarRef}
                                    className="h-full rounded-full transition-all duration-100"
                                    style={{ width: "100%" }}
                                />
                            </div>

                            {currentQuestion && (
                                <div className="mb-8">
                                    <div className="text-5xl md:text-6xl font-bold text-[var(--heading-text)] mb-2">
                                        {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2}
                                    </div>
                                    <div className="text-2xl text-[var(--accent-green)]">= ?</div>
                                </div>
                            )}

                            <div className="mb-6">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={userAnswer}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder={currentQuestion ? "?".repeat(currentQuestion.answerLength) : "?"}
                                    disabled={isTransitioning}
                                    className={`w-48 px-6 py-4 text-3xl text-center font-bold bg-[var(--bg-primary)] border-2 rounded-xl focus:outline-none transition-all ${
                                        feedback === "wrong" ? "border-red-500 shake-animation" :
                                        feedback === "correct" ? "border-green-500" :
                                        "border-[var(--border-color)] focus:border-[var(--accent-green)]"
                                    }`}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                />
                            </div>

                            <div className="text-sm text-[var(--text-secondary)]">
                                Best: {highScore}
                            </div>
                        </div>
                    )}

                    {gameState === "gameover" && (
                        <GameResultLayout
                            score={score}
                            highScore={highScore}
                            onRestart={startGame}
                        />
                    )}
                </div>

                {gameState === "playing" && (
                    <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                        <p>Type your answer and press Enter when ready</p>
                        <p className="mt-1">Difficulty increases as you score higher!</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
                .shake-animation {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}
