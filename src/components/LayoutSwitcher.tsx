'use client';

import { useState, useEffect } from 'react';

export type LayoutMode = 'modern' | 'classic';

const STORAGE_KEY = 'island-layout-mode';

export function useLayoutMode() {
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('modern');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(STORAGE_KEY) as LayoutMode | null;
        if (saved === 'modern' || saved === 'classic') {
            setLayoutMode(saved);
        }
    }, []);

    const changeLayout = (mode: LayoutMode) => {
        setLayoutMode(mode);
        localStorage.setItem(STORAGE_KEY, mode);
    };

    return { layoutMode, changeLayout, mounted };
}

interface LayoutSwitcherProps {
    currentMode: LayoutMode;
    onModeChange: (mode: LayoutMode) => void;
}

export function LayoutSwitcher({ currentMode, onModeChange }: LayoutSwitcherProps) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            justifyContent: 'center'
        }}>
            <span style={{
                fontSize: '12px',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginRight: '8px'
            }}>
                View:
            </span>
            <button
                onClick={() => onModeChange('modern')}
                style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: '1px solid',
                    borderColor: currentMode === 'modern' ? '#111' : '#ddd',
                    backgroundColor: currentMode === 'modern' ? '#111' : '#fff',
                    color: currentMode === 'modern' ? '#fff' : '#666',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
            >
                Modern
            </button>
            <button
                onClick={() => onModeChange('classic')}
                style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: '1px solid',
                    borderColor: currentMode === 'classic' ? '#111' : '#ddd',
                    backgroundColor: currentMode === 'classic' ? '#111' : '#fff',
                    color: currentMode === 'classic' ? '#fff' : '#666',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
            >
                Classic
            </button>
        </div>
    );
}
