import { Metadata } from "next";
import Link from "next/link";
import MonetagInPagePush from "@/components/MonetagInPagePush";
import { Timer, BookOpen } from "lucide-react";

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
        icon: Timer,
        gradient: "from-emerald-500/10 to-teal-500/10",
        iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
        title: "Flashcards",
        description: "Memorize concepts faster using spaced repetition flashcards.",
        href: "/explore/flashcards",
        button: "Open Flashcards",
        icon: BookOpen,
        gradient: "from-blue-500/10 to-indigo-500/10",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
];

export default function ExplorePage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <MonetagInPagePush />

            <div className="max-w-[900px] mx-auto px-6 py-24">
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
                        const Icon = tool.icon;
                        return (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="group block bg-[var(--card-bg)] rounded-3xl p-8 md:p-10 border border-[var(--border-color)] shadow-[0_8px_30px_rgba(8,15,26,0.08)] hover:shadow-[0_16px_44px_rgba(8,15,26,0.16)] transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6`}>
                                    <Icon className={`w-7 h-7 ${tool.iconColor}`} />
                                </div>

                                <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-3">
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
