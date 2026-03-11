"use client";

import { useRouter } from "next/navigation";
import { RotateCcw, Layers } from "lucide-react";

interface StudyCompletedModalProps {
    deckId: string;
    onStudyAgain: () => void;
    onClose: () => void;
}

export default function StudyCompletedModal({ deckId, onStudyAgain, onClose }: StudyCompletedModalProps) {
    const router = useRouter();

    function handleBackToDeck() {
        router.push(`/explore/flashcards/${deckId}`);
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)] text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent-green)]/20 flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-8 h-8 text-[var(--accent-green)]" />
                </div>

                <h3 className="text-xl font-bold text-[var(--heading-text)] mb-2">
                    Deck Completed
                </h3>
                <p className="text-sm text-[var(--paragraph-text)] mb-6">
                    You finished all flashcards in this deck.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={handleBackToDeck}
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        Back to Deck
                    </button>
                    <button
                        onClick={onStudyAgain}
                        className="px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md inline-flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Study Again
                    </button>
                </div>
            </div>
        </div>
    );
}
