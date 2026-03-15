"use client";

import { X } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase";

interface AuthModalProps {
    onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
    const handleGoogleLogin = async () => {
        try {
            const auth = getClientAuth();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            console.log("User logged in");
            onClose();
        } catch (error) {
            console.error("Google login failed:", error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[420px] bg-white rounded-2xl p-6 shadow-[0_24px_52px_rgba(8,15,26,0.25)] relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--paragraph-text)] hover:text-[var(--heading-text)] transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-green)]/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-7 h-7 text-[var(--accent-green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-[var(--heading-text)] text-center mb-2">
                    Sign in to save your flashcards
                </h3>
                <p className="text-sm text-[var(--paragraph-text)] text-center mb-8 leading-relaxed">
                    Create an account or sign in with Google to save your flashcard decks and access them anywhere.
                </p>

                <div className="flex flex-col gap-3">
                    {/* Google sign-in button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-semibold hover:bg-[#5FBF8F] transition-colors shadow-md"
                    >
                        {/* Google icon */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Cancel */}
                    <button
                        onClick={onClose}
                        className="w-full px-5 py-3 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
