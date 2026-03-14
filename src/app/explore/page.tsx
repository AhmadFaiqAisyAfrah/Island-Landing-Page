import { Metadata } from "next";
import Link from "next/link";
import MonetagInPagePush from "@/components/MonetagInPagePush";
import IslandSVG from "@/components/IslandSVG";

export const metadata: Metadata = {
    title: "Study Tools – Pomodoro Timer & Flashcards | Island",
    description:
        "Free online study tools to help you focus and learn. Use the Pomodoro Timer for deep work or Flashcards for active recall and spaced repetition.",
    keywords: [
        "study tools online",
        "pomodoro timer",
        "flashcards online",
        "study timer",
        "focus tools",
    ],
    openGraph: {
        title: "Study Tools – Pomodoro Timer & Flashcards | Island",
        description:
            "Free online study tools to help you focus and learn. Use the Pomodoro Timer for deep work or Flashcards for active recall and spaced repetition.",
        type: "website",
        url: "https://islandapp.id/explore",
    },
};

const tools = [
    {
        title: "Pomodoro Timer",
        description: "Focus deeply with calm timed sessions.",
        href: "/explore/pomodoro",
        button: "Start Pomodoro",
        emoji: "🍅",
    },
    {
        title: "Flashcards",
        description: "Memorize concepts faster using spaced repetition flashcards.",
        href: "/explore/flashcards",
        button: "Open Flashcards",
        emoji: "🧠",
    },
];

const highlights = [
    {
        emoji: "🎯",
        title: "Focus Better",
        desc: "Build deep focus sessions using Pomodoro.",
    },
    {
        emoji: "🧠",
        title: "Remember More",
        desc: "Strengthen memory with spaced repetition flashcards.",
    },
    {
        emoji: "🌱",
        title: "Grow Your Island",
        desc: "Stay consistent and watch your island flourish.",
    },
];

export default function ExplorePage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <MonetagInPagePush />

            <div className="max-w-[900px] mx-auto px-6 py-24">
                {/* Hero Section */}
                <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24">
                    {/* Left: Text */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="inline-block rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-1.5 text-xs font-medium text-[var(--accent-green)] tracking-wide">
                            🌿 Explore Island
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight text-[var(--heading-text)]">
                            Explore new ways
                            <br />
                            to <span className="text-[var(--accent-green)]">focus</span>.
                            <br />
                            <span className="text-[var(--heading-text)]">
                                Discover tools
                            </span>
                            <br />
                            that help you learn.
                        </h1>

                        <p className="text-lg text-[var(--paragraph-text)] max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Discover simple tools designed to help you focus deeper, remember more, and grow your island.
                        </p>
                    </div>

                    {/* Right: Island Illustration */}
                    <div className="flex-1 flex justify-center">
                        <div className="animate-float w-72 sm:w-80 lg:w-[22rem]">
                            <IslandSVG className="w-full h-auto drop-shadow-[0_20px_40px_rgba(107,191,138,0.22)]" />
                        </div>
                    </div>
                </section>

                {/* How Island Helps You */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {highlights.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-6 text-center"
                        >
                            <div className="text-4xl mb-4">
                                {item.emoji}
                            </div>
                            <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-[var(--paragraph-text)] leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[var(--accent-green)] font-bold tracking-wider uppercase text-sm mb-4 block">
                        Island Study Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading-text)] mb-6 tracking-tight">
                        Choose your study tool
                    </h1>
                    <p className="text-xl text-[var(--paragraph-text)] max-w-2xl mx-auto leading-relaxed">
                        Select the tool that helps you focus and learn better.
                    </p>
                </div>

                {/* Tool Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {tools.map((tool) => {
                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="group block bg-[var(--card-bg)] rounded-3xl p-8 md:p-10 border border-[var(--border-color)] shadow-[0_8px_30px_rgba(8,15,26,0.08)] hover:shadow-[0_16px_44px_rgba(8,15,26,0.16)] transition-all duration-300 hover:-translate-y-1 text-center"
                            >
                                <div className="text-6xl mb-6">
                                    {tool.emoji}
                                </div>

                                <h2 className="text-xl font-semibold mb-2">
                                    {tool.title}
                                </h2>
                                <p className="text-[var(--paragraph-text)] leading-relaxed mb-8">
                                    {tool.description}
                                </p>

                                <span className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-green)] text-white font-medium rounded-full group-hover:bg-[#5FBF8F] transition-colors shadow-md">
                                    {tool.button}
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
