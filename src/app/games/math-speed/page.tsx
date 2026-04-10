import Link from "next/link";
import MathGame from "@/components/MathGame";
import RecommendedArticles from "@/components/RecommendedArticles";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Math Speed Test – Improve Your Mental Math Skills | Island",
    description: "Challenge your brain with fast math problems. Improve your mental calculation speed with addition, subtraction, and more.",
};

export default function MathSpeedPage() {
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
                <MathGame />

                <section className="max-w-[800px] mx-auto mt-8 mb-12 px-4">
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">What is the Math Speed Challenge?</h2>
                    <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                        The Math Speed Challenge is an arithmetic speed test that tests your mental math abilities. Solve addition, subtraction, multiplication, and division problems as fast as possible. This mental math practice helps sharpen your calculation skills and keeps your brain active with fun mathematical challenges.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">How to Play the Math Speed Challenge</h2>
                    <ol className="list-decimal list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Click &quot;Play&quot; to start the game with 3 lives.</li>
                        <li>Solve each math problem by selecting the correct answer.</li>
                        <li>Earn points for every correct answer — the faster, the better.</li>
                        <li>Missing a question costs you one life.</li>
                        <li>Reach the target score to complete the level!</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Benefits of Mental Math Practice</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li><strong>Improved calculation speed</strong> — Daily practice makes mental arithmetic effortless.</li>
                        <li><strong>Better problem-solving skills</strong> — Math training enhances logical thinking.</li>
                        <li><strong>Confidence boost</strong> — Mastering arithmetic builds confidence in math abilities.</li>
                        <li><strong>Cognitive development</strong> — Math exercises strengthen neural pathways.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Tips to Improve Your Math Speed</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Practice multiplication tables until they become automatic.</li>
                        <li>Break down complex problems into simpler steps.</li>
                        <li>Focus on accuracy first — speed will come with practice.</li>
                        <li>Use estimation to quickly eliminate wrong answers.</li>
                        <li>Challenge yourself with increasingly difficult problems.</li>
                    </ul>

                    <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] mt-10">
                        <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Try Other Brain Training Games</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/games/typing-speed" className="text-[var(--accent-green)] hover:underline">Typing Speed Test</Link>
                            <Link href="/games/number-pattern" className="text-[var(--accent-green)] hover:underline">Number Pattern Test</Link>
                            <Link href="/games/reaction" className="text-[var(--accent-green)] hover:underline">Reaction Speed Test</Link>
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-16 bg-[var(--bg-primary)]">
                <RecommendedArticles />
            </div>
        </div>
    );
}
