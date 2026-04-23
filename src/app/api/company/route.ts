import { NextResponse } from "next/server";
import { getCompanyPages } from "@/lib/notion";

export async function GET() {
    try {
        console.log('[API /company] DB ID from env:', process.env.NOTION_DATABASE_ID_COMPANY ? 'SET' : 'MISSING');
        const data = await getCompanyPages();
        
        // Sort by order field (ascending)
        const sortedData = [...data].sort((a, b) => a.order - b.order);
        
        console.log('[API /company] Returning:', sortedData.length, 'pages');
        console.log('[API /company] Sorted order:', sortedData.map(p => `${p.title} (${p.order})`).join(', '));
        
        return NextResponse.json(sortedData);
    } catch (error) {
        console.error("Company API error:", error);
        return NextResponse.json([], { status: 500 });
    }
}
