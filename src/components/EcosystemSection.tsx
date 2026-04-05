import Link from "next/link";
import { BookOpen, Gamepad2, Heart, ArrowRight } from "lucide-react";

const pillars = [
    {
        icon: BookOpen,
        title: "Island Articles",
        description: "Insights, research, and educational content across health, economy, and technology.",
        href: "/articles",
        color: "var(--accent-green)",
    },
    {
        icon: Gamepad2,
        title: "Island Learning Games",
        description: "Interactive tools to train focus, logic, and cognitive skills.",
        href: "/games",
        color: "#3b82f6",
    },
    {
        icon: Heart,
        title: "Island Charity",
        description: "Real impact initiatives focused on clean water and nutrition in Indonesia's islands.",
        href: "/charity",
        color: "#ef4444",
    },
];

export default function EcosystemSection() {
    return (
        <section className="py-24 bg-[var(--bg-primary)]">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--heading-text)] mb-4">
                        The Island Ecosystem
                    </h2>
                    <p className="text-lg text-[var(--paragraph-text)] max-w-2xl mx-auto">
                        Three pillars working together to create meaningful impact
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar) => (
                        <Link
                            key={pillar.title}
                            href={pillar.href}
                            className="group bg-[var(--bg-secondary)] rounded-2xl p-8 border border-[var(--border-color)] hover:border-[var(--accent-green)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-green)]/5"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                style={{ backgroundColor: `${pillar.color}15` }}
                            >
                                <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--heading-text)] mb-3 group-hover:text-[var(--accent-green)] transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="text-[var(--paragraph-text)] mb-4 leading-relaxed">
                                {pillar.description}
                            </p>
                            <div className="flex items-center gap-2 text-[var(--accent-green)] font-medium">
                                <span>Explore</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
