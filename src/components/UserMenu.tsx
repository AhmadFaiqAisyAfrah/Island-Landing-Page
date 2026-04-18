"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Settings, LogOut, ChevronDown } from "lucide-react";

export default function UserMenu() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    if (!user) return null;

    const displayName = user.displayName || "User";
    const initials = displayName.charAt(0).toUpperCase();

    async function handleSignOut() {
        try {
            const auth = getClientAuth();
            await signOut(auth);
            setOpen(false);
            router.push("/");
        } catch (err) {
            console.error("Sign out failed:", err);
        }
    }

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
            >
                {user.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt={displayName}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-green)] flex items-center justify-center text-white text-sm font-bold">
                        {initials}
                    </div>
                )}
                <span className="text-sm font-medium text-[var(--heading-text)] hidden sm:inline max-w-[100px] truncate">
                    {displayName}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[var(--paragraph-text)] transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-[0_16px_40px_rgba(8,15,26,0.2)] py-2 animate-fade-in z-50">
                    {/* User info */}
                    <div className="px-4 py-2.5 border-b border-[var(--border-color)]">
                        <p className="text-sm font-semibold text-[var(--heading-text)] truncate">{displayName}</p>
                        <p className="text-xs text-[var(--paragraph-text)] truncate">{user.email}</p>
                    </div>

                    {/* Links */}
                    <div className="py-1">
                        <Link
                            href="/explore"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--paragraph-text)] hover:bg-[var(--bg-secondary)] hover:text-[var(--heading-text)] transition-colors"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-[var(--border-color)] py-1">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
