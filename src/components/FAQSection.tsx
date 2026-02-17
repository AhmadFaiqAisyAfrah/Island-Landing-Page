"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "Is Island free to use?",
        a: "Yes. Focus sessions, the calendar, white noise, and island building are all free. Optional in-app purchases let you buy extra coins or remove ads, but they're never required.",
    },
    {
        q: "What data does Island collect?",
        a: "Almost nothing. Your focus sessions, island progress, coins, and preferences are stored locally on your device. If you sign in with Google, basic account info is stored in Firebase for authentication only. We never track your productivity habits.",
    },
    {
        q: "Do I need to sign in with Google?",
        a: "No. Google Sign-In is completely optional. You can use every feature of Island without creating an account. Signing in only enables cloud-based personalization.",
    },
    {
        q: "How do Island Coins work?",
        a: "You earn coins by completing focus sessions — the longer you focus, the more you earn. Spend them on trees, buildings, and decorations for your island. You can also buy coin bundles via Google Play.",
    },
    {
        q: "Can I use Island offline?",
        a: "Yes. The timer, white noise, island features, and session tags all work without an internet connection. You only need internet for in-app purchases or optional Google Sign-In.",
    },
    {
        q: "How do I delete my data?",
        a: "Go to your device settings, select Island, and tap \"Clear Data\" — or simply uninstall the app. If you signed in with Google, you can also request Firebase account deletion. See our Data Deletion page for step-by-step instructions.",
    },
    {
        q: "How do purchases and refunds work?",
        a: "All purchases are processed securely by Google Play Billing. We never see your payment details. For refunds, contact Google Play Support directly through the Play Store.",
    },
    {
        q: "Does Island show ads?",
        a: "Island shows non-intrusive ads via Google AdMob. You can remove all ads permanently with a one-time \"Remove Ads\" purchase. No personal data is shared with advertisers.",
    },
    {
        q: "What happens if I uninstall Island?",
        a: "Since your data is stored locally, uninstalling the app removes all focus history, coins, island progress, and preferences. Purchased items (coins, Remove Ads) can be restored through Google Play after reinstalling.",
    },
    {
        q: "Is my data safe?",
        a: "Yes. All communication uses HTTPS/TLS encryption. Firebase and Google services follow industry-grade security standards. We never sell, share, or monetize your personal data.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-gradient-to-b from-cream to-cream-dark">
            <div className="mx-auto max-w-3xl px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-14">
                    <span className="inline-block rounded-full bg-pastel-green/30 px-4 py-1.5 text-xs font-medium text-pastel-green-deep">
                        💬 Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-dark">
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
                                className="rounded-2xl bg-white/70 backdrop-blur-sm border border-pastel-green/10 overflow-hidden transition-shadow hover:shadow-md"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                >
                                    <span className="font-medium text-text-dark pr-4">
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-5 text-sm text-text-muted leading-relaxed">
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
