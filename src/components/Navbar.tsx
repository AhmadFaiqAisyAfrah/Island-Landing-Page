"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-pastel-green/20">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-text-dark">
                    <Image src="/island-logo.png" alt="Island" width={58} height={58} className="h-[58px] w-auto object-contain" />
                    <span>Island</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="/#features" className="text-sm text-text-muted hover:text-pastel-green-deep transition-colors">
                        Features
                    </a>
                    <a href="/#transparency" className="text-sm text-text-muted hover:text-pastel-green-deep transition-colors">
                        Trust
                    </a>
                    <a href="/#faq" className="text-sm text-text-muted hover:text-pastel-green-deep transition-colors">
                        FAQ
                    </a>
                    <a
                        href="https://play.google.com/store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-pastel-green-deep px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:bg-pastel-green-deep/90 transition-all"
                    >
                        Get the App
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-text-dark"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-cream/95 backdrop-blur-md border-t border-pastel-green/20 px-6 pb-6 pt-2 space-y-4 animate-fade-in-up">
                    <a
                        href="/#features"
                        onClick={() => setOpen(false)}
                        className="block text-sm text-text-muted hover:text-pastel-green-deep transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="/#transparency"
                        onClick={() => setOpen(false)}
                        className="block text-sm text-text-muted hover:text-pastel-green-deep transition-colors"
                    >
                        Trust
                    </a>
                    <a
                        href="/#faq"
                        onClick={() => setOpen(false)}
                        className="block text-sm text-text-muted hover:text-pastel-green-deep transition-colors"
                    >
                        FAQ
                    </a>
                    <a
                        href="https://play.google.com/store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full bg-pastel-green-deep px-5 py-2 text-sm font-semibold text-white shadow-md"
                    >
                        Get the App
                    </a>
                </div>
            )}
        </nav>
    );
}
