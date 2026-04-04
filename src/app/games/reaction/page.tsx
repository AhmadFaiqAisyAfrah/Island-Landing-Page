import Link from "next/link";
import ReactionGame from "@/components/ReactionGame";
import { ArrowLeft } from "lucide-react";

export default function ReactionPage() {
    return (
        <div className="pt-16 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-4xl mx-auto px-4">
                <Link
                    href="/games"
                    className="inline-flex items-center gap-2 text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors mb-4 p-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Games
                </Link>
                <ReactionGame />
            </div>
        </div>
    );
}
