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

    const isMarketingPage =
        pathname.startsWith("/explore") ||
        pathname.startsWith("/articles") ||
        pathname.startsWith("/privacy") ||
        pathname.startsWith("/terms") ||
        pathname.startsWith("/contact") ||
        pathname.startsWith("/about") ||
        pathname.startsWith("/data-deletion");

    const isDashboard = !isMarketingPage;

    const marketingLinks = [
        { label: "Explore", href: "/explore" },
        { label: "Articles", href: "/articles" },
    ];

    const dashboardLinks = [
        { label: "Features", href: "/#features" },
        { label: "Trust", href: "/#transparency" },
        { label: "FAQ", href: "/#faq" },
        { label: "Explore", href: "/explore" },
        { label: "Articles", href: "/articles" },
    ];

    const navLinks = isDashboard ? dashboardLinks : marketingLinks;

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
                    {isMarketingPage && (
                        <Link href="/" className="text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                            Island App
                        </Link>
                    )}

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm transition-colors ${pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}
                        >
                            {link.label}
                        </Link>
                    ))}

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
                    {isMarketingPage && (
                        <Link href="/" onClick={() => setOpen(false)} className="block text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors">
                            Island App
                        </Link>
                    )}

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`block text-sm transition-colors ${pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "text-[var(--accent-green)] font-semibold" : "text-[var(--paragraph-text)] hover:text-[var(--accent-green)]"}`}
                        >
                            {link.label}
                        </Link>
                    ))}

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
