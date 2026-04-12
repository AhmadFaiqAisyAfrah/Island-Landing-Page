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

        try {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { rootMargin: '-80px 0px -80% 0px' }
            );

            items?.forEach((item) => {
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
        <nav
            style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '20px 24px',
                marginBottom: '32px',
            }}
        >
            <h2
                style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '1px',
                    color: '#666',
                    marginBottom: '16px',
                }}
            >
                Daftar Isi
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(item.id);
                            }}
                            style={{
                                display: 'block',
                                padding: item.level === 3 ? '6px 0 6px 16px' : '6px 0',
                                fontSize: item.level === 3 ? '14px' : '15px',
                                color: activeId === item.id ? '#e63946' : '#444',
                                textDecoration: 'none',
                                borderLeft:
                                    item.level === 3
                                        ? '2px solid #ddd'
                                        : 'none',
                                marginLeft: item.level === 3 ? '8px' : '0',
                                transition: 'color 0.2s ease',
                                cursor: 'pointer',
                            }}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}