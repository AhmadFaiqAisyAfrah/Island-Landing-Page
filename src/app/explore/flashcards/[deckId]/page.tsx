"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Play } from "lucide-react";
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
    questionImage?: string;
    answerImage?: string;
}

export default function DeckDetailPage() {
    const params = useParams();
    const router = useRouter();
    const deckId = params.deckId as string;

    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [deckTitle, setDeckTitle] = useState("");
    const [deckIcon, setDeckIcon] = useState("📚");
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    const [showAuthModal, setShowAuthModal] = useState(false);

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
            setDeckIcon(deckSnap.data().icon || "📚");

            const cardsRef = collection(db, "users", uid, "flashcardDecks", deckId, "cards");
            const cardsQ = query(cardsRef, orderBy("createdAt", "asc"));
            const cardsSnap = await getDocs(cardsQ);
            setCards(cardsSnap.docs.map((d) => ({
                id: d.id,
                question: d.data().question,
                answer: d.data().answer,
                questionImage: d.data().questionImage || undefined,
                answerImage: d.data().answerImage || undefined,
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
            await addDoc(cardsRef, { 
                question, 
                answer, 
                createdAt: Date.now() 
            });
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
            await updateDoc(doc(db, "users", user.uid, "flashcardDecks", deckId, "cards", card.id), { 
                question, 
                answer,
            });
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
                        <div className="w-14 h-14 rounded-[14px] bg-[var(--bg-secondary)] flex items-center justify-center text-[28px] mb-2">
                            <span aria-hidden="true">{deckIcon}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--heading-text)]">{deckTitle}</h1>
                        <p className="text-sm text-[var(--paragraph-text)] mt-1">
                            {cards.length} {cards.length === 1 ? "card" : "cards"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => router.push(`/explore/flashcards/${deckId}/study`)}
                            disabled={cards.length === 0}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Play className="w-4 h-4" />
                            Study Mode
                        </button>
                    </div>
                </div>

                {/* FlashcardViewer - handles card list, add, edit, delete with image support */}
                <div className="pb-24">
                    <FlashcardViewer
                        title={deckTitle}
                        cards={cards}
                        onAddCard={handleAddCard}
                        onEditCard={handleEditCard}
                        onDeleteCard={handleDeleteCard}
                    />
                </div>
            </div>
        </div>
    );
}
