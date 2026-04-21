"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const STICKMAN_IMAGE = "https://ik.imagekit.io/kv42h83lq/ChatGPT_Image_Apr_17__2026__10_29_51_AM-removebg-preview.png";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

interface StatItemProps {
    value: number;
    label: string;
    delay: number;
    statsLoaded: boolean;
}

function StatItem({ value, label, delay, statsLoaded }: StatItemProps) {
    return (
        <div className="text-center group cursor-default transition-transform duration-200 hover:scale-105">
            <motion.div
                className="text-2xl sm:text-3xl font-bold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: statsLoaded ? 1 : 0 }}
                transition={{ duration: 0.3, delay }}
            >
                {value}
            </motion.div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">{label}</div>
        </div>
    );
}

interface Stats {
    articlesCount: number;
    gamesCount: number;
    studyToolsCount: number;
    productsCount: number;
    appsCount: number;
    partnersCount: number;
}

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const [stats, setStats] = useState<Stats>({ articlesCount: 0, gamesCount: 0, studyToolsCount: 0, productsCount: 0, appsCount: 1, partnersCount: 3 });
    const [statsLoaded, setStatsLoaded] = useState(false);

    const humanY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/stats");
                const data = await res.json();
                setStats({
                    articlesCount: data.articlesCount || 0,
                    gamesCount: data.gamesCount || 0,
                    studyToolsCount: data.studyToolsCount || 0,
                    productsCount: data.productsCount || 0,
                    appsCount: data.appsCount || 1,
                    partnersCount: data.partnersCount || 3
                });
                setStatsLoaded(true);
            } catch (error) {
                console.error("[Hero] Failed to fetch stats:", error);
                setStatsLoaded(true);
            }
        }
        fetchStats();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-white"
        >
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[70vh]">
                    <motion.div
                        className="order-2 lg:order-1 lg:col-span-2 text-center lg:text-left"
                        style={{ y: textY }}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="mb-8 leading-tight"
                        >
                            <span
                                className="block text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900"
                                style={{ 
                                    fontFamily: "var(--font-heading), Georgia, serif",
                                    letterSpacing: "-0.02em"
                                }}
                            >
                                Island
                            </span>
                            <span
                                className="block text-xl sm:text-2xl lg:text-xl xl:text-2xl font-normal mt-3 text-gray-600"
                            >
                                A Platform for Knowledge, Growth, and Learning
                            </span>
                        </motion.h1>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
                        >
                            <Link
                                href="/articles"
                                className="group relative px-6 py-3 rounded-full font-semibold text-sm text-white whitespace-nowrap transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg bg-emerald-500 hover:bg-emerald-600"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-base leading-none">📰</span>
                                    <span>Explore Articles</span>
                                </span>
                            </Link>

                            <Link
                                href="/games"
                                className="group px-6 py-3 rounded-full font-semibold text-sm text-emerald-700 whitespace-nowrap transition-all duration-200 ease-out hover:scale-105 hover:bg-emerald-50 border-2 border-emerald-200 bg-white"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-base leading-none">👾</span>
                                    <span>Try Learning Games</span>
                                </span>
                            </Link>

                            <Link
                                href="/explore"
                                className="group px-6 py-3 rounded-full font-semibold text-sm text-emerald-700 whitespace-nowrap transition-all duration-200 ease-out hover:scale-105 hover:bg-emerald-50 border-2 border-emerald-200 bg-white"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-base leading-none">🛠️</span>
                                    <span>Explore Tools</span>
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6"
                        >
                            <StatItem value={stats.articlesCount} label="Articles" delay={0} statsLoaded={statsLoaded} />
                            <StatItem value={stats.gamesCount} label="Games" delay={0.1} statsLoaded={statsLoaded} />
                            <StatItem value={stats.studyToolsCount} label="Study Tools" delay={0.2} statsLoaded={statsLoaded} />
                            <StatItem value={stats.productsCount} label="Products" delay={0.3} statsLoaded={statsLoaded} />
                            <StatItem value={stats.appsCount} label="Apps" delay={0.4} statsLoaded={statsLoaded} />
                            <StatItem value={stats.partnersCount} label="Partners" delay={0.5} statsLoaded={statsLoaded} />
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="mt-6 text-center lg:text-left"
                        >
                            <p className="text-sm text-gray-500">
                                Building knowledge, growth, and skills since 2026
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="order-1 lg:order-2 lg:col-span-3 relative flex items-center justify-center min-h-[300px] lg:min-h-[600px]"
                        style={{ y: humanY }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 50% 70% at 50% 50%, rgba(5, 150, 105, 0.06) 0%, transparent 70%)",
                                filter: "blur(40px)",
                            }}
                        />

                        <motion.div
                            className="relative z-10 w-[320px] sm:w-[380px] lg:w-[480px] xl:w-[520px]"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Image
                                src={STICKMAN_IMAGE}
                                alt="Island Platform"
                                width={520}
                                height={650}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-0">
                <svg viewBox="0 0 1440 120" fill="none" className="w-full block">
                    <path 
                        d="M0 80 C240 40 480 95 720 65 C960 35 1200 85 1440 70 L1440 120 L0 120Z" 
                        fill="#f1f5f9" 
                    />
                </svg>
            </div>
        </section>
    );
}
