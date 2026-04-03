"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const toggleTheme = () => {
        setTheme(isDarkMode ? "light" : "dark");
    };

    if (!mounted) {
        return <div className="w-8 h-8" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full text-[var(--paragraph-text)] hover:text-[var(--accent-green)] hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none"
            aria-label="Toggle theme"
        >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
