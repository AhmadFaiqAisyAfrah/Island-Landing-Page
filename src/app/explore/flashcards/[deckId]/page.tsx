"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Play, Pencil, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getClientAuth, db } from "@/lib/firebase";
import {
    doc, getDoc, updateDoc, deleteDoc,
    collection, query, orderBy, getDocs, addDoc,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import FlashcardViewer from "@/components/FlashcardViewer";
import AuthModal from "@/components/AuthModal";

interface Card {
    id: string;
    question: string;
    answer: string;
}

export default function DeckDetailPage() {
    const params = useParams();
    const router = useRouter();
    const deckId = params.deckId as string;

    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [deckTitle, setDeckTitle] = useState("");
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    const [studyMode, setStudyMode] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Rename
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [renameValue, setRenameValue] = useState("");

    // Delete deck
    const [showDeleteDeck, setShowDeleteDeck] = useState(false);

    // Auth
    useEffect(() => {
        const auth = getClientAuth();
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return () => unsub();
    }, []);

    // Fetch deck + cards
    const fetchDeck = useCallback(async (uid: string) => {
        setLoading(true);
        try {
            const deckRef = doc(db, "users", uid, "flashcardDecks", deckId);
            const deckSnap = await getDoc(deckRef);
            if (!deckSnap.exists()) {
                router.push("/explore/flashcards");
                return;
            }
            setDeckTitle(deckSnap.data().title);

            const cardsRef = collection(db, "users", uid, "flashcardDecks", deckId, "cards");
            const cardsQ = query(cardsRef, orderBy("createdAt", "asc"));
            const cardsSnap = await getDocs(cardsQ);
            setCards(cardsSnap.docs.map((d) => ({
                id: d.id,
                question: d.data().question,
                answer: d.data().answer,
            })));
        } catch (err) {
            console.error("Error loading deck:", err);
        }
        setLoading(false);
    }, [deckId, router]);

    useEffect(() => {
        if (authLoading || !user) return;
        fetchDeck(user.uid);
    }, [user, authLoading, fetchDeck]);

    // --- CRUD ---
    async function handleAddCard(question: string, answer: string) {
        if (!user) return;
        try {
            const cardsRef = collection(db, "users", user.uid, "flashcardDecks", deckId, "cards");
            await addDoc(cardsRef, { question, answer, createdAt: Date.now() });
            await updateDoc(doc(db, "users", user.uid, "flashcardDecks", deckId), { updatedAt: Date.now() });
            fetchDeck(user.uid);
        } catch (err) {
            console.error("Error adding card:", err);
        }
    }

    async function handleEditCard(index: number, question: string, answer: string) {
        if (!user) return;
        const card = cards[index];
        if (!card) return;
        try {
            await updateDoc(doc(db, "users", user.uid, "flashcardDecks", deckId, "cards", card.id), { question, answer });
            await updateDoc(doc(db, "users", user.uid, "flashcardDecks", deckId), { updatedAt: Date.now() });
            fetchDeck(user.uid);
        } catch (err) {
            console.error("Error editing card:", err);
        }
    }

    async function handleDeleteCard(index: number) {
        if (!user) return;
        const card = cards[index];
        if (!card) return;
        try {
            await deleteDoc(doc(db, "users", user.uid, "flashcardDecks", deckId, "cards", card.id));
            await updateDoc(doc(db, "users", user.uid, "flashcardDecks", deckId), { updatedAt: Date.now() });
            fetchDeck(user.uid);
        } catch (err) {
            console.error("Error deleting card:", err);
        }
    }

    // --- Deck actions ---
    async function handleRename() {
        if (!user || !renameValue.trim()) return;
        try {
            await updateDoc(doc(db, "users", user.uid, "flashcardDecks", deckId), {
                title: renameValue.trim(),
                updatedAt: Date.now(),
            });
            setDeckTitle(renameValue.trim());
            setShowRenameModal(false);
        } catch (err) {
            console.error("Error renaming deck:", err);
        }
    }

    async function handleDeleteDeck() {
        if (!user) return;
        try {
            // Delete all cards first
            const cardsSnap = await getDocs(collection(db, "users", user.uid, "flashcardDecks", deckId, "cards"));
            for (const d of cardsSnap.docs) {
                await deleteDoc(d.ref);
            }
            // Delete deck
            await deleteDoc(doc(db, "users", user.uid, "flashcardDecks", deckId));
            router.push("/explore/flashcards");
        } catch (err) {
            console.error("Error deleting deck:", err);
        }
    }

    // Auth gate
    if (!authLoading && !user) {
        return (
            <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
                <div className="max-w-[900px] mx-auto px-6 flex flex-col items-center justify-center py-20">
                    <p className="text-[var(--paragraph-text)] text-sm mb-4">Sign in to access your flashcards</p>
                    <button
                        onClick={() => setShowAuthModal(true)}
                        className="px-6 py-3 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                    >
                        Sign in with Google
                    </button>
                    {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
                </div>
            </div>
        );
    }

    if (loading || authLoading) {
        return (
            <div className="pt-24 min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--accent-green)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // --- Study mode ---
    if (studyMode) {
        return (
            <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
                <div className="max-w-[900px] mx-auto px-6">
                    <div className="mb-8">
                        <button
                            onClick={() => setStudyMode(false)}
                            className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Deck
                        </button>
                    </div>
                    <div className="pb-24">
                        <FlashcardViewer
                            title={deckTitle}
                            deckId={deckId}
                            cards={cards}
                            studyMode={studyMode}
                            onAddCard={handleAddCard}
                            onEditCard={handleEditCard}
                            onDeleteCard={handleDeleteCard}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // --- Card manager ---
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-[900px] mx-auto px-6">
                {/* Back */}
                <div className="mb-8">
                    <Link
                        href="/explore/flashcards"
                        className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Decks
                    </Link>
                </div>

                {/* Deck header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--heading-text)]">{deckTitle}</h1>
                        <p className="text-sm text-[var(--paragraph-text)] mt-1">
                            {cards.length} {cards.length === 1 ? "card" : "cards"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setStudyMode(true)}
                            disabled={cards.length === 0}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Play className="w-4 h-4" />
                            Study Mode
                        </button>
                        <button
                            onClick={() => { setRenameValue(deckTitle); setShowRenameModal(true); }}
                            className="px-4 py-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                        >
                            Rename
                        </button>
                        <button
                            onClick={() => setShowDeleteDeck(true)}
                            className="px-4 py-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* Card list */}
                <div className="space-y-3 pb-24">
                    {cards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-6 rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
                            <p className="text-[var(--paragraph-text)] text-sm mb-4">No cards yet. Add your first card to get started.</p>
                        </div>
                    ) : (
                        cards.map((card, i) => (
                            <div
                                key={card.id}
                                className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-5 flex items-start justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[var(--heading-text)] mb-1 truncate">
                                        {card.question}
                                    </p>
                                    <p className="text-xs text-[var(--paragraph-text)] truncate">
                                        {card.answer}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => handleEditCard(i, card.question, card.answer)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                                        aria-label="Edit card"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCard(i)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                        aria-label="Delete card"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Add Card inline form */}
                    <AddCardInline onAdd={handleAddCard} />
                </div>
            </div>

            {/* Rename Modal */}
            {showRenameModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowRenameModal(false)}>
                    <div className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)] relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowRenameModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--paragraph-text)] hover:text-[var(--heading-text)] transition-colors" aria-label="Close">
                            <X className="w-4 h-4" />
                        </button>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mb-6">Rename Deck</h3>
                        <input
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleRename(); }}
                            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:border-transparent transition-shadow"
                            autoFocus
                        />
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button onClick={() => setShowRenameModal(false)} className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors">Cancel</button>
                            <button onClick={handleRename} disabled={!renameValue.trim()} className="px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Deck Confirm */}
            {showDeleteDeck && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowDeleteDeck(false)}>
                    <div className="w-full max-w-sm bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)] text-center" onClick={(e) => e.stopPropagation()}>
                        <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-[var(--heading-text)] mb-2">Delete this deck?</h3>
                        <p className="text-sm text-[var(--paragraph-text)] mb-6">This will permanently delete &quot;{deckTitle}&quot; and all its cards.</p>
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setShowDeleteDeck(false)} className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors">Cancel</button>
                            <button onClick={handleDeleteDeck} className="px-5 py-2.5 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors shadow-md">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══ Inline Add Card ═══ */
function AddCardInline({ onAdd }: { onAdd: (q: string, a: string) => void }) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [a, setA] = useState("");

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="w-full rounded-2xl border-2 border-dashed border-[var(--border-color)] py-4 text-sm text-[var(--paragraph-text)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] transition-colors"
            >
                + Add Card
            </button>
        );
    }

    return (
        <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-5 space-y-3">
            <textarea
                value={q}
                onChange={(e) => setQ(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:border-transparent"
                placeholder="Question..."
                autoFocus
            />
            <textarea
                value={a}
                onChange={(e) => setA(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:border-transparent"
                placeholder="Answer..."
            />
            <div className="flex justify-end gap-2">
                <button onClick={() => { setOpen(false); setQ(""); setA(""); }} className="px-4 py-2 rounded-full text-sm text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors">Cancel</button>
                <button
                    onClick={() => { if (q.trim() && a.trim()) { onAdd(q.trim(), a.trim()); setQ(""); setA(""); } }}
                    disabled={!q.trim() || !a.trim()}
                    className="px-4 py-2 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
