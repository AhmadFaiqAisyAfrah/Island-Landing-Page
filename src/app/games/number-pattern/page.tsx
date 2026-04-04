import Link from "next/link";
import PatternGame from "@/components/PatternGame";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Number Pattern Test – Boost Logic & IQ Skills | Island",
    description: "Solve number sequences and test your logic skills. Challenge your brain and improve your IQ with pattern recognition games.",
};

export default function NumberPatternPage() {
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
                <PatternGame />

                <section className="max-w-[800px] mx-auto mt-8 mb-12 px-4">
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">What is the Number Pattern Test?</h2>
                    <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                        The Number Pattern Test is a logic puzzle game that challenges your ability to identify patterns in number sequences. Each question presents a series of numbers with a hidden rule — your task is to find the next number in the pattern. This IQ-style brain teaser is excellent for developing logical reasoning and analytical thinking skills.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">How to Play the Number Pattern Test</h2>
                    <ol className="list-decimal list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Choose between Endless Mode or Timed Mode (60 seconds).</li>
                        <li>Study the number sequence carefully to identify the pattern.</li>
                        <li>Select the correct answer from four options.</li>
                        <li>Earn points for correct answers — faster answers earn more points.</li>
                        <li>Try to achieve the highest score possible!</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Benefits of Pattern Recognition Training</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li><strong>Enhanced logical thinking</strong> — Pattern analysis strengthens reasoning abilities.</li>
                        <li><strong>Improved problem-solving</strong> — Finding patterns applies to real-world challenges.</li>
                        <li><strong>Better math skills</strong> — Understanding sequences helps with mathematical concepts.</li>
                        <li><strong>Cognitive agility</strong> — Regular practice keeps your mind flexible and sharp.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Tips to Solve Number Patterns Faster</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Look for simple patterns first: addition, subtraction, multiplication.</li>
                        <li>Check if the difference between consecutive numbers is constant.</li>
                        <li>Try dividing to find multiplication or division patterns.</li>
                        <li>Look for alternating patterns or multiple combined rules.</li>
                        <li>Practice with different pattern types to build recognition skills.</li>
                    </ul>

                    <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] mt-10">
                        <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Try Other Brain Training Games</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/games/math-speed" className="text-[var(--accent-green)] hover:underline">Math Speed Challenge</Link>
                            <Link href="/games/memory" className="text-[var(--accent-green)] hover:underline">Memory Card Game</Link>
                            <Link href="/games/focus" className="text-[var(--accent-green)] hover:underline">Focus Test</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
