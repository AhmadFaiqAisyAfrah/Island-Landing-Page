"use client";

import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Plus, Pencil, Trash2, X } from "lucide-react";
import TinderCard from "react-tinder-card";
import StudyCompletedModal from "@/components/StudyCompletedModal";

interface Flashcard {
    id?: string;
    question: string;
    answer: string;
}

interface FlashcardViewerProps {
    title: string;
    deckId: string;
    cards: Flashcard[];
    studyMode?: boolean;
    onAddCard?: (question: string, answer: string) => void;
    onEditCard?: (index: number, question: string, answer: string) => void;
    onDeleteCard?: (index: number) => void;
}

type ModalType = "add" | "edit" | null;

export default function FlashcardViewer({
    title,
    deckId,
    cards,
    studyMode = false,
    onAddCard,
    onEditCard,
    onDeleteCard,
}: FlashcardViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [studyCompleted, setStudyCompleted] = useState(false);
    const [cardStatus, setCardStatus] = useState<Record<number, "review" | "mastered" | null>>({});
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

    // Modal state
    const [modalType, setModalType] = useState<ModalType>(null);
    const [modalQuestion, setModalQuestion] = useState("");
    const [modalAnswer, setModalAnswer] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const card = cards[currentIndex];

    const handleFlip = useCallback(() => setIsFlipped((prev) => !prev), []);

    function handlePrevious() {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    }

    function handleNext() {
        setIsFlipped(false);
        if (currentIndex === cards.length - 1) {
            setStudyCompleted(true);
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    }

    function handleStudyAgain() {
        setCurrentIndex(0);
        setIsFlipped(false);
        setStudyCompleted(false);
        setCardStatus({});
    }

    const markCard = useCallback((status: "review" | "mastered") => {
        setCardStatus((prev) => {
            if (prev[currentIndex] === status) return prev;
            return {
                ...prev,
                [currentIndex]: status,
            };
        });
    }, [currentIndex]);

    const masteredCount = Object.values(cardStatus).filter((value) => value === "mastered").length;
    const reviewCount = Object.values(cardStatus).filter((value) => value === "review").length;
    function handleSwipe(direction: string) {
        if (!studyMode) return;

        setSwipeDirection(direction as "left" | "right");

        if (direction === "left") {
            markCard("review");
        }

        if (direction === "right") {
            markCard("mastered");
        }

        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setStudyCompleted(true);
        }

        setIsFlipped(false);
        setTimeout(() => setSwipeDirection(null), 220);
    }

    // --- Add ---
    function openAddModal() {
        setModalQuestion("");
        setModalAnswer("");
        setModalType("add");
    }

    function handleAdd() {
        if (!modalQuestion.trim() || !modalAnswer.trim()) return;
        onAddCard?.(modalQuestion.trim(), modalAnswer.trim());
        setCurrentIndex(cards.length); // will point to new last card
        setIsFlipped(false);
        setModalType(null);
    }

    // --- Edit ---
    function openEditModal() {
        setModalQuestion(card.question);
        setModalAnswer(card.answer);
        setModalType("edit");
    }

    function handleEdit() {
        if (!modalQuestion.trim() || !modalAnswer.trim()) return;
        onEditCard?.(currentIndex, modalQuestion.trim(), modalAnswer.trim());
        setIsFlipped(false);
        setModalType(null);
    }

    // --- Delete ---
    function handleDelete() {
        onDeleteCard?.(currentIndex);
        setCurrentIndex((prev) => Math.max(0, Math.min(prev, cards.length - 2)));
        setIsFlipped(false);
        setShowDeleteConfirm(false);
    }

    const isEmpty = cards.length === 0;

    return (
        <div className={`${studyMode ? "w-full flex flex-col items-center justify-center min-h-[75vh]" : "w-full max-w-[600px] mx-auto"}`}>
            {/* Deck Title + Counter */}
            <div className={`flex items-center justify-between mb-6 ${studyMode ? "w-full max-w-4xl" : ""}`}>
                <h2 className="text-xl font-bold text-[var(--heading-text)]">
                    {title}
                </h2>
                {!isEmpty && (
                    <span className="text-sm font-medium text-[var(--paragraph-text)] bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-color)]">
                        {currentIndex + 1} / {cards.length}
                    </span>
                )}
            </div>

            {/* Flip Card or Empty State */}
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-[var(--paragraph-text)] opacity-40" />
                    </div>
                    <p className="text-[var(--paragraph-text)] text-sm mb-4">No flashcards yet</p>
                    {onAddCard && (
                        <button
                            onClick={openAddModal}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                            Add Your First Card
                        </button>
                    )}
                </div>
            ) : (
                <>
                    {/* Card */}
                    {studyMode ? (
                        <div className="flex justify-center items-center w-full">
                            <div className="relative w-full max-w-4xl mx-auto h-[420px] flex items-center justify-center">
                                <div className="absolute inset-0 grid grid-cols-3 rounded-3xl overflow-hidden pointer-events-none">
                                    <div className="flex items-center justify-center bg-yellow-400 text-black font-semibold">
                                        Review
                                    </div>
                                    <div />
                                    <div className="flex items-center justify-center bg-green-500 text-black font-semibold">
                                        Mastered
                                    </div>
                                </div>

                                <div className="relative z-10 w-full max-w-2xl h-[420px] flex items-center justify-center">
                                    <TinderCard
                                        key={currentIndex}
                                        onSwipe={handleSwipe}
                                        preventSwipe={["up", "down"]}
                                        className="absolute"
                                    >
                                        <div
                                            onClick={handleFlip}
                                            className={`w-full max-w-2xl h-[420px] flex items-center justify-center text-center px-16 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_12px_32px_rgba(8,15,26,0.12)] relative overflow-hidden transition-all duration-300 ${swipeDirection === "right" ? "border-green-500 border-2" : swipeDirection === "left" ? "border-yellow-500 border-2" : ""}`}
                                        >
                                            {/* Swipe feedback overlay */}
                                            {swipeDirection === "right" && (
                                                <div className="absolute inset-0 bg-green-500/20 rounded-3xl flex items-center justify-center z-10">
                                                    <span className="text-green-500 font-bold text-2xl transform -rotate-12">MASTERED</span>
                                                </div>
                                            )}
                                            {swipeDirection === "left" && (
                                                <div className="absolute inset-0 bg-yellow-500/20 rounded-3xl flex items-center justify-center z-10">
                                                    <span className="text-yellow-500 font-bold text-2xl transform rotate-12">REVIEW</span>
                                                </div>
                                            )}

                                            {/* Side indicator */}
                                            <span className="absolute top-4 left-5 text-xs font-semibold tracking-wider uppercase text-[var(--paragraph-text)] opacity-40">
                                                {isFlipped ? "Answer" : "Question"}
                                            </span>

                                            {/* Text wrapper */}
                                            <div className="max-w-2xl">
                                                <p className="text-xl md:text-2xl font-semibold text-[var(--heading-text)] leading-relaxed break-words">
                                                    {isFlipped ? card.answer : card.question}
                                                </p>
                                            </div>

                                            <span className="absolute bottom-4 text-xs text-[var(--paragraph-text)] opacity-30">
                                                Swipe left (review) or right (mastered)
                                            </span>
                                        </div>
                                    </TinderCard>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleFlip}
                            className="w-full min-h-[260px] rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_12px_32px_rgba(8,15,26,0.12)] p-8 cursor-pointer transition-all duration-300 hover:shadow-[0_16px_40px_rgba(8,15,26,0.18)] hover:-translate-y-0.5 flex flex-col items-center justify-center text-center relative overflow-hidden group"
                        >
                            {/* Side indicator */}
                            <span className="absolute top-4 left-5 text-xs font-semibold tracking-wider uppercase text-[var(--paragraph-text)] opacity-40">
                                {isFlipped ? "Answer" : "Question"}
                            </span>

                            <p className="text-lg md:text-xl font-semibold text-[var(--heading-text)] leading-relaxed max-w-[90%]">
                                {isFlipped ? card.answer : card.question}
                            </p>

                            <span className="absolute bottom-4 text-xs text-[var(--paragraph-text)] opacity-30 group-hover:opacity-50 transition-opacity">
                                Tap to {isFlipped ? "see question" : "reveal answer"}
                            </span>
                        </button>
                    )}

                    {/* Navigation + Flip */}
                    {studyMode ? (
                        <div className="flex flex-col items-center gap-4 mt-4">
                            {/* Navigation row */}
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={handlePrevious}
                                    className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
                                    aria-label="Previous card"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={handleFlip}
                                    className="px-8 py-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm font-medium text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
                                >
                                    Flip
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
                                    aria-label="Next card"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Study progress stats */}
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-green-500 font-medium">{masteredCount} mastered</span>
                                <span className="text-[var(--border-color)]">|</span>
                                <span className="text-sm text-yellow-500 font-medium">{reviewCount} review</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button
                                onClick={handlePrevious}
                                className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
                                aria-label="Previous card"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleFlip}
                                className="px-6 py-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm font-medium text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
                            >
                                Flip
                            </button>

                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
                                aria-label="Next card"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Edit / Delete / Reset row - hidden in study mode */}
                    {!studyMode && (
                    <div className="flex items-center justify-center gap-3 mt-4">
                        {onEditCard && (
                            <button
                                onClick={openEditModal}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                Edit
                            </button>
                        )}
                        {onDeleteCard && (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                            </button>
                        )}
                        <button
                            onClick={() => { setIsFlipped(false); setCurrentIndex(0); }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reset
                        </button>
                    </div>
                    )}
                </>
            )}

            {/* Add Card button - hidden in study mode */}
            {onAddCard && !isEmpty && !studyMode && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={openAddModal}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Add Card
                    </button>
                </div>
            )}

            {/* Keyboard hint */}
            {!isEmpty && !studyMode && (
                <p className="text-center text-xs text-[var(--paragraph-text)] opacity-50 mt-4 hidden md:block">
                    Use ← → arrow keys to navigate, Enter to flip
                </p>
            )}

            {/* ══════ Add / Edit Modal ══════ */}
            {modalType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div
                        className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setModalType(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--paragraph-text)] hover:text-[var(--heading-text)] transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <h3 className="text-xl font-bold text-[var(--heading-text)] mb-6">
                            {modalType === "add" ? "Add New Card" : "Edit Card"}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--paragraph-text)] mb-1.5">
                                    Question
                                </label>
                                <textarea
                                    value={modalQuestion}
                                    onChange={(e) => setModalQuestion(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:border-transparent transition-shadow"
                                    placeholder="Enter your question..."
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--paragraph-text)] mb-1.5">
                                    Answer
                                </label>
                                <textarea
                                    value={modalAnswer}
                                    onChange={(e) => setModalAnswer(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:border-transparent transition-shadow"
                                    placeholder="Enter the answer..."
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                                onClick={() => setModalType(null)}
                                className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={modalType === "add" ? handleAdd : handleEdit}
                                disabled={!modalQuestion.trim() || !modalAnswer.trim()}
                                className="px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {modalType === "add" ? "Save" : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════ Delete Confirmation ══════ */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div
                        className="w-full max-w-sm bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)] text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-[var(--heading-text)] mb-2">
                            Delete this flashcard?
                        </h3>
                        <p className="text-sm text-[var(--paragraph-text)] mb-6">
                            Are you sure you want to delete this flashcard? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2.5 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════ Study Completed Modal ══════ */}
            {studyCompleted && (
                <StudyCompletedModal
                    deckId={deckId}
                    onStudyAgain={handleStudyAgain}
                    onClose={() => setStudyCompleted(false)}
                />
            )}
        </div>
    );
}
