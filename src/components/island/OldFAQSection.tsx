"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "Is Island free to use?",
        a: "Yes! Island is completely free to download and use. Focus sessions, the calendar, and white noise are all available at no cost. Optional in-app purchases let you get extra coins to decorate your island faster.",
    },
    {
        q: "Does Island collect my data?",
        a: "No. All your focus data, island progress, and settings are stored locally on your device. We don't have servers that track your activity. Your productivity is your business.",
    },
    {
        q: "How do Island Coins work?",
        a: "You earn coins by completing focus sessions. The longer you focus, the more coins you earn. Spend them on trees, buildings, decorations, and unlocking new island areas. You can also purchase coin bundles through Google Play.",
    },
    {
        q: "Can I use Island offline?",
        a: "Absolutely. Island works completely offline. The timer, white noise, and all island features work without an internet connection. You only need internet for in-app purchases.",
    },
    {
        q: "How do I delete my data?",
        a: "Since all data is stored locally on your device, you can clear it by clearing the app's data in your device settings, or by uninstalling the app. See our Data Deletion Guide for step-by-step instructions.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-gray-50 dark:bg-[#0B1E2D]">
            <div className="mx-auto max-w-3xl px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-14">
                    <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        💬 Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                        Frequently asked questions
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl bg-white dark:bg-[#132A3E] border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-500/30 hover:shadow-lg"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                >
                                    <span className="font-medium text-gray-900 dark:text-white pr-4">
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 dark:text-white/50 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
