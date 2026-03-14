"use client";

import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";

interface StudyCompletedModalProps {
    deckId?: string;
    deckTitle?: string;
    masteredCount: number;
    reviewCount: number;
    onStudyReviewCards?: () => void;
    onStudyAgain: () => void;
    onClose: () => void;
}

export default function StudyCompletedModal({
    deckId,
    deckTitle,
    masteredCount,
    reviewCount,
    onStudyReviewCards,
    onStudyAgain,
    onClose,
}: StudyCompletedModalProps) {
    const router = useRouter();

    function handleBackToDeck() {
        onClose();
        if (deckId) {
            router.replace(`/explore/flashcards/${deckId}`);
        } else {
            router.replace("/explore/flashcards");
        }
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
                <div className="w-20 h-20 rounded-[20px] bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4 text-4xl">
                    <span aria-hidden="true">🎉</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--heading-text)] mb-2">
                    Deck Completed!
                </h3>
                <p className="text-sm text-[var(--paragraph-text)] mb-6">
                    You finished all flashcards in this deck.
                </p>

                <div className="mb-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 text-left">
                    <p className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)] mb-3">Study Summary</p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-xl bg-[color:color-mix(in_srgb,var(--card-bg)_88%,transparent)] px-3 py-2">
                            <span className="text-sm font-medium text-[#4ade80]">✓ Mastered</span>
                            <span className="text-sm font-semibold text-[var(--heading-text)]">{masteredCount} cards</span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-[color:color-mix(in_srgb,var(--card-bg)_88%,transparent)] px-3 py-2">
                            <span className="text-sm font-medium text-[#f59e0b]">↺ Needs Review</span>
                            <span className="text-sm font-semibold text-[var(--heading-text)]">{reviewCount} cards</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            handleBackToDeck();
                        }}
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                    >
                        {deckTitle ? `Back to ${deckTitle}` : "Back to Deck"}
                    </button>
                    {reviewCount > 0 && onStudyReviewCards && (
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                onStudyReviewCards();
                            }}
                            className="px-5 py-2.5 rounded-full bg-[#f59e0b] text-white text-sm font-medium hover:bg-[#e89c08] transition-colors shadow-md"
                        >
                            Study Review Cards
                        </button>
                    )}
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            onStudyAgain();
                        }}
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
