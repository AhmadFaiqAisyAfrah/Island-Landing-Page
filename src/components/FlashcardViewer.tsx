"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { getClientAuth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Flashcard {
    question: string;
    answer: string;
}

interface FlashcardViewerProps {
    title: string;
    initialCards: Flashcard[];
}

type ModalType = "add" | "edit" | null;

export default function FlashcardViewer({ title, initialCards }: FlashcardViewerProps) {
    const [cards, setCards] = useState<Flashcard[]>(initialCards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Modal state
    const [modalType, setModalType] = useState<ModalType>(null);
    const [modalQuestion, setModalQuestion] = useState("");
    const [modalAnswer, setModalAnswer] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Load saved deck from Firestore when auth state resolves
    useEffect(() => {
        const auth = getClientAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;
            try {
                const docRef = doc(db, "users", user.uid, "flashcardDeck", "main");
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    if (data.cards && data.cards.length > 0) {
                        setCards(data.cards);
                        setCurrentIndex(0);
                        setIsFlipped(false);
                        console.log("Loaded deck from Firestore:", data.cards.length, "cards");
                    }
                }
            } catch (error) {
                console.error("Error loading deck:", error);
            }
        });
        return () => unsubscribe();
    }, []);

    const card = cards[currentIndex];

    const handleFlip = useCallback(() => setIsFlipped((prev) => !prev), []);

    function handlePrevious() {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    }

    function handleNext() {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }

    // --- Add ---
    function openAddModal() {
        setModalQuestion("");
        setModalAnswer("");
        setModalType("add");
    }

    function handleAdd() {
        if (!modalQuestion.trim() || !modalAnswer.trim()) return;
        const newCards = [...cards, { question: modalQuestion.trim(), answer: modalAnswer.trim() }];
        setCards(newCards);
        setCurrentIndex(newCards.length - 1);
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
        const updated = [...cards];
        updated[currentIndex] = { question: modalQuestion.trim(), answer: modalAnswer.trim() };
        setCards(updated);
        setIsFlipped(false);
        setModalType(null);
    }

    // --- Delete ---
    function handleDelete() {
        const newCards = cards.filter((_, i) => i !== currentIndex);
        setCards(newCards);
        setCurrentIndex((prev) => Math.min(prev, newCards.length - 1));
        setIsFlipped(false);
        setShowDeleteConfirm(false);
    }

    const isEmpty = cards.length === 0;

    return (
        <div className="w-full max-w-[600px] mx-auto">
            {/* Deck Title + Counter */}
            <div className="flex items-center justify-between mb-6">
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
                <div className="w-full aspect-[4/3] rounded-3xl bg-[var(--card-bg)] border border-dashed border-[var(--border-color)] flex flex-col items-center justify-center p-8">
                    <p className="text-[var(--paragraph-text)] mb-4">No flashcards yet</p>
                    <button
                        onClick={openAddModal}
                        className="px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors"
                    >
                        Add your first card
                    </button>
                </div>
            ) : (
                <>
                    <div
                        className="relative w-full aspect-[4/3] cursor-pointer select-none"
                        style={{ perspective: "1000px" }}
                        onClick={handleFlip}
                        role="button"
                        tabIndex={0}
                        aria-label={isFlipped ? "Showing answer, click to show question" : "Showing question, click to show answer"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleFlip(); }
                            if (e.key === "ArrowLeft") handlePrevious();
                            if (e.key === "ArrowRight") handleNext();
                        }}
                    >
                        <div
                            className="relative w-full h-full transition-transform duration-500"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            }}
                        >
                            {/* Front (Question) */}
                            <div
                                className="absolute inset-0 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_12px_36px_rgba(8,15,26,0.12)] flex flex-col items-center justify-center p-8 md:p-12"
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-green)] mb-4">
                                    Question
                                </span>
                                <p className="text-xl md:text-2xl font-semibold text-[var(--heading-text)] text-center leading-relaxed">
                                    {card.question}
                                </p>
                                <span className="mt-6 text-xs text-[var(--paragraph-text)] opacity-60">
                                    Tap to reveal answer
                                </span>
                            </div>

                            {/* Back (Answer) */}
                            <div
                                className="absolute inset-0 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_12px_36px_rgba(8,15,26,0.12)] flex flex-col items-center justify-center p-8 md:p-12"
                                style={{
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                }}
                            >
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-4">
                                    Answer
                                </span>
                                <p className="text-lg md:text-xl text-[var(--heading-text)] text-center leading-relaxed">
                                    {card.answer}
                                </p>
                                <span className="mt-6 text-xs text-[var(--paragraph-text)] opacity-60">
                                    Tap to see question
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation: Previous / Flip / Next */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={handlePrevious}
                            className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors shadow-sm"
                            aria-label="Previous card"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleFlip}
                            className="px-6 py-3 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
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

                    {/* Edit / Delete / Reset row */}
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <button
                            onClick={openEditModal}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                            Edit
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                        </button>
                        <button
                            onClick={() => { setIsFlipped(false); setCurrentIndex(0); }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Reset
                        </button>
                    </div>
                </>
            )}

            {/* Add Card + Save Deck buttons */}
            <div className="flex flex-col items-center gap-3 mt-6">
                <button
                    onClick={openAddModal}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    Add Card
                </button>
                <button
                    onClick={async () => {
                        const auth = getClientAuth();
                        const user = auth.currentUser;
                        if (!user) {
                            setShowAuthModal(true);
                            return;
                        }
                        try {
                            console.log("Saving cards:", cards);
                            await setDoc(
                                doc(db, "users", user.uid, "flashcardDeck", "main"),
                                {
                                    cards: cards,
                                    updatedAt: Date.now(),
                                }
                            );
                            console.log("Deck saved successfully");
                        } catch (error) {
                            console.error("Error saving deck:", error);
                        }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                >
                    <Save className="w-4 h-4" />
                    Save Deck
                </button>
            </div>

            {/* Keyboard hint */}
            {!isEmpty && (
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
                        {/* Close */}
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

            {/* Auth Modal */}
            {showAuthModal && (
                <AuthModal onClose={() => setShowAuthModal(false)} />
            )}
        </div>
    );
}
