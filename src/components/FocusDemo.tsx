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
const STAR_PARTICLES = [
    { top: "7%", left: "8%", size: 1.4, opacity: 0.36, delay: 120 },
    { top: "10%", left: "46%", size: 1.2, opacity: 0.22, delay: 260 },
    { top: "12%", left: "83%", size: 2.2, opacity: 0.34, delay: 420 },
    { top: "22%", left: "17%", size: 1.8, opacity: 0.29, delay: 560 },
    { top: "25%", left: "63%", size: 1.6, opacity: 0.32, delay: 710 },
    { top: "31%", left: "90%", size: 2.4, opacity: 0.28, delay: 860 },
    { top: "39%", left: "28%", size: 1.3, opacity: 0.26, delay: 1020 },
    { top: "42%", left: "70%", size: 2.0, opacity: 0.33, delay: 1150 },
    { top: "51%", left: "7%", size: 1.5, opacity: 0.28, delay: 1290 },
    { top: "58%", left: "87%", size: 1.7, opacity: 0.3, delay: 1450 },
    { top: "66%", left: "22%", size: 2.1, opacity: 0.27, delay: 1600 },
    { top: "71%", left: "52%", size: 1.2, opacity: 0.3, delay: 1740 },
    { top: "76%", left: "80%", size: 1.8, opacity: 0.25, delay: 1890 },
    { top: "85%", left: "12%", size: 1.6, opacity: 0.3, delay: 2030 },
    { top: "88%", left: "60%", size: 1.4, opacity: 0.24, delay: 2190 },
];

type MusicOption = {
    value: string;
    label: string;
    src: string | null;
};

