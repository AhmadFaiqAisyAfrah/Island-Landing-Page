"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getClientAuth, db } from "@/lib/firebase";
import {
    doc, getDoc,
    collection, query, orderBy, getDocs,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import FlashcardViewer from "@/components/FlashcardViewer";

interface Card {
    id: string;
    question: string;
    answer: string;
    questionImage?: string;
    answerImage?: string;
}

export default function StudyPage() {
    const params = useParams();
    const deckId = params.deckId as string;

    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [deckTitle, setDeckTitle] = useState("");
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getClientAuth();
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setAuthLoading(false);
        });
        return () => unsub();
    }, []);

    const fetchDeck = useCallback(async (uid: string) => {
        setLoading(true);
        try {
            const deckRef = doc(db, "users", uid, "flashcardDecks", deckId);
            const deckSnap = await getDoc(deckRef);
            if (!deckSnap.exists()) {
                window.location.href = "/explore/flashcards";
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
                questionImage: d.data().questionImage || undefined,
                answerImage: d.data().answerImage || undefined,
            })));
        } catch (err) {
            console.error("Error loading deck:", err);
        }
        setLoading(false);
    }, [deckId]);

    useEffect(() => {
        if (authLoading || !user) return;
        fetchDeck(user.uid);
    }, [user, authLoading, fetchDeck]);

    if (!authLoading && !user) {
        return (
            <div className="pt-24 min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <p className="text-[var(--paragraph-text)]">Please sign in to access this deck.</p>
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

    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-[900px] mx-auto px-6">
                <div className="mb-8 relative z-10">
                    <Link
                        href={`/explore/flashcards/${deckId}`}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                        ← Back to {deckTitle}
                    </Link>
                </div>
                <div className="pb-24">
                    <FlashcardViewer
                        title={deckTitle}
                        deckId={deckId}
                        deckTitle={deckTitle}
                        cards={cards}
                        studyMode={true}
                    />
                </div>
            </div>
        </div>
    );
}
