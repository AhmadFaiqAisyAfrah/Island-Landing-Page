"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import UserMenu from "@/components/UserMenu";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const pathname = usePathname();
    const { user, loading } = useAuth();

    const navLinks = [
        { label: "Island App", href: "/island-app" },
        { label: "Explore", href: "/explore" },
        { label: "Articles", href: "/articles" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                >
                    <ThemeAwareLogo
                        className="h-14 md:h-16 w-auto object-contain bg-transparent"
                        priority
                    />
                    <span 
                        className="text-gray-900"
                        style={{ fontFamily: "var(--font-heading), Georgia, serif", fontWeight: 700 }}
                    >
                        Island
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive =
                            pathname === link.href ||
                            (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                                    isActive ? "text-emerald-600" : "text-gray-600"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className="flex items-center gap-3 border-l border-gray-200 pl-4 ml-2">
                        {loading ? (
                            <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200" />
                        ) : user ? (
                            <UserMenu />
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="px-4 py-2 text-sm font-medium border-2 border-emerald-500 text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors"
                                >
                                    Sign Up
                                </button>
                                <a
                                    href="https://islandapp.id/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm"
                                >
                                    Get the App
                                </a>
                            </>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-900"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div className="md:hidden px-6 pb-6 pt-2 space-y-4 bg-white/95 border-t border-gray-200">
                    {navLinks.map((link) => {
                        const isActive =
                            pathname === link.href ||
                            (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`block text-sm font-medium transition-colors ${
                                    isActive ? "text-emerald-600" : "text-gray-600"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            {loading ? (
                                <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200" />
                            ) : user ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowAuthModal(true)}
                                        className="text-sm font-medium text-gray-600"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => setShowAuthModal(true)}
                                        className="px-4 py-2 text-sm font-medium border-2 border-emerald-500 text-emerald-600 rounded-full"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                        {!user && (
                            <a
                                href="https://islandapp.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-center"
                            >
                                Get the App
                            </a>
                        )}
                    </div>
                </div>
            )}

            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </nav>
    );
}
