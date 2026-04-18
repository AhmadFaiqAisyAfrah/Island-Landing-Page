'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/notion-toc';

interface TableOfContentsProps {
    items?: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;
        if (error) return;

        if (!items || items.length === 0) return;

        try {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { 
                    rootMargin: '-100px 0px -70% 0px',
                    threshold: 0,
                }
            );

            items.forEach((item) => {
                if (!item?.id) return;
                const element = document.getElementById(item.id);
                if (element) observer.observe(element);
            });

            return () => observer.disconnect();
        } catch (e) {
            console.error('[TOC] IntersectionObserver error:', e);
            setError(true);
        }
    }, [items, isMounted, error]);

    const handleClick = (id: string) => {
        try {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } catch (e) {
            console.error('[TOC] scroll error:', e);
        }
    };

    if (!items || items.length === 0) return null;
    if (error) return null;

    return (
        <nav className="toc-container">
            <h2 className="toc-title">Daftar Isi</h2>
            <ul className="toc-list">
                {items.map((item) => (
                    <li key={item.id} className={`toc-item level-${item.level}`}>
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(item.id);
                            }}
                            className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}