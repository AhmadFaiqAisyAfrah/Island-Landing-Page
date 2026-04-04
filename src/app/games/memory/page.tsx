import Link from "next/link";
import MemoryGame from "@/components/MemoryGame";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Memory Game Online – Train Your Brain & Focus | Island",
    description: "Play memory card games online and improve your focus. Match pairs and boost your brain performance with fun challenges.",
};

export default function MemoryPage() {
    return (
        <div className="pt-20 md:pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-4xl mx-auto px-4">
                <Link
                    href="/games"
                    className="inline-flex items-center gap-2 text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Games
                </Link>
                <MemoryGame />

                <section className="max-w-[800px] mx-auto mt-8 mb-12 px-4">
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">What is the Memory Card Game?</h2>
                    <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                        The Memory Card Game is an online brain memory training game where you match pairs of hidden cards. Flip two cards at a time to find matching pairs. This classic matching game challenges your short-term memory and visual recognition abilities while providing hours of engaging entertainment.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">How to Play the Memory Card Game</h2>
                    <ol className="list-decimal list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Select your difficulty level: Easy (4x4), Medium (6x6), or Hard (8x8).</li>
                        <li>Click on a card to flip it and reveal its symbol.</li>
                        <li>Click on a second card to try to find a match.</li>
                        <li>If the cards match, they stay revealed. If not, they flip back.</li>
                        <li>Complete the game by matching all pairs in the fewest moves!</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Benefits of Memory Training Games</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li><strong>Enhanced memory retention</strong> — Regular practice strengthens memory pathways.</li>
                        <li><strong>Improved concentration</strong> — Focus training carries over to daily tasks.</li>
                        <li><strong>Cognitive flexibility</strong> — Adapting strategies keeps the brain adaptable.</li>
                        <li><strong>Stress relief</strong> — Fun gameplay provides a relaxing mental break.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Tips to Improve Your Memory Game Score</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Focus on memorizing cards in clusters rather than individually.</li>
                        <li>Use spatial memory — remember card positions on the grid.</li>
                        <li>Take your time on the first few flips to gather information.</li>
                        <li>Practice regularly to build and maintain memory skills.</li>
                        <li>Start with easier levels before progressing to harder grids.</li>
                    </ul>

                    <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] mt-10">
                        <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Try Other Brain Training Games</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/games/number-pattern" className="text-[var(--accent-green)] hover:underline">Number Pattern Test</Link>
                            <Link href="/games/focus" className="text-[var(--accent-green)] hover:underline">Focus Test</Link>
                            <Link href="/games/math-speed" className="text-[var(--accent-green)] hover:underline">Math Speed Challenge</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
