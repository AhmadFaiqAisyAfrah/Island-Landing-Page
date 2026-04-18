interface TrustCard {
    emoji: string;
    title: string;
    desc: string;
    bgColor: string;
}

const cards: TrustCard[] = [
    {
        emoji: "📱",
        title: "Your data stays on your device",
        desc: "Focus sessions, island progress, coins, preferences, and calendar data are stored locally. We do not upload your productivity data to our servers.",
        bgColor: "bg-emerald-100",
    },
    {
        emoji: "🔑",
        title: "Secure Google Sign-In",
        desc: "Sign in securely using Google via Firebase Authentication. Your account data is used only for authentication and personalization.",
        bgColor: "bg-blue-100",
    },
    {
        emoji: "📊",
        title: "Anonymous Usage Insights",
        desc: "We use Google Analytics for Firebase to understand general usage patterns — never to identify individual users.",
        bgColor: "bg-emerald-100",
    },
    {
        emoji: "🛡️",
        title: "Encrypted & Protected",
        desc: "All communications use secure HTTPS/TLS encryption. Firebase and Google services follow industry-grade security standards.",
        bgColor: "bg-purple-100",
    },
    {
        emoji: "💳",
        title: "Payments by Google Play",
        desc: "All purchases are processed securely by Google Play Billing. We never access your credit card or financial information.",
        bgColor: "bg-amber-100",
    },
];

function Card({ card }: { card: TrustCard; delay: number }) {
    return (
        <div
            className="rounded-2xl bg-white border border-gray-200 p-8 hover:shadow-lg transition-all duration-300"
        >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${card.bgColor} mb-5`}>
                <span className="text-2xl">{card.emoji}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {card.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
                {card.desc}
            </p>
        </div>
    );
}

export default function TransparencySection() {
    const topRow = cards.slice(0, 3);
    const bottomRow = cards.slice(3);

    return (
        <section id="transparency" className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center space-y-4 mb-14">
                    <span className="inline-block rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-medium text-emerald-700">
                        🔒 Transparency
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Built on trust
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        We respect your privacy and keep things simple and honest.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {topRow.map((card, i) => (
                        <Card key={card.title} card={card} delay={i * 100} />
                    ))}
                </div>

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
