export default function TransparencySection() {
    return (
        <section id="transparency" className="py-24 bg-white dark:bg-[#0B1E2D]">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-14">
                    <span className="inline-block rounded-full bg-amber-100 dark:bg-amber-900/30 px-4 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                        🔒 Transparency
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Built on trust
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                        We respect your privacy and keep things simple and honest.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[
                        {
                            icon: (
                                <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            ),
                            title: "Your data stays with you",
                            desc: "All focus progress, island data, and settings are stored locally on your device. We don't track your productivity habits.",
                            bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
                        },
                        {
                            icon: (
                                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            ),
                            title: "Secure purchases",
                            desc: "All in-app purchases are handled securely through Google Play's billing system. No credit card info ever touches our servers.",
                            bgColor: "bg-blue-100 dark:bg-blue-900/20",
                        },
                    ].map((card, i) => (
                        <div
                            key={card.title}
                            className="rounded-2xl bg-white dark:bg-[#132A3E] border border-gray-200 dark:border-white/10 p-8 hover:shadow-lg dark:hover:border-emerald-500/30 transition-all duration-300"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${card.bgColor} mb-5`}>
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
