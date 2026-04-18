import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
    try {
        console.log('[API/Articles] Environment check:');
        console.log('[API/Articles] NOTION_TOKEN:', process.env.NOTION_TOKEN ? '✓ Set' : '✗ Missing');
        console.log('[API/Articles] DATABASE_ID:', process.env.DATABASE_ID ? '✓ Set' : '✗ Missing');
        
        const posts = await getPublishedPosts();
        
        console.log('[API/Articles] Fetched posts:', posts.length);
        console.log('[API/Articles] Posts:', posts.map(p => ({ title: p.title, status: p.status })));
        
        const limitedPosts = posts
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
            .slice(0, 3);
            
        return NextResponse.json({ 
            posts: limitedPosts,
            total: posts.length,
            success: true 
        });
    } catch (error) {
        console.error("[API/Articles] Error fetching posts:", error);
        return NextResponse.json({ 
            posts: [], 
            total: 0,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}
