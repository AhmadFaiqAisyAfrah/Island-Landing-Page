"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const html = document.documentElement;
        
        if (savedTheme === "dark") {
            html.classList.add("dark");
        } else if (savedTheme === "light") {
            html.classList.remove("dark");
        }
        
        const isDark = html.classList.contains("dark");
        setIsDarkMode(isDark);
    }, []);

    const toggleTheme = () => {
        const nextMode = !isDarkMode;
        setIsDarkMode(nextMode);

        if (nextMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    if (!mounted) {
        return <div className="w-8 h-8 pointer-events-none" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full text-[var(--paragraph-text)] hover:text-[var(--accent-green)] hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none"
            aria-label="Toggle theme"
        >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