export default function FocusDemo({ musicOptions }: { musicOptions: MusicOption[] }) {
    const [isFocusing, setIsFocusing] = useState(false);
    const [selectedMinutes, setSelectedMinutes] = useState(DEFAULT_DURATION_MINUTES);
    const [sessionDurationSeconds, setSessionDurationSeconds] = useState(DEFAULT_DURATION_MINUTES * 60);
    const [remainingMs, setRemainingMs] = useState(DEFAULT_DURATION_MINUTES * 60 * 1000);
    const [completionState, setCompletionState] = useState<"hidden" | "open" | "closing">("hidden");
    const [isDragging, setIsDragging] = useState(false);
    const [dragProgress, setDragProgress] = useState<number | null>(null);
    const [selectedMusic, setSelectedMusic] = useState("none");

    const endTimeRef = useRef<number | null>(null);
    const ringSvgRef = useRef<SVGSVGElement | null>(null);
    const closeDialogTimeoutRef = useRef<number | null>(null);
    const lastAngleRef = useRef<number | null>(null);
    const accumulatedMinutesRef = useRef<number>(DEFAULT_DURATION_MINUTES);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        return () => {
            if (closeDialogTimeoutRef.current) {
                window.clearTimeout(closeDialogTimeoutRef.current);
            }

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }
        };
    }, []);

    const stopMusic = () => {
        if (!audioRef.current) {
            return;
        }

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    const playMusic = (musicValue: string) => {
        const selectedOption = musicOptions.find((option) => option.value === musicValue);
        if (!selectedOption || !selectedOption.src) {
            stopMusic();
            return;
        }

        const currentAudio = audioRef.current;
        if (currentAudio && currentAudio.src.endsWith(selectedOption.src)) {
            if (currentAudio.paused) {
                currentAudio.play().catch(() => undefined);
            }
            return;
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const nextAudio = new Audio(selectedOption.src);
        nextAudio.loop = true;
        nextAudio.volume = 0.6;
        audioRef.current = nextAudio;
        nextAudio.play().catch(() => undefined);
    };

    useEffect(() => {
        if (!isFocusing) {
            endTimeRef.current = null;
            return;
        }

        let frame = 0;

        const animate = () => {
            if (!endTimeRef.current) {
                return;
            }

            const remaining = Math.max(0, endTimeRef.current - Date.now());
            setRemainingMs(remaining);

            if (remaining <= 0) {
                stopMusic();
                setIsFocusing(false);
                setCompletionState("open");
                endTimeRef.current = null;
                return;
            }

            frame = window.requestAnimationFrame(animate);
        };

        frame = window.requestAnimationFrame(animate);

        return () => window.cancelAnimationFrame(frame);
    }, [isFocusing]);

    useEffect(() => {
        if (!isFocusing) {
            setRemainingMs(selectedMinutes * 60 * 1000);
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
            stopMusic();
            setIsFocusing(false);
            setRemainingMs(selectedMinutes * 60 * 1000);
            endTimeRef.current = null;
        } else {
            const durationSeconds = selectedMinutes * 60;
            setSessionDurationSeconds(durationSeconds);
            setRemainingMs(durationSeconds * 1000);
            endTimeRef.current = Date.now() + durationSeconds * 1000;
            setIsFocusing(true);
            setCompletionState("hidden");

            if (selectedMusic !== "none") {
                playMusic(selectedMusic);
            }
        }
    };

    const handleMusicChange = (nextMusic: string) => {
        setSelectedMusic(nextMusic);

        if (nextMusic === "none") {
            stopMusic();
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
    const timeLeft = Math.max(0, Math.ceil(remainingMs / 1000));
    const elapsedProgress = 1 - remainingMs / (sessionDurationSeconds * 1000);
    const progress = isFocusing ? elapsedProgress : sliderProgress;
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const strokeDashoffset = RING_CIRCUMFERENCE * (1 - clampedProgress);
    const knobAngle = -Math.PI / 2 + 2 * Math.PI * clampedProgress;
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
                    <div
                        className="relative w-full aspect-square md:aspect-auto md:h-[520px] flex items-center justify-center rounded-3xl overflow-hidden"
                        style={{
                            background: "radial-gradient(circle at 50% 0%, #3f5978 0%, #314b6a 36%, #273f5a 72%, #213650 100%)",
                        }}
                    >

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_86%_88%,rgba(141,170,198,0.18),transparent_38%)]" />

                        {/* Stars Background */}
                        <div className="absolute inset-0 overflow-hidden">
                            {STAR_PARTICLES.map((star, index) => (
                                <div
                                    key={`star-${index}`}
                                    className={`absolute rounded-full ${isFocusing ? "animate-twinkle" : ""}`}
                                    style={{
                                        top: star.top,
                                        left: star.left,
                                        width: `${star.size}px`,
                                        height: `${star.size}px`,
                                        background: "rgba(229,242,255,0.95)",
                                        boxShadow: "0 0 6px rgba(203,226,249,0.28)",
                                        opacity: isFocusing ? Math.min(0.52, star.opacity + 0.08) : star.opacity,
                                        animationDelay: `${star.delay}ms`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Island SVG and Progress Ring container */}
                        <div className="relative w-full max-w-[470px] aspect-square flex items-center justify-center z-10">
                            <div className="absolute inset-[23%] rounded-full bg-[#7b94ad]/20 blur-[40px]" />

                            <div className={`relative z-10 w-[89%] h-[89%] ${isFocusing ? "animate-float" : "animate-float-slow"}`}>
                                <IslandSVG isFocusing={isFocusing} className="w-full h-full" />
                            </div>

                            <div className="absolute bottom-[20%] w-[39%] h-[7%] rounded-full bg-[#111f31]/40 blur-[14px] z-[5]" />

                            <svg
                                ref={ringSvgRef}
                                viewBox="0 0 400 400"
                                className="absolute inset-0 w-full h-full z-20"
                            >
                                <defs>
                                    <linearGradient id="orbitProgress" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
                                        <stop offset="100%" stopColor="rgba(226,238,251,0.72)" />
                                    </linearGradient>
                                    <linearGradient id="orbitLeftGlow" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                                    </linearGradient>
                                    <filter id="orbitGlowBlur" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="5.4" />
                                    </filter>
                                </defs>

                                {/* Background Ring Track */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="180"
                                    fill="none"
                                    stroke="rgba(180, 197, 216, 0.35)"
                                    strokeWidth="2.2"
                                />

                                <path
                                    d="M 58 202 A 142 142 0 0 1 86 115"
                                    fill="none"
                                    stroke="url(#orbitLeftGlow)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    filter="url(#orbitGlowBlur)"
                                    opacity="0.9"
                                />

                                <path
                                    d="M 82 106 A 156 156 0 0 1 136 64"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.32)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    opacity="0.82"
                                />

                                <path
                                    d="M 294 351 A 154 154 0 0 0 338 320"
                                    fill="none"
                                    stroke="rgba(194,214,236,0.22)"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    filter="url(#orbitGlowBlur)"
                                />

                                {isDragging && !isFocusing && (
                                    <circle
                                        cx="200"
                                        cy="200"
                                        r="180"
                                        fill="none"
                                        stroke="rgba(226,236,248,0.2)"
                                        strokeWidth="6"
                                    />
                                )}

                                {/* Progress Ring */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="180"
                                    fill="none"
                                    stroke="url(#orbitProgress)"
                                    strokeWidth="4.8"
                                    strokeLinecap="round"
                                    strokeDasharray={RING_CIRCUMFERENCE}
                                    strokeDashoffset={strokeDashoffset}
                                    transform="rotate(-90 200 200)"
                                    className={isFocusing ? "" : (isDragging ? "" : "transition-[stroke,stroke-dashoffset] duration-150")}
                                    style={{
                                        transition: isDragging ? "none" : undefined,
                                        filter: "drop-shadow(0 0 5px rgba(246, 251, 255, 0.32))",
                                    }}
                                />

                                <circle
                                    cx={handleX}
                                    cy={handleY}
                                    r={isFocusing ? 6 : 7}
                                    fill="#f8fbff"
                                    stroke="rgba(156,179,202,0.6)"
                                    strokeWidth="1.2"
                                    style={{ filter: "drop-shadow(0 0 6px rgba(234,244,255,0.5))" }}
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
                                            src="/island-logo.png"
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

                        <div className="w-full mb-6 rounded-2xl border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--card-bg)_78%,transparent)] px-4 py-3 backdrop-blur-sm">
                            <label htmlFor="focus-music" className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)] mb-2 block">
                                🎵 Focus Music
                            </label>
                            <select
                                id="focus-music"
                                value={selectedMusic}
                                onChange={(event) => handleMusicChange(event.target.value)}
                                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2.5 text-[var(--heading-text)] outline-none transition-colors hover:border-[var(--accent-green)] focus:border-[var(--accent-green)]"
                            >
                                {musicOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
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


            </div>
        </div>
    );
}
