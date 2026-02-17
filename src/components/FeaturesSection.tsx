const features = [
    {
        emoji: "⏱️",
        title: "Focus Sessions",
        desc: "Customizable Pomodoro timer that keeps you in the zone. Every session brings new growth to your island.",
        color: "bg-pastel-green/20",
    },
    {
        emoji: "🏷️",
        title: "Label Your Sessions",
        desc: "Organize your focus time with custom tags like Study, Work, Reading, or Mindfulness.",
        color: "bg-[rgba(95,191,143,0.12)]",
    },
    {
        emoji: "🪙",
        title: "Earn Island Coins",
        desc: "Complete focus sessions to earn coins. Use them to unlock decorations, trees, and buildings.",
        color: "bg-pastel-sand/30",
    },
    {
        emoji: "🏝️",
        title: "Expand Your Island",
        desc: "Watch your island grow as your focus grows. Unlock new areas and customize your peaceful paradise.",
        color: "bg-pastel-blue/20",
    },
    {
        emoji: "📅",
        title: "Visual Calendar",
        desc: "Track your progress with a beautiful visual calendar. See your streaks and celebrate consistency.",
        color: "bg-pastel-green/20",
    },
    {
        emoji: "🎧",
        title: "White Noise",
        desc: "Ambient sounds to help you focus — rain, waves, forest, and more. Create your perfect soundscape.",
        color: "bg-pastel-blue/20",
    },
    {
        emoji: "🔔",
        title: "Gentle Reminders",
        desc: "Stay consistent with calm, non-intrusive reminders for your focus sessions.",
        color: "bg-[rgba(255,184,77,0.15)]",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-16 bg-cream">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <span className="inline-block rounded-full bg-pastel-blue/30 px-4 py-1.5 text-xs font-medium text-pastel-blue-deep">
                        ✨ Everything you need
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-dark">
                        Simple tools for a focused life
                    </h2>
                    <p className="text-text-muted max-w-lg mx-auto">
                        No overwhelming features. Just what you need to build a calm, productive routine.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="group rounded-2xl bg-white/70 backdrop-blur-sm border border-pastel-green/10 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div
                                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.color} mb-4`}
                            >
                                <span className="text-[28px] leading-none">{f.emoji}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-text-dark mb-2">
                                {f.title}
                            </h3>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
