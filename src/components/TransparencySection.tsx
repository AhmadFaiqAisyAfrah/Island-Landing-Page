interface TrustCard {
    emoji: string;
    title: string;
    desc: string;
    color: string;
}

const cards: TrustCard[] = [
    {
        emoji: "📱",
        title: "Your data stays on your device",
        desc: "Focus sessions, island progress, coins, preferences, and calendar data are stored locally. We do not upload your productivity data to our servers.",
        color: "bg-[rgba(95,191,143,0.12)]",
    },
    {
        emoji: "🔑",
        title: "Secure Google Sign-In (Optional)",
        desc: "Sign in securely using Google via Firebase Authentication. Your account data is used only for authentication and personalization.",
        color: "bg-[rgba(120,170,255,0.12)]",
    },
    {
        emoji: "📊",
        title: "Anonymous Usage Insights",
        desc: "We use Google Analytics for Firebase to understand general usage patterns — never to identify individual users.",
        color: "bg-[rgba(95,191,143,0.10)]",
    },
    {
        emoji: "🛡️",
        title: "Encrypted & Protected",
        desc: "All communications use secure HTTPS/TLS encryption. Firebase and Google services follow industry-grade security standards.",
        color: "bg-[rgba(120,130,200,0.12)]",
    },
    {
        emoji: "💳",
        title: "Payments handled by Google Play",
        desc: "All purchases are processed securely by Google Play Billing. We never access your credit card or financial information.",
        color: "bg-[rgba(255,184,77,0.15)]",
    },
];

function Card({ card, delay }: { card: TrustCard; delay: number }) {
    return (
        <div
            className="rounded-2xl bg-white/70 backdrop-blur-sm border border-pastel-green/10 p-8 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${card.color} mb-5`}
            >
                <span className="text-[28px] leading-none">{card.emoji}</span>
            </div>
            <h3 className="text-xl font-semibold text-text-dark mb-3">
                {card.title}
            </h3>
            <p className="text-text-muted leading-relaxed">{card.desc}</p>
        </div>
    );
}

export default function TransparencySection() {
    const topRow = cards.slice(0, 3);
    const bottomRow = cards.slice(3);

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

                {/* Top row — 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {topRow.map((card, i) => (
                        <Card key={card.title} card={card} delay={i * 100} />
                    ))}
                </div>

                {/* Bottom row — 2 cards, centered, matching top card width */}
                <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-5xl mx-auto mt-8">
                    {bottomRow.map((card, i) => (
                        <div key={card.title} className="flex-1 sm:max-w-[calc((100%-2rem)/2)] lg:max-w-[calc((100%-4rem)/3)]">
                            <Card card={card} delay={(i + 3) * 100} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
