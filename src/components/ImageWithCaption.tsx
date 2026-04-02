import Image from 'next/image';

interface ImageWithCaptionProps {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

interface ParsedCaption {
    description: string;
    credit?: string;
}

function parseCaption(rawCaption: string): ParsedCaption {
    // Common patterns for credits:
    // - "Description. Credit Name / Agency"
    // - "Description (Credit Name)"
    // - "Description - Credit Name"
    
    const patterns = [
        // Pattern: "Description. Name / Agency"
        /^([^. ]+.*?)\.\s*([A-Z][A-Za-z\s]+?\s*\/\s*[A-Z][A-Za-z\s]+)$/,
        // Pattern: "Description (Name)"
        /^(.+?)\s*\(([^)]+)\)$/,
        // Pattern: "Description - Name / Agency"
        /^(.+?)\s*-\s*([A-Z][A-Za-z\s]+?\s*\/\s*[A-Z][A-Za-z\s]+)$/,
        // Pattern: "Description — Credit"
        /^(.+?)\s*[—–-]\s*([A-Z][A-Za-z\s]+)$/,
    ];

    for (const pattern of patterns) {
        const match = rawCaption.match(pattern);
        if (match) {
            return {
                description: match[1].trim(),
                credit: match[2].trim(),
            };
        }
    }

    // No pattern matched, return as description
    return {
        description: rawCaption.trim(),
        credit: undefined,
    };
}

export function ImageWithCaption({
    src,
    alt,
    caption,
    width = 720,
    height = 400,
    priority = false,
}: ImageWithCaptionProps) {
    if (!caption) {
        return (
            <figure style={{ margin: '0 0 32px 0' }}>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px',
                    }}
                    priority={priority}
                />
            </figure>
        );
    }

    const parsed = parseCaption(caption);

    return (
        <figure style={{ margin: '0 0 32px 0' }}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '4px',
                }}
                priority={priority}
            />
            <figcaption
                style={{
                    marginTop: '12px',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#666',
                }}
            >
                {parsed.description}
                {parsed.credit && (
                    <>
                        {'. '}
                        <span style={{ fontStyle: 'italic' }}>{parsed.credit}</span>
                    </>
                )}
            </figcaption>
        </figure>
    );
}

export function ArticleCoverImage({
    src,
    alt,
    caption,
    priority = true,
}: {
    src: string;
    alt: string;
    caption?: string;
    priority?: boolean;
}) {
    return (
        <div style={{ marginBottom: '48px' }}>
            <ImageWithCaption
                src={src}
                alt={alt}
                caption={caption}
                width={720}
                height={400}
                priority={priority}
            />
        </div>
    );
}
