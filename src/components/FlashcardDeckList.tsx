"use client";

import { useState, useEffect } from "react";
import { Plus, Layers } from "lucide-react";
import Link from "next/link";
import { getClientAuth, db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, addDoc } from "firebase/firestore";
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
        fetchDecks(user.uid);
    }, [user, authLoading]);

    async function fetchDecks(uid: string) {
        setLoading(true);
        try {
            const decksRef = collection(db, "users", uid, "flashcardDecks");
            const q = query(decksRef, orderBy("updatedAt", "desc"));
            const snap = await getDocs(q);

            const result: Deck[] = [];
            for (const d of snap.docs) {
                const data = d.data();
                // Get card count from subcollection
                const cardsSnap = await getDocs(collection(db, "users", uid, "flashcardDecks", d.id, "cards"));
                result.push({
                    id: d.id,
                    title: data.title,
                    icon: data.icon || "📚",
                    cardCount: cardsSnap.size,
                    updatedAt: data.updatedAt || 0,
                });
            }
            setDecks(result);
        } catch (err) {
            console.error("Error fetching decks:", err);
        }
        setLoading(false);
    }

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
            fetchDecks(user.uid);
        } catch (err) {
            console.error("Error creating deck:", err);
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
                        <Link
                            key={deck.id}
                            href={`/explore/flashcards/${deck.id}`}
                            className="group block rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-6 shadow-sm hover:shadow-[0_12px_32px_rgba(8,15,26,0.12)] hover:-translate-y-0.5 transition-all"
                        >
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
        </div>
    );
}
