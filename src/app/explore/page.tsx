import { Metadata } from "next";
import Link from "next/link";
import MonetagInPagePush from "@/components/MonetagInPagePush";
import IslandSVG from "@/components/IslandSVG";
import CloudSVG from "@/components/CloudSVG";

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
        description: "Memorize concepts faster using flashcards.",
        href: "/explore/flashcards",
        button: "Open Flashcards",
        emoji: "🧠",
    },
];

export default function ExplorePage() {
    return (
        <div className="explore-page pt-24">
            <MonetagInPagePush />

            <div className="max-w-[900px] mx-auto px-6 py-24">
                {/* Hero Section */}
                <section className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24">
                    {/* Animated clouds */}
                    <div className="absolute top-12 left-0 w-44 animate-cloud-move explore-cloud">
                        <CloudSVG variant="soft" />
                    </div>
                    <div className="absolute top-28 right-0 w-56 animate-cloud-move explore-cloud" style={{ animationDelay: "2s" }}>
                        <CloudSVG />
                    </div>
                    <div className="absolute top-44 left-1/4 w-32 animate-cloud-move explore-cloud" style={{ animationDelay: "3s" }}>
                        <CloudSVG variant="small" />
                    </div>

                    {/* Left: Text */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="inline-block rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-1.5 text-xs font-medium text-[var(--accent-green)] tracking-wide">
                            🌿 Explore Island
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight explore-text">
                            Explore new ways
                            <br />
                            to <span className="text-[var(--accent-green)]">focus</span>.
                            <br />
                            <span className="explore-text">
                                Discover tools
                            </span>
                            <br />
                            that help you learn.
                        </h1>

                        <p className="text-lg explore-text-secondary max-w-md mx-auto lg:mx-0 leading-relaxed">
                            Discover simple tools designed to help you focus deeper, remember more, then grow.
                        </p>
                    </div>

                    {/* Right: Island Illustration */}
                    <div className="flex-1 flex justify-center">
                        <div className="animate-float w-72 sm:w-80 lg:w-[22rem]">
                            <IslandSVG className="w-full h-auto drop-shadow-[0_20px_40px_rgba(107,191,138,0.22)]" />
                        </div>
                    </div>
                </section>

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold explore-text mb-6 tracking-tight">
                        Choose your study tool
                    </h1>
                </div>

                {/* Tool Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {tools.map((tool) => {
                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="group block explore-card rounded-3xl p-8 md:p-10 border hover:shadow-[0_16px_44px_rgba(8,15,26,0.16)] transition-all duration-300 hover:-translate-y-1 text-center"
                            >
                                <div className="text-6xl mb-6">
                                    {tool.emoji}
                                </div>

                                <h2 className="text-xl font-semibold mb-2 explore-text">
                                    {tool.title}
                                </h2>
                                <p className="text-lg explore-text-secondary leading-relaxed mb-8">
                                    {tool.description}
                                </p>

                                <span className="inline-flex items-center gap-2 px-6 py-3 explore-btn font-medium rounded-full transition-colors shadow-md">
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
