"use client";

import { useState, useEffect } from "react";
import { Plus, Layers, BookOpen, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getClientAuth, db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import AuthModal from "@/components/AuthModal";
import CreateDeckModal from "@/components/CreateDeckModal";

interface Deck {
    id: string;
    title: string;
    icon: string;
    cardCount: number;
    updatedAt: number;
}

export default function FlashcardDeckList() {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [openDeckMenuId, setOpenDeckMenuId] = useState<string | null>(null);
    const [renamingDeckId, setRenamingDeckId] = useState<string | null>(null);
    const [renameDeckName, setRenameDeckName] = useState("");
    const [deletingDeckId, setDeletingDeckId] = useState<string | null>(null);

    // Listen for auth
    useEffect(() => {
        const auth = getClientAuth();
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return () => unsub();
    }, []);

    // Fetch decks when user available
    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setDecks([]);
            setLoading(false);
            return;
        }
        setLoading(true);

        const decksRef = collection(db, "users", user.uid, "flashcardDecks");
        const deckQuery = query(decksRef, orderBy("updatedAt", "desc"));

        const unsubscribe = onSnapshot(deckQuery, async (snap) => {
            const result: Deck[] = await Promise.all(
                snap.docs.map(async (d) => {
                    const data = d.data();
                    const cardsSnap = await getDocs(collection(db, "users", user.uid, "flashcardDecks", d.id, "cards"));

                    return {
                        id: d.id,
                        title: data.title || data.name || "Untitled Deck",
                        icon: data.icon || "📚",
                        cardCount: cardsSnap.size,
                        updatedAt: data.updatedAt || 0,
                    };
                })
            );

            setDecks(result);
            setLoading(false);
        }, (err) => {
            console.error("Error listening decks:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, authLoading]);

    useEffect(() => {
        if (!openDeckMenuId) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target?.closest("[data-deck-menu-root='true']")) {
                setOpenDeckMenuId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDeckMenuId]);

    async function handleCreateDeck(name: string, icon: string) {
        if (!user) return;
        try {
            const now = Date.now();
            await addDoc(collection(db, "users", user.uid, "flashcardDecks"), {
                title: name,
                icon: icon,
                createdAt: now,
                updatedAt: now,
            });
            setShowCreateModal(false);
        } catch (err) {
            console.error("Error creating deck:", err);
        }
    }

    async function handleRenameDeck() {
        if (!user || !renamingDeckId) return;
        const trimmed = renameDeckName.trim();
        if (!trimmed) return;

        try {
            await updateDoc(doc(db, "users", user.uid, "flashcardDecks", renamingDeckId), {
                title: trimmed,
                name: trimmed,
                updatedAt: Date.now(),
            });
            setRenamingDeckId(null);
            setRenameDeckName("");
        } catch (err) {
            console.error("Error renaming deck:", err);
        }
    }

    async function handleDeleteDeck() {
        if (!user || !deletingDeckId) return;

        try {
            await deleteDoc(doc(db, "users", user.uid, "flashcardDecks", deletingDeckId));
            setDeletingDeckId(null);
        } catch (err) {
            console.error("Error deleting deck:", err);
        }
    }

    // Not logged in
    if (!authLoading && !user) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-[var(--paragraph-text)] opacity-40" />
                </div>
                <p className="text-[var(--paragraph-text)] text-sm mb-2">Sign in to manage your flashcard decks</p>
                <button
                    onClick={() => setShowAuthModal(true)}
                    className="mt-4 px-6 py-3 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                >
                    Sign in with Google
                </button>
                {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
            </div>
        );
    }

    // Loading
    if (loading || authLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[var(--accent-green)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Header row */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[var(--heading-text)]">
                    Your Flashcard Decks
                </h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    New Deck
                </button>
            </div>

            {/* Empty state */}
            {decks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 rounded-3xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                        <Layers className="w-8 h-8 text-[var(--paragraph-text)] opacity-40" />
                    </div>
                    <p className="text-[var(--paragraph-text)] text-sm mb-4">
                        You don&apos;t have any decks yet
                    </p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Create Your First Deck
                    </button>
                </div>
            ) : (
                /* Deck grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {decks.map((deck) => (
                        <div
                            key={deck.id}
                            className="group relative rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-6 shadow-sm hover:shadow-[0_12px_32px_rgba(8,15,26,0.12)] hover:-translate-y-0.5 transition-all"
                        >
                            <div className="absolute right-4 top-4 z-10" data-deck-menu-root="true">
                                <button
                                    type="button"
                                    onClick={() => setOpenDeckMenuId((prev) => (prev === deck.id ? null : deck.id))}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] opacity-0 transition-opacity duration-150 hover:text-[var(--heading-text)] group-hover:opacity-100"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>

                                {openDeckMenuId === deck.id && (
                                    <div className="absolute right-0 top-9 z-20 min-w-[148px] rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1.5 shadow-[0_14px_28px_rgba(8,15,26,0.2)]">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenDeckMenuId(null);
                                                setRenamingDeckId(deck.id);
                                                setRenameDeckName(deck.title);
                                            }}
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--heading-text)] transition-colors hover:bg-[var(--bg-primary)]"
                                        >
                                            Rename deck
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenDeckMenuId(null);
                                                setDeletingDeckId(deck.id);
                                            }}
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[#ff6b6b] transition-colors hover:bg-[var(--bg-primary)]"
                                        >
                                            Delete deck
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Link href={`/explore/flashcards/${deck.id}`} className="block">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-xl">
                                        {deck.icon}
                                    </div>
                                </div>
                                <h3 className="text-base font-semibold text-[var(--heading-text)] mb-1 group-hover:text-[var(--accent-green)] transition-colors">
                                    {deck.title}
                                </h3>
                                <p className="text-sm text-[var(--paragraph-text)]">
                                    {deck.cardCount} {deck.cardCount === 1 ? "card" : "cards"}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <CreateDeckModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={handleCreateDeck}
                />
            )}

            {renamingDeckId && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)]">
                        <h3 className="text-xl font-bold text-[var(--heading-text)]">Rename deck</h3>
                        <input
                            type="text"
                            value={renameDeckName}
                            onChange={(event) => setRenameDeckName(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleRenameDeck();
                                }
                            }}
                            autoFocus
                            className="mt-4 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:border-transparent transition-shadow"
                        />
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setRenamingDeckId(null);
                                    setRenameDeckName("");
                                }}
                                className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRenameDeck}
                                disabled={!renameDeckName.trim()}
                                className="px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deletingDeckId && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)]">
                        <h3 className="text-xl font-bold text-[var(--heading-text)]">Delete this deck?</h3>
                        <p className="mt-2 text-sm text-[var(--paragraph-text)]">This action cannot be undone.</p>
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                                onClick={() => setDeletingDeckId(null)}
                                className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteDeck}
                                className="px-5 py-2.5 rounded-full bg-[#ff6b6b] text-white text-sm font-medium hover:bg-[#ff5a5a] transition-colors shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
