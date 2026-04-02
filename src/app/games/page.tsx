import { Metadata } from "next";
import Link from "next/link";
import { Calculator, Keyboard, Brain, Trophy, ArrowRight, Zap, Layers, Lightbulb, Eye } from "lucide-react";

export const metadata: Metadata = {
    title: "Free Online Learning Games | Island",
    description:
        "Train your brain with fun and interactive challenges. Play math speed challenge, typing speed test, and more brain training games for free.",
    keywords: [
        "online learning games",
        "brain training games",
        "math game",
        "typing game",
        "educational games",
        "brain games",
        "mental math",
        "speed test",
        "free games",
        "cognitive training",
    ],
    openGraph: {
        title: "Free Online Learning Games | Island",
        description:
            "Train your brain with fun and interactive challenges. Play math speed challenge, typing speed test, and more brain training games for free.",
        type: "website",
        url: "https://islandapp.id/games",
    },
};

const games = [
    {
        id: "math-challenge",
        title: "Math Speed Challenge",
        description: "Solve math problems as fast as you can. Test your mental calculation speed with addition, subtraction, multiplication, and division.",
        icon: Calculator,
        href: "/math-game",
        color: "var(--accent-green)",
        bgColor: "bg-[var(--accent-green)]/10",
        stats: [
            { label: "Operations", value: "4" },
            { label: "Difficulty", value: "Adaptive" },
        ],
    },
    {
        id: "typing-challenge",
        title: "Typing Speed Challenge",
        description: "Test and improve your typing speed. Track your WPM and accuracy with timed challenges or full text modes.",
        icon: Keyboard,
        href: "/typing-game",
        color: "#3b82f6",
        bgColor: "bg-blue-500/10",
        stats: [
            { label: "Metrics", value: "WPM + Accuracy" },
            { label: "Modes", value: "2" },
        ],
    },
    {
        id: "reaction-test",
        title: "Reaction Speed Test",
        description: "Test how fast your reflexes are. Click as fast as possible when the screen turns green and measure your reaction time.",
        icon: Zap,
        href: "/reaction-test",
        color: "#f59e0b",
        bgColor: "bg-yellow-500/10",
        stats: [
            { label: "Modes", value: "Quick + Multi" },
            { label: "Measurement", value: "Milliseconds" },
        ],
    },
    {
        id: "memory-game",
        title: "Memory Card Game",
        description: "Test and improve your memory skills. Match pairs of cards in this classic brain training game with multiple difficulty levels.",
        icon: Layers,
        href: "/memory-game",
        color: "#8b5cf6",
        bgColor: "bg-purple-500/10",
        stats: [
            { label: "Levels", value: "3" },
            { label: "Track", value: "Moves + Time" },
        ],
    },
    {
        id: "pattern-game",
        title: "Number Pattern Test",
        description: "Challenge your logic and IQ with number patterns. Find the next number in the sequence and test your brain!",
        icon: Lightbulb,
        href: "/pattern-game",
        color: "#ec4899",
        bgColor: "bg-pink-500/10",
        stats: [
            { label: "Modes", value: "2" },
            { label: "Patterns", value: "Multiple" },
        ],
    },
    {
        id: "focus-test",
        title: "Focus Test",
        description: "Train your focus by clicking only green circles. Avoid all other shapes and test your concentration!",
        icon: Eye,
        href: "/focus-test",
        color: "#06b6d4",
        bgColor: "bg-cyan-500/10",
        stats: [
            { label: "Modes", value: "2" },
            { label: "Track", value: "Accuracy" },
        ],
    },
];

export default function GamesPage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-green)]/10 rounded-full mb-6">
                        <Brain className="w-5 h-5 text-[var(--accent-green)]" />
                        <span className="text-sm font-medium text-[var(--accent-green)]">Brain Training</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading-text)] mb-4">
                        Island Learning Games
                    </h1>
                    <p className="text-lg text-[var(--paragraph-text)] max-w-2xl mx-auto">
                        Train your brain with fun and interactive challenges. Improve your math skills,
                        typing speed, and more — all for free.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {games.map((game) => (
                        <article
                            key={game.id}
                            className="group bg-[var(--bg-secondary)] rounded-2xl p-8 border border-[var(--border-color)] hover:border-[var(--accent-green)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-green)]/5"
                        >
                            <div className="flex items-start gap-6">
                                <div className={`w-16 h-16 rounded-2xl ${game.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <game.icon className="w-8 h-8" style={{ color: game.color }} />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-[var(--heading-text)] mb-2 group-hover:text-[var(--accent-green)] transition-colors">
                                        {game.title}
                                    </h2>
                                    <p className="text-[var(--paragraph-text)] mb-4">
                                        {game.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {game.stats.map((stat) => (
                                            <div key={stat.label} className="text-sm">
                                                <span className="text-[var(--text-secondary)]">{stat.label}: </span>
                                                <span className="font-medium text-[var(--heading-text)]">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href={game.href}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-green)] text-white rounded-full font-medium hover:opacity-90 transition-all group/button"
                                    >
                                        Play Now
                                        <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <section className="bg-[var(--bg-secondary)] rounded-2xl p-8 md:p-12 border border-[var(--border-color)] text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-4">
                        Track Your Progress
                    </h2>
                    <p className="text-[var(--paragraph-text)] mb-6 max-w-xl mx-auto">
                        Your high scores are saved locally so you can track your improvement over time.
                        Keep practicing to beat your personal best!
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[var(--accent-green)]" />
                            <span className="text-[var(--paragraph-text)]">High scores saved locally</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-[var(--paragraph-text)]">Adaptive difficulty</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <span className="text-[var(--paragraph-text)]">Free to play</span>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-8 text-center">
                        Coming Soon
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: "Daily Challenges", icon: "📅" },
                            { name: "Global Leaderboard", icon: "🌍" },
                        ].map((upcoming) => (
                            <div
                                key={upcoming.name}
                                className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] opacity-60"
                            >
                                <div className="text-3xl mb-3">{upcoming.icon}</div>
                                <h3 className="font-semibold text-[var(--heading-text)]">{upcoming.name}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">Coming soon</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
