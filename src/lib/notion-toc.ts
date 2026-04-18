export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function generateAnchorId(text: string): string {
    if (!text) return '';
    
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/gu, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export function getPlainText(richText?: { plain_text?: string }[]): string {
    if (!richText || richText.length === 0) return '';
    return richText.map(t => t?.plain_text || '').join('');
}

function isEmojiMarker(text: string): boolean {
    if (!text) return false;
    const emojiRegex = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
    const words = text.trim().split(/\s+/).length;
    return emojiRegex.test(text.trim()) && words <= 8;
}

function isNormalSentence(text: string): boolean {
    if (!text) return false;
    const lower = text.toLowerCase();
    const sentenceStarters = ['ini adalah', 'hal ini', 'untuk itu', 'oleh karena', 'jadi', 'karena', 'namun', 'tetapi', 'jadi', 'oleh karena itu', 'contoh', 'seperti', 'misalnya', 'dalam hal', 'dengan kata lain', 'secara'];
    return sentenceStarters.some(starter => lower.startsWith(starter));
}

export function extractHeadingsFromBlocks(blocks: unknown[]): TocItem[] {
    if (!blocks || !Array.isArray(blocks)) return [];
    
    const headings: TocItem[] = [];
    const seenIds = new Set<string>();

    for (const block of blocks) {
        if (!block || typeof block !== 'object') continue;

        const b = block as {
            type?: string;
            heading_2?: { rich_text?: { plain_text?: string }[] };
            heading_3?: { rich_text?: { plain_text?: string }[] };
            heading_1?: { rich_text?: { plain_text?: string }[] };
            paragraph?: { rich_text?: { plain_text?: string }[] };
            callout?: { rich_text?: { plain_text?: string }[] };
        };

        let text = '';
        let level = 2;

        if (b.type === 'heading_1') {
            const richText = b.heading_1?.rich_text;
            text = getPlainText(richText);
            level = 2;
        } else if (b.type === 'heading_2') {
            const richText = b.heading_2?.rich_text;
            text = getPlainText(richText);
            level = 2;
        } else if (b.type === 'heading_3') {
            const richText = b.heading_3?.rich_text;
            text = getPlainText(richText);
            level = 3;
        } else if (b.type === 'paragraph' || b.type === 'callout') {
            const richText = b[b.type]?.rich_text;
            text = getPlainText(richText);
            
            if (text.trim() && isEmojiMarker(text) && !isNormalSentence(text)) {
                level = 3;
            } else {
                text = '';
            }
        }

        if (text.trim()) {
            let id = generateAnchorId(text);
            
            // Handle duplicate IDs
            if (seenIds.has(id)) {
                let counter = 2;
                while (seenIds.has(`${id}-${counter}`)) {
                    counter++;
                }
                id = `${id}-${counter}`;
            }
            seenIds.add(id);

            headings.push({
                id,
                text: text.trim(),
                level,
            });
        }
    }

    return headings;
}

export function isEmojiSection(text: string): boolean {
    return isEmojiMarker(text);
}

export function isShortTitle(text: string): boolean {
    if (!text) return false;
    return text.length > 0 && text.length <= 80 && text.split(' ').length <= 8;
}