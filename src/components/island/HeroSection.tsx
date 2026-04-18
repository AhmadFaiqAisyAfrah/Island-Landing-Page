"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const ISLAND_LOGO_URL = "https://ik.imagekit.io/kv42h83lq/Logo_Island_2-removebg-preview.png";

function IslandLogo() {
    const [imageError, setImageError] = useState(false);

    if (imageError) {
        return (
            <div className="w-[260px] md:w-[320px] mx-auto h-[260px] md:h-[320px] bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                <span className="text-8xl">🏝️</span>
            </div>
        );
    }

    return (
        <Image
            src={ISLAND_LOGO_URL}
            alt="Island Logo"
            width={320}
            height={320}
            className="w-[260px] md:w-[320px] h-auto object-contain mx-auto transition-transform duration-300 hover:scale-105"
            priority
            onError={() => setImageError(true)}
        />
    );
}

function UserAvatars() {
    const emojis = ["😊", "🙂", "😀", "🤗"];
    
    return (
        <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
            <div className="flex -space-x-2">
                {emojis.map((emoji, i) => (
                    <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-lg"
                    >
                        {emoji}
                    </div>
                ))}
            </div>
            <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">10K+</span> downloads
            </div>
        </div>
    );
}

export default function HeroSection() {
    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="inline-block rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-medium text-emerald-700">
                            🌿 Focus & Grow
                        </div>

                        <h1 
                            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight text-gray-900"
                            style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
                        >
                            Focus deeply.
                            <br />
                            Earn rewards.
                            <br />
                            Build your island.
                        </h1>

                        <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Stay focused, earn coins, and watch your personal island flourish. The Pomodoro timer that makes productivity feel like a vacation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="https://play.google.com/store/apps/details?id=com.island.focusapp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-base hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20,16.5L12.19,8.69L9.5,11.38L8.11,10L16.5,1.61L17.89,3L19.5,4.5L20.81,3.19L20,16.5Z" />
                                </svg>
                                Download on Play Store
                            </Link>

                            <Link
                                href="#features"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-emerald-300 text-emerald-700 rounded-full font-semibold text-base hover:bg-emerald-50 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>

                        <UserAvatars />
                    </div>

                    <div className="flex-1 relative">
                        <div className="relative z-10">
                            <IslandLogo />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-emerald-100 to-transparent rounded-full opacity-60 blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" className="w-full block">
                    <path d="M0 80 C240 40 480 95 720 65 C960 35 1200 85 1440 70 L1440 120 L0 120Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}