import { NextResponse } from "next/server";
import { getPublishedPosts, getAllProducts } from "@/lib/notion";
import { GAMES_COUNT } from "@/lib/games";

const STUDY_TOOLS_COUNT = 4;

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
    try {
        const [posts, products] = await Promise.all([
            getPublishedPosts(),
            getAllProducts()
        ]);

        console.log("[API] Posts fetched:", posts.length);
        console.log("[API] Products fetched:", products.length);

        const validProducts = products.filter(p => p.slug && p.slug !== 'no-slug');
        console.log("[API] Valid products (with slug):", validProducts.length);

        return NextResponse.json({
            articlesCount: posts.length,
            gamesCount: GAMES_COUNT,
            studyToolsCount: STUDY_TOOLS_COUNT,
            productsCount: validProducts.length,
            appsCount: 1,
            partnersCount: 3
        });
    } catch (error) {
        console.error("[API] Error fetching stats:", error);
        return NextResponse.json({
            articlesCount: 0,
            gamesCount: GAMES_COUNT,
            studyToolsCount: STUDY_TOOLS_COUNT,
            productsCount: 0,
            appsCount: 1,
            partnersCount: 3
        }, { status: 500 });
    }
}
