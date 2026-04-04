"use client";

import Link from "next/link";

interface TagsDisplayProps {
    tags: string[];
    className?: string;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .trim();
}

export function TagsDisplay({ tags, className = "" }: TagsDisplayProps) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {tags.map((tag) => (
                <Link
                    key={tag}
                    href={`/tags/${slugify(tag)}`}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
                        bg-[var(--bg-secondary)] text-[var(--paragraph-text)] 
                        border border-[var(--border-color)]
                        hover:bg-[var(--accent-green)] hover:text-white hover:border-[var(--accent-green)]
                        transition-all duration-200"
                >
                    {tag}
                </Link>
            ))}
        </div>
    );
}

export function TagsInline({ tags }: { tags: string[] }) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <span className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)]">
            <span className="text-[var(--text-secondary)]">Tags:</span>
            {tags.map((tag, index) => (
                <span key={tag}>
                    <Link
                        href={`/tags/${slugify(tag)}`}
                        className="text-[var(--accent-green)] hover:underline"
                    >
                        {tag}
                    </Link>
                    {index < tags.length - 1 && (
                        <span className="mx-1 text-[var(--text-secondary)]">·</span>
                    )}
                </span>
            ))}
        </span>
    );
}
