"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LOGO_DARK = "https://ik.imagekit.io/kv42h83lq/Salinan_dari_Secarik_Semangat.__4_-removebg-preview.png";
const LOGO_LIGHT = "https://ik.imagekit.io/kv42h83lq/Salinan_dari_Secarik_Semangat.__5_-removebg-preview.png";

interface ThemeAwareLogoProps {
    className?: string;
    priority?: boolean;
}

export default function ThemeAwareLogo({ 
    className = "h-14 md:h-16 w-auto",
    priority = false 
}: ThemeAwareLogoProps) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const effectiveTheme = resolvedTheme || theme;

    if (!mounted) {
        return <div className={className} style={{ width: 100, height: 56 }} />;
    }

    const logoSrc = effectiveTheme === "dark" ? LOGO_DARK : LOGO_LIGHT;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={logoSrc}
            alt="Island Logo"
            className={`${className} object-contain bg-transparent`}
            width={100}
            height={56}
            loading={priority ? "eager" : "lazy"}
        />
    );
}
