import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
    try {
        console.log('[API] Fetching ALL posts (no filter)...');
        const posts = await getAllPosts();
        console.log('[API] Returning posts:', posts.length);
        return NextResponse.json({ posts });
    } catch (error) {
        console.error("[API] Error fetching posts:", error);
        return NextResponse.json({ posts: [] }, { status: 500 });
    }
}
