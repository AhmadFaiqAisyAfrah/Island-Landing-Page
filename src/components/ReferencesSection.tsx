'use client';

import { formatHarvard, type Reference } from '@/lib/notion';

interface ReferencesSectionProps {
    references: Reference[];
    title?: string;
}

export function ReferencesSection({ references, title = 'Daftar Pustaka' }: ReferencesSectionProps) {
    if (!references || references.length === 0) {
        return null;
    }

    const formattedReferences = references.map((ref, index) => ({
        ...ref,
        formatted: formatHarvard(ref) || `(${ref.author}, ${ref.year})`,
        index: index + 1,
    }));

    return (
        <section style={styles.section}>
            <h2 style={styles.title}>{title}</h2>
            <ol style={styles.list}>
                {formattedReferences.map((ref, idx) => (
                    <li key={idx} style={styles.listItem}>
                        <span style={styles.referenceText}>{ref.formatted}</span>
                    </li>
                ))}
            </ol>
        </section>
    );
}

const styles = {
    section: {
        marginTop: '64px',
        paddingTop: '32px',
        borderTop: '1px solid #e5e7eb',
    },
    title: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '22px',
        fontWeight: 700,
        color: '#111',
        marginBottom: '20px',
        marginTop: 0,
    },
    list: {
        margin: 0,
        paddingLeft: '24px',
        listStyleType: 'decimal',
    },
    listItem: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '15px',
        lineHeight: 1.7,
        color: '#444',
        marginBottom: '12px',
    },
    referenceText: {
        wordBreak: 'break-word' as const,
    },
};

export default ReferencesSection;
