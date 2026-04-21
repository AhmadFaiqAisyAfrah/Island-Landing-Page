import { NextResponse } from "next/server";
import { getCompanyPages } from "@/lib/notion";

export async function GET() {
    try {
        const data = await getCompanyPages();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Company API error:", error);
        return NextResponse.json([], { status: 500 });
    }
}
