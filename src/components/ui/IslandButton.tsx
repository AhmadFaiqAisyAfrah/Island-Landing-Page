"use client";

import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface IslandButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    ariaLabel?: string;
}

export default function IslandButton({
    children,
    onClick,
    href,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    disabled = false,
    ariaLabel,
}: IslandButtonProps) {
    const buttonContent = (
        <button
            type={type}
            className={`island-btn island-btn-${variant} island-btn-${size} ${className}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            <span>{children}</span>
        </button>
    );

    if (disabled) {
        return buttonContent;
    }

    if (href) {
        return <Link href={href}>{buttonContent}</Link>;
    }

    return buttonContent;
}