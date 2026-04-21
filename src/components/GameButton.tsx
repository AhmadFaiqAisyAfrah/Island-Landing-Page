"use client";

import Link from "next/link";

interface GameButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary";
    className?: string;
    fullWidth?: boolean;
}

const primaryButtonStyles = "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95";

const secondaryButtonStyles = "border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-6 py-3 rounded-xl transition-all duration-200 active:scale-95";

export default function GameButton({ 
    children, 
    onClick, 
    href, 
    variant = "primary", 
    className = "",
    fullWidth = false 
}: GameButtonProps) {
    const baseStyles = variant === "primary" ? primaryButtonStyles : secondaryButtonStyles;
    const widthStyle = fullWidth ? "w-full" : "";
    
    const buttonContent = (
        <button
            onClick={onClick}
            className={`${baseStyles} ${widthStyle} ${className} flex items-center justify-center gap-2`}
        >
            {children}
        </button>
    );

    if (href) {
        return (
            <Link href={href} className={widthStyle}>
                {buttonContent}
            </Link>
        );
    }

    return buttonContent;
}