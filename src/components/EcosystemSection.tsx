import Link from "next/link";
import { BookOpen, Gamepad2, Heart, ArrowRight } from "lucide-react";

const pillars = [
    {
        icon: BookOpen,
        title: "Island Articles",
        description: "Insights, research, and educational content across health, economy, and technology.",
        href: "/articles",
        color: "#059669",
    },
    {
        icon: Gamepad2,
        title: "Island Learning Games",
        description: "Interactive tools to train focus, logic, and cognitive skills.",
        href: "/games",
        color: "#2563eb",
    },
    {
        icon: Heart,
        title: "Island Charity",
        description: "Real impact initiatives focused on clean water and nutrition in Indonesia's islands.",
        href: "/charity",
        color: "#dc2626",
    },
];

export default function EcosystemSection() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        The Island Ecosystem
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Three pillars working together to create meaningful impact
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar) => (
                        <Link
                            key={pillar.title}
                            href={pillar.href}
                            className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                                style={{ backgroundColor: `${pillar.color}15` }}
                            >
                                <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {pillar.description}
                            </p>
                            <div className="flex items-center gap-2 text-emerald-600 font-medium">
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
