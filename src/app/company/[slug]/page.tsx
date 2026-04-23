import { getCompanyPageBySlug, notionCompany } from "@/lib/notion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface BlockContent {
    type: string;
    rich_text?: Array<{ plain_text: string }>;
    text?: Array<{ plain_text: string }>;
}

interface NotionBlock {
    id: string;
    type: string;
    [key: string]: unknown;
}

async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
    try {
        const response = await notionCompany.blocks.children.list({
            block_id: pageId,
        });
        return response.results as NotionBlock[];
    } catch (error) {
        console.error('[Notion] Error fetching blocks:', error);
        return [];
    }
}

function renderBlockToHtml(block: NotionBlock): string {
    const content = block[block.type] as BlockContent | undefined;
    if (!content) return '';

    const text = content.rich_text || content.text || [];
    const plainText = text.map(t => t.plain_text).join('');

    switch (block.type) {
        case 'heading_1':
            return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${plainText}</h2>`;
        case 'heading_2':
            return `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">${plainText}</h3>`;
        case 'heading_3':
            return `<h4 class="text-lg font-semibold text-gray-900 mt-4 mb-2">${plainText}</h4>`;
        case 'paragraph':
            return plainText ? `<p class="text-gray-700 leading-relaxed mb-4">${plainText}</p>` : '<br/>';
        case 'bulleted_list_item':
            return `<li class="text-gray-700 ml-4">${plainText}</li>`;
        case 'numbered_list_item':
            return `<li class="text-gray-700 ml-4">${plainText}</li>`;
        case 'quote':
            return `<blockquote class="border-l-4 border-emerald-500 pl-4 my-4 text-gray-600 italic">${plainText}</blockquote>`;
        case 'code':
            return `<pre class="bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto"><code>${plainText}</code></pre>`;
        case 'divider':
            return '<hr class="my-8 border-gray-200"/>';
        default:
            return plainText ? `<p>${plainText}</p>` : '';
    }
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log('[Company] Looking for slug:', slug);
    
    const page = await getCompanyPageBySlug(slug);
    console.log('[Company] Found page:', page?.title || 'NOT FOUND');

    let blocks: NotionBlock[] = [];
    if (page) {
        blocks = await getPageBlocks(page.id);
        console.log('[Company] Blocks fetched:', blocks.length);
    }

    return (
        <div className="min-h-screen bg-white pt-20 md:pt-24">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {page ? (
                    <article>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
                            {page.title}
                        </h1>
                        <div className="prose prose-lg max-w-none">
                            {blocks.length > 0 ? (
                                <div className="notion-content">
                                    {blocks.map((block) => (
                                        <div key={block.id} dangerouslySetInnerHTML={{ __html: renderBlockToHtml(block) }} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No content available yet.</p>
                            )}
                        </div>
                    </article>
                ) : (
                    <div className="text-center py-20">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Content Not Available
                        </h1>
                        <p className="text-gray-600 mb-2">
                            The page &quot;{slug}&quot; is not available.
                        </p>
                        <Link
                            href="/"
                            className="text-emerald-600 hover:underline"
                        >
                            Go back home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}