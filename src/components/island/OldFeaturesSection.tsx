import {
    Timer,
    Hash,
    Coins,
    Map,
    CalendarDays,
    Headphones,
    Bell,
} from "lucide-react";

const features = [
    {
        icon: Timer,
        title: "Focus Sessions",
        desc: "Customizable Pomodoro timer that keeps you in the zone. Every session brings new growth to your island.",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
        iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
        icon: Hash,
        title: "Label Your Sessions",
        desc: "Organize your focus time with custom tags like Study, Work, Reading, or Mindfulness.",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
        iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
        icon: Coins,
        title: "Earn Island Coins",
        desc: "Complete focus sessions to earn coins. Use them to unlock decorations, trees, and buildings.",
        bgColor: "bg-amber-100 dark:bg-amber-900/20",
        iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
        icon: Map,
        title: "Expand Your Island",
        desc: "Watch your island grow as your focus grows. Unlock new areas and customize your peaceful paradise.",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
        icon: CalendarDays,
        title: "Visual Calendar",
        desc: "Track your progress with a beautiful visual calendar. See your streaks and celebrate consistency.",
        bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
        iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
        icon: Headphones,
        title: "White Noise",
        desc: "Ambient sounds to help you focus — rain, waves, forest, and more. Create your perfect soundscape.",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
        icon: Bell,
        title: "Gentle Reminders",
        desc: "Stay consistent with calm, non-intrusive reminders for your focus sessions.",
        bgColor: "bg-amber-100 dark:bg-amber-900/20",
        iconColor: "text-amber-600 dark:text-amber-400",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-gray-50 dark:bg-[#0a1520]">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                        ✨ Everything you need
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Simple tools for a focused life
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                        No overwhelming features. Just what you need to build a calm, productive routine.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="group rounded-2xl bg-white dark:bg-[#132A3E] border border-gray-200 dark:border-white/10 p-7 hover:shadow-lg dark:hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div
                                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.bgColor} mb-4`}
                            >
                                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {f.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
