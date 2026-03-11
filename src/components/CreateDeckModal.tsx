"use client";

import { useState } from "react";
import { X } from "lucide-react";

const EMOJI_OPTIONS = ["📚", "🧠", "🧬", "📖", "📝", "💻", "🌎", "🧪"];

interface CreateDeckModalProps {
    onClose: () => void;
    onCreate: (name: string, icon: string) => void;
}

export default function CreateDeckModal({ onClose, onCreate }: CreateDeckModalProps) {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");

    function handleSubmit() {
        const trimmed = name.trim();
        if (!trimmed) return;
        const finalIcon = icon || EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)];
        onCreate(trimmed, finalIcon);
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[0_24px_52px_rgba(8,15,26,0.25)] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--paragraph-text)] hover:text-[var(--heading-text)] transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>

                <h3 className="text-xl font-bold text-[var(--heading-text)] mb-6">
                    Create New Deck
                </h3>

                <div className="space-y-4">
                    {/* Emoji picker */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--paragraph-text)] mb-2">
                            Icon
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {EMOJI_OPTIONS.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setIcon(icon === emoji ? "" : emoji)}
                                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${icon === emoji
                                            ? "bg-[var(--accent-green)]/20 ring-2 ring-[var(--accent-green)] scale-110"
                                            : "bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 hover:scale-105"
                                        }`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        {!icon && (
                            <p className="text-xs text-[var(--paragraph-text)] opacity-50 mt-1.5">
                                A random icon will be assigned if none is selected
                            </p>
                        )}
                    </div>

                    {/* Name input */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--paragraph-text)] mb-1.5">
                            Deck name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)] focus:border-transparent transition-shadow"
                            placeholder="e.g. Biology, English Vocabulary..."
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="px-5 py-2.5 rounded-full bg-[var(--accent-green)] text-white text-sm font-medium hover:bg-[#5FBF8F] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
