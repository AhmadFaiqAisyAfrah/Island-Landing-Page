import Link from "next/link";
import { ArrowRight, Zap, Keyboard, Calculator } from "lucide-react";

const featuredGames = [
    {
        icon: Zap,
        title: "Reaction Speed Test",
        description: "Measure your reflexes in milliseconds",
        href: "/games/reaction",
        color: "#f59e0b",
    },
    {
        icon: Keyboard,
        title: "Typing Speed Test",
        description: "Check your WPM and accuracy",
        href: "/games/typing-speed",
        color: "#3b82f6",
    },
    {
        icon: Calculator,
        title: "Math Speed Challenge",
        description: "Train your mental math skills",
        href: "/games/math-speed",
        color: "var(--accent-green)",
    },
];

export default function GamesPreview() {
    return (
        <section className="py-24 bg-[var(--bg-primary)]">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--heading-text)] mb-2">
                            Learning Games
                        </h2>
                        <p className="text-[var(--paragraph-text)]">
                            Train your brain with interactive challenges
                        </p>
                    </div>
                    <Link
                        href="/games"
                        className="inline-flex items-center gap-2 text-[var(--accent-green)] font-medium hover:underline"
                    >
                        Explore All Games
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredGames.map((game) => (
                        <Link
                            key={game.title}
                            href={game.href}
                            className="group bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-[var(--accent-green)]/50 transition-all duration-300"
                        >
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                style={{ backgroundColor: `${game.color}15` }}
                            >
                                <game.icon className="w-6 h-6" style={{ color: game.color }} />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--heading-text)] mb-2 group-hover:text-[var(--accent-green)] transition-colors">
                                {game.title}
                            </h3>
                            <p className="text-sm text-[var(--paragraph-text)]">
                                {game.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
