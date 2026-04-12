export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function generateAnchorId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
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
    const MAX_ITEMS = 12;

    for (const block of blocks) {
        if (headings.length >= MAX_ITEMS) break;

        const b = block as {
            type?: string;
            heading_2?: { rich_text?: { plain_text?: string }[] };
            heading_3?: { rich_text?: { plain_text?: string }[] };
            heading_1?: { rich_text?: { plain_text?: string }[] };
            paragraph?: { rich_text?: { plain_text?: string }[] };
            callout?: { rich_text?: { plain_text?: string }[] };
            bulleted_list_item?: { rich_text?: { plain_text?: string }[] };
        };

        if (b.type === 'heading_2') {
            const richText = b.heading_2?.rich_text;
            const text = getPlainText(richText);
            if (text.trim()) {
                headings.push({
                    id: generateAnchorId(text),
                    text: text.trim(),
                    level: 2,
                });
            }
        } else if (b.type === 'heading_3') {
            const richText = b.heading_3?.rich_text;
            const text = getPlainText(richText);
            if (text.trim()) {
                headings.push({
                    id: generateAnchorId(text),
                    text: text.trim(),
                    level: 3,
                });
            }
        } else if (b.type === 'heading_1') {
            const richText = b.heading_1?.rich_text;
            const text = getPlainText(richText);
            if (text.trim()) {
                headings.push({
                    id: generateAnchorId(text),
                    text: text.trim(),
                    level: 2,
                });
            }
        } else if (b.type === 'paragraph' || b.type === 'callout') {
            const richText = b[b.type]?.rich_text;
            const text = getPlainText(richText);
            
            if (text.trim() && isEmojiMarker(text) && !isNormalSentence(text)) {
                headings.push({
                    id: generateAnchorId(text),
                    text: text.trim(),
                    level: 3,
                });
            }
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