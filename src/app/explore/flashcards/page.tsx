import { Metadata } from "next";
import Link from "next/link";
import FlashcardViewer from "@/components/FlashcardViewer";
import MonetagInPagePush from "@/components/MonetagInPagePush";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Study Flashcards Online – Active Recall & Spaced Repetition | Island",
    description:
        "Free online flashcards for effective studying. Use active recall and spaced repetition to memorize concepts faster with Island study tools.",
    keywords: [
        "flashcards online",
        "study flashcards",
        "active recall",
        "spaced repetition",
        "study tools",
        "memorization tool",
    ],
    openGraph: {
        title: "Study Flashcards Online – Active Recall & Spaced Repetition | Island",
        description:
            "Free online flashcards for effective studying. Use active recall and spaced repetition to memorize concepts faster with Island study tools.",
        type: "website",
        url: "https://islandapp.id/explore/flashcards",
    },
};

const studyTechniquesCards = [
    {
        question: "What is the Pomodoro Technique?",
        answer: "A time management method that uses focused work sessions followed by short breaks.",
    },
    {
        question: "What improves memory retention?",
        answer: "Spaced repetition and active recall.",
    },
    {
        question: "Why are breaks important during studying?",
        answer: "They reduce cognitive fatigue and improve concentration.",
    },
];

export default function FlashcardsPage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-[900px] mx-auto px-6">
                {/* Back link */}
                <div className="mb-8">
                    <Link
                        href="/explore"
                        className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Study Tools
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-4 block">
                        Island Flashcards
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--heading-text)] mb-6 tracking-tight">
                        Study Flashcards Online
                    </h1>
                    <p className="text-xl text-[var(--paragraph-text)] max-w-2xl mx-auto leading-relaxed">
                        Tap a card to reveal the answer. Use flashcards to improve memory retention through active recall.
                    </p>
                </div>

                <MonetagInPagePush />

                {/* Flashcard Viewer */}
                <div className="pb-24">
                    <FlashcardViewer
                        title="Study Techniques"
                        initialCards={studyTechniquesCards}
                    />
                </div>

                {/* SEO Content */}
                <section className="max-w-[700px] mx-auto pb-24 space-y-12 text-[var(--paragraph-text)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What are Flashcards?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Flashcards are a simple but powerful study tool that display a question on one side and the answer on the other. By testing yourself with flashcards, you engage in active recall — one of the most effective learning strategies backed by cognitive science research.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why use Island Flashcards?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Island Flashcards provide a distraction-free environment optimized for studying. Combined with our Pomodoro Timer, you can structure focused study sessions with timed flashcard reviews — helping you retain information more effectively and build sustainable study habits.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
