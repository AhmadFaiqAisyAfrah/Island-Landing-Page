import { ShieldCheck, Smartphone } from "lucide-react";

const cards = [
    {
        icon: Smartphone,
        title: "Your data stays with you",
        desc: "All focus progress, island data, and settings are stored locally on your device. We don't track your productivity habits.",
        color: "bg-pastel-green/20",
        iconColor: "text-pastel-green-deep",
    },
    {
        icon: ShieldCheck,
        title: "Secure purchases",
        desc: "All in-app purchases are handled securely through Google Play's billing system. No credit card info ever touches our servers.",
        color: "bg-pastel-blue/20",
        iconColor: "text-pastel-blue-deep",
    },
];

export default function TransparencySection() {
    return (
        <section id="transparency" className="py-24 bg-cream">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-14">
                    <span className="inline-block rounded-full bg-pastel-sand/40 px-4 py-1.5 text-xs font-medium text-pastel-sand-deep">
                        🔒 Transparency
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-dark">
                        Built on trust
                    </h2>
                    <p className="text-text-muted max-w-lg mx-auto">
                        We respect your privacy and keep things simple and honest.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {cards.map((card, i) => (
                        <div
                            key={card.title}
                            className="rounded-2xl bg-white/70 backdrop-blur-sm border border-pastel-green/10 p-8 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <div
                                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${card.color} mb-5`}
                            >
                                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-text-dark mb-3">
                                {card.title}
                            </h3>
                            <p className="text-text-muted leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
