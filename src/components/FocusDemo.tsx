"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Square, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import IslandSVG from "@/components/IslandSVG";

const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 120;
const DEFAULT_DURATION_MINUTES = 25;
const RING_RADIUS = 180;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const SVG_SIZE = 400;
const SVG_CENTER = SVG_SIZE / 2;

export default function FocusDemo() {
    const [isFocusing, setIsFocusing] = useState(false);
    const [selectedMinutes, setSelectedMinutes] = useState(DEFAULT_DURATION_MINUTES);
    const [sessionDurationSeconds, setSessionDurationSeconds] = useState(DEFAULT_DURATION_MINUTES * 60);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATION_MINUTES * 60);
    const [completionState, setCompletionState] = useState<"hidden" | "open" | "closing">("hidden");
    const [isDragging, setIsDragging] = useState(false);
    const [dragProgress, setDragProgress] = useState<number | null>(null);
    const [isRingHovered, setIsRingHovered] = useState(false);

    const endTimeRef = useRef<number | null>(null);
    const ringSvgRef = useRef<SVGSVGElement | null>(null);
    const closeDialogTimeoutRef = useRef<number | null>(null);
    const lastAngleRef = useRef<number | null>(null);
    const accumulatedMinutesRef = useRef<number>(DEFAULT_DURATION_MINUTES);

    useEffect(() => {
        return () => {
            if (closeDialogTimeoutRef.current) {
                window.clearTimeout(closeDialogTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isFocusing) {
            endTimeRef.current = null;
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const remaining = Math.max(0, Math.ceil((endTimeRef.current! - now) / 1000));

            setTimeLeft(remaining);

            if (remaining <= 0) {
                setIsFocusing(false);
                setCompletionState("open");
                endTimeRef.current = null;
            }
        }, 250);

        return () => clearInterval(interval);
    }, [isFocusing]);

    useEffect(() => {
        if (!isFocusing) {
            setTimeLeft(selectedMinutes * 60);
        }
    }, [isFocusing, selectedMinutes]);

    const getPointerAngle = (clientX: number, clientY: number): number | null => {
        if (!ringSvgRef.current) return null;
        const rect = ringSvgRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        let angle = Math.atan2(dy, dx);
        angle += Math.PI / 2;
        if (angle < 0) angle += 2 * Math.PI;
        if (angle > 2 * Math.PI) angle -= 2 * Math.PI;
        return angle;
    };

    const DELTA_THRESHOLD = 0.01;
    const SENSITIVITY = (MAX_DURATION_MINUTES - MIN_DURATION_MINUTES) / (2 * Math.PI);

    const handlePointerDrag = (clientX: number, clientY: number) => {
        if (!isDragging || isFocusing) return;
        const currentAngle = getPointerAngle(clientX, clientY);
        if (currentAngle === null || lastAngleRef.current === null) return;

        let delta = currentAngle - lastAngleRef.current;
        // Normalize delta to prevent wrap jumps across 0/2π boundary
        if (delta > Math.PI) delta -= 2 * Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;

        // Ignore tiny movements (jitter guard)
        if (Math.abs(delta) < DELTA_THRESHOLD) return;

        const minutesDelta = delta * SENSITIVITY;
        const rawMinutes = accumulatedMinutesRef.current + minutesDelta;
        const clampedMinutes = Math.max(MIN_DURATION_MINUTES, Math.min(MAX_DURATION_MINUTES, rawMinutes));

        // If already at limit and trying to go further, ignore
        if (clampedMinutes === accumulatedMinutesRef.current) {
            lastAngleRef.current = currentAngle;
            return;
        }

        accumulatedMinutesRef.current = clampedMinutes;
        lastAngleRef.current = currentAngle;

        const nextMinutes = Math.round(clampedMinutes);
        setDragProgress((nextMinutes - MIN_DURATION_MINUTES) / (MAX_DURATION_MINUTES - MIN_DURATION_MINUTES));
        setSelectedMinutes(nextMinutes);
    };

    const toggleFocus = () => {
        if (isFocusing) {
            setIsFocusing(false);
            setTimeLeft(selectedMinutes * 60);
            endTimeRef.current = null;
        } else {
            const durationSeconds = selectedMinutes * 60;
            setSessionDurationSeconds(durationSeconds);
            setTimeLeft(durationSeconds);
            endTimeRef.current = Date.now() + durationSeconds * 1000;
            setIsFocusing(true);
            setCompletionState("hidden");
        }
    };

    const closeCompletionDialog = () => {
        if (completionState !== "open") {
            return;
        }

        setCompletionState("closing");

        closeDialogTimeoutRef.current = window.setTimeout(() => {
            setCompletionState("hidden");
            closeDialogTimeoutRef.current = null;
        }, 220);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const sliderProgress = isDragging && dragProgress !== null
        ? dragProgress
        : selectedMinutes / MAX_DURATION_MINUTES;
    const elapsedProgress = 1 - timeLeft / sessionDurationSeconds;
    const progress = isFocusing ? elapsedProgress : sliderProgress;
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const filledLength = RING_CIRCUMFERENCE * clampedProgress;
    const knobAngle = -Math.PI / 2 + 2 * Math.PI * sliderProgress;
    const handleX = SVG_CENTER + RING_RADIUS * Math.cos(knobAngle);
    const handleY = SVG_CENTER + RING_RADIUS * Math.sin(knobAngle);
    const isCompletionVisible = completionState !== "hidden";

    return (
        <div className="py-24 bg-[var(--bg-primary)] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">

                <div className="text-center mb-16">
                    <span className="text-[var(--accent-green)] font-bold tracking-wider uppercase text-sm mb-4 block">
                        Island Pomodoro
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading-text)] mb-6 tracking-tight">
                        Pomodoro Timer Online
                    </h1>
                    <h2 className="text-xl text-[var(--paragraph-text)] max-w-2xl mx-auto leading-relaxed font-normal">
                        A quiet place to focus
                    </h2>
                </div>

                <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-16 items-center bg-[var(--card-bg)] rounded-[40px] p-8 md:p-12 shadow-[0_24px_52px_rgba(8,15,26,0.25)] border border-[var(--border-color)] relative overflow-hidden">

                    {/* LEFT SIDE: Island Visual */}
                    <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center bg-[var(--demo-panel-bg)] rounded-3xl overflow-hidden">

                        {/* Stars Background */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className={`absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-white rounded-full ${isFocusing ? 'animate-twinkle delay-100' : 'opacity-40'}`} />
                            <div className={`absolute top-[25%] left-[70%] w-2 h-2 bg-white rounded-full ${isFocusing ? 'animate-twinkle delay-500' : 'opacity-30'}`} />
                            <div className={`absolute top-[45%] left-[10%] w-1 h-1 bg-white rounded-full ${isFocusing ? 'animate-twinkle delay-300' : 'opacity-50'}`} />
                            <div className={`absolute top-[10%] left-[80%] w-1.5 h-1.5 bg-white rounded-full ${isFocusing ? 'animate-twinkle delay-700' : 'opacity-20'}`} />
                            <div className={`absolute top-[60%] left-[85%] w-2 h-2 bg-white rounded-full ${isFocusing ? 'animate-twinkle delay-1000' : 'opacity-40'}`} />
                        </div>

                        {/* Island SVG and Progress Ring container */}
                        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center z-10 drop-shadow-2xl">
                            <IslandSVG isFocusing={isFocusing} className="w-[85%] h-[85%] relative z-10" />

                            <svg
                                ref={ringSvgRef}
                                viewBox="0 0 400 400"
                                className="absolute inset-0 w-full h-full z-20"
                            >
                                {/* Background Ring Track */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="180"
                                    fill="none"
                                    stroke="var(--demo-ring-track)"
                                    strokeWidth="6"
                                />

                                {isDragging && !isFocusing && (
                                    <circle
                                        cx="200"
                                        cy="200"
                                        r="180"
                                        fill="none"
                                        stroke="var(--accent-green)"
                                        strokeWidth="12"
                                        strokeOpacity="0.2"
                                    />
                                )}

                                {/* Progress Ring */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="180"
                                    fill="none"
                                    stroke="var(--accent-green)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${filledLength} ${RING_CIRCUMFERENCE}`}
                                    strokeDashoffset="0"
                                    transform="rotate(-90 200 200)"
                                    className={isFocusing ? "transition-[stroke-dasharray] duration-500" : (isDragging ? "" : "transition-[stroke,stroke-dasharray] duration-150")}
                                    style={{
                                        transition: isDragging ? "none" : undefined,
                                        filter: isDragging ? "drop-shadow(0 0 6px rgba(168, 213, 186, 0.35))" : "none",
                                    }}
                                />

                                {!isFocusing && (
                                    <>
                                        <circle
                                            cx="200"
                                            cy="200"
                                            r="180"
                                            fill="none"
                                            stroke="transparent"
                                            strokeWidth="24"
                                            className="pointer-events-none"
                                            style={{ pointerEvents: "none" }}
                                        />
                                        <circle
                                            cx={handleX}
                                            cy={handleY}
                                            r="30"
                                            fill="transparent"
                                            className="cursor-grab active:cursor-grabbing touch-none"
                                            onMouseEnter={() => setIsRingHovered(true)}
                                            onMouseLeave={() => setIsRingHovered(false)}
                                            onPointerDown={(event) => {
                                                event.preventDefault();
                                                const angle = getPointerAngle(event.clientX, event.clientY);
                                                lastAngleRef.current = angle;
                                                accumulatedMinutesRef.current = selectedMinutes;
                                                setIsDragging(true);
                                                event.currentTarget.setPointerCapture(event.pointerId);
                                            }}
                                            onPointerMove={(event) => {
                                                if (!isDragging) return;
                                                handlePointerDrag(event.clientX, event.clientY);
                                            }}
                                            onPointerUp={(event) => {
                                                setIsDragging(false);
                                                setDragProgress(null);
                                                lastAngleRef.current = null;
                                                event.currentTarget.releasePointerCapture(event.pointerId);
                                            }}
                                            onPointerCancel={(event) => {
                                                setIsDragging(false);
                                                setDragProgress(null);
                                                lastAngleRef.current = null;
                                                event.currentTarget.releasePointerCapture(event.pointerId);
                                            }}
                                        />
                                        <circle
                                            cx={handleX}
                                            cy={handleY}
                                            r="8"
                                            fill={isRingHovered || isDragging ? "#8ad8a9" : "var(--accent-green)"}
                                            stroke="var(--demo-panel-bg)"
                                            strokeWidth="2"
                                            style={{
                                                filter: isRingHovered || isDragging
                                                    ? "drop-shadow(0 0 8px rgba(198, 230, 210, 0.6))"
                                                    : "none",
                                            }}
                                        />
                                    </>
                                )}
                            </svg>
                        </div>

                        {/* End Session Overlay */}
                        {isCompletionVisible && (
                            <div
                                className={`absolute inset-0 z-20 bg-[#0F172A]/70 backdrop-blur-sm flex items-center justify-center p-6 text-center transition-opacity duration-200 ${completionState === "open" ? "opacity-100" : "opacity-0"}`}
                            >
                                <div className={`relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 max-w-sm w-full shadow-2xl transition-all duration-200 ${completionState === "open" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-[0.98]"}`}>
                                    <button
                                        type="button"
                                        onClick={closeCompletionDialog}
                                        className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                                        aria-label="Close completion dialog"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>

                                    <div className="w-16 h-16 bg-pastel-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">🌱</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[var(--heading-text)] mb-2">Great focus session.</h3>
                                    <p className="text-[var(--paragraph-text)] mb-6">Imagine growing your island every day.</p>

                                    <Link
                                        href="https://play.google.com/store/apps/details?id=com.ahmadfaiq.island"
                                        target="_blank"
                                        className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--button-bg)] text-[var(--button-text)] rounded-2xl font-medium hover:bg-[var(--button-hover)] transition-colors"
                                    >
                                        <Image
                                            src="/launchpad/ic_launcher.png"
                                            alt="Island Logo"
                                            width={24}
                                            height={24}
                                            className="rounded-md"
                                        />
                                        Get the Island App
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE: Controls */}
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto w-full">
                        <div className="text-center mb-12">
                            <span className="text-[var(--accent-green)] font-semibold tracking-wide uppercase text-xs mb-2 block">
                                Your quiet place
                            </span>
                            <div className="text-[5rem] md:text-[6rem] font-bold text-[var(--heading-text)] leading-none tracking-tighter tabular-nums">
                                {formatTime(timeLeft)}
                            </div>
                        </div>

                        <button
                            onClick={toggleFocus}
                            className={`w-full py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 ${isFocusing
                                ? "bg-[var(--bg-secondary)] text-[var(--heading-text)] border border-[var(--border-color)] hover:border-[var(--accent-green)]"
                                : "bg-[var(--button-bg)] text-[var(--button-text)] shadow-[0_14px_28px_rgba(8,15,26,0.3)] hover:bg-[var(--button-hover)] hover:shadow-[0_18px_32px_rgba(8,15,26,0.35)] hover:-translate-y-1"
                                }`}
                        >
                            {isFocusing ? (
                                <>
                                    <Square className="w-5 h-5 fill-current" />
                                    Stop Focus
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5 fill-current" />
                                    Begin Focus
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <p className="text-[var(--paragraph-text)] mb-6 text-lg">
                        Unlock the full island experience in the Island app. Focus sessions, tree variety, daily journals, and more.
                    </p>
                    <Link
                        href="https://play.google.com/store/apps/details?id=com.ahmadfaiq.island"
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--button-bg)] text-[var(--button-text)] rounded-full font-medium hover:bg-[var(--button-hover)] transition-all hover:scale-105"
                    >
                        Download Island on Google Play
                    </Link>
                </div>

            </div>
        </div>
    );
}
