'use client';

import { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface IslandButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    href?: string;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
}

export function IslandButton({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    href,
    disabled = false,
    className = '',
    type = 'button',
    ariaLabel,
}: IslandButtonProps) {
    const sizeClasses: Record<ButtonSize, string> = {
        sm: 'island-btn-sm',
        md: 'island-btn-md',
        lg: 'island-btn-lg',
    };

    const classes = [
        'island-btn',
        `island-btn-${variant}`,
        sizeClasses[size],
        className,
    ].filter(Boolean).join(' ');

    if (href && !disabled) {
        return (
            <Link
                href={href}
                className={classes}
                aria-label={ariaLabel}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}