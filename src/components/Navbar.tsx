"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const pathname = usePathname();
    const { user, loading } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-color)]">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--heading-text)]">
                    <Image src="/island-logo.png" alt="Island" width={58} height={58} className="h-[58px] w-auto object-contain" />
                    <span>Island</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                        Features
                    </Link>
                    <Link href="/#transparency" className="text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                        Trust
                    </Link>
                    <Link href="/#faq" className="text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                        FAQ
                    </Link>
                    <Link href="/articles" className={`text-sm transition-colors ${pathname.startsWith("/articles") ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}>
                        Articles
                    </Link>
                    <Link href="/about" className={`text-sm transition-colors ${pathname === "/about" ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}>
                        About
                    </Link>
                    <Link href="/explore" className={`text-sm transition-colors ${pathname === "/explore" ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}>
                        Explore
                    </Link>

                    <div className="flex items-center gap-3 border-l border-[var(--border-color)] pl-4 ml-2">
                        <ThemeToggle />

                        {loading ? (
                            <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] animate-pulse" />
                        ) : user ? (
                            <UserMenu />
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="text-sm font-medium text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="rounded-full border border-[var(--accent-green)] px-4 py-2 text-sm font-semibold text-[var(--accent-green)] hover:bg-[var(--accent-green)] hover:text-white transition-all"
                                >
                                    Sign Up
                                </button>
                                <a
                                    href="https://play.google.com/store"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-[var(--button-bg)] px-5 py-2 text-sm font-semibold text-[var(--button-text)] shadow-[0_10px_20px_rgba(8,15,26,0.25)] hover:shadow-[0_14px_26px_rgba(8,15,26,0.32)] hover:bg-[var(--button-hover)] transition-all"
                                >
                                    Get the App
                                </a>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-[var(--heading-text)]"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-[var(--nav-bg)] backdrop-blur-md border-t border-[var(--border-color)] px-6 pb-6 pt-2 space-y-4 animate-fade-in-up">
                    <Link href="/#features" onClick={() => setOpen(false)} className="block text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                        Features
                    </Link>
                    <Link href="/#transparency" onClick={() => setOpen(false)} className="block text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                        Trust
                    </Link>
                    <Link href="/#faq" onClick={() => setOpen(false)} className="block text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                        FAQ
                    </Link>
                    <Link href="/articles" onClick={() => setOpen(false)} className={`block text-sm transition-colors ${pathname.startsWith("/articles") ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}>
                        Articles
                    </Link>
                    <Link href="/about" onClick={() => setOpen(false)} className={`block text-sm transition-colors ${pathname === "/about" ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}>
                        About
                    </Link>
                    <Link href="/explore" onClick={() => setOpen(false)} className={`block text-sm transition-colors ${pathname === "/explore" ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}>
                        Explore
                    </Link>

                    <div className="flex flex-col gap-3 pt-2 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-3">
                            <ThemeToggle />

                            {loading ? (
                                <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] animate-pulse" />
                            ) : user ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowAuthModal(true)}
                                        className="text-sm font-medium text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => setShowAuthModal(true)}
                                        className="rounded-full border border-[var(--accent-green)] px-4 py-2 text-sm font-semibold text-[var(--accent-green)] hover:bg-[var(--accent-green)] hover:text-white transition-all"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                        {!user && (
                            <a
                                href="https://play.google.com/store"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block rounded-full bg-[var(--button-bg)] px-5 py-2 text-sm font-semibold text-[var(--button-text)] shadow-[0_10px_20px_rgba(8,15,26,0.25)] hover:bg-[var(--button-hover)] text-center"
                            >
                                Get the App
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Auth Modal */}
            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </nav>
    );
}
