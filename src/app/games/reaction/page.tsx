import Link from "next/link";
import ReactionGame from "@/components/ReactionGame";
import RecommendedArticles from "@/components/RecommendedArticles";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Reaction Speed Test – Measure Your Reflex Time | Island",
    description: "Test your reaction speed online. Click as fast as possible when the screen changes and measure your reflex time in milliseconds.",
};

export default function ReactionPage() {
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
                <ReactionGame />

                <section className="max-w-[800px] mx-auto mt-8 mb-12 px-4">
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">What is a Reaction Speed Test?</h2>
                    <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                        A reaction speed test measures how quickly you respond to a visual stimulus. It is commonly used to assess reflexes and cognitive performance. This online reaction time test challenges you to click as fast as possible when the screen changes color, providing your reaction time in milliseconds. Studies show that average human reaction time ranges from 200 to 300 milliseconds.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">How to Play the Reaction Speed Test</h2>
                    <ol className="list-decimal list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Click the &quot;Start&quot; button to begin the test.</li>
                        <li>Wait for the screen to change from red to green.</li>
                        <li>Click as fast as you can the moment you see green.</li>
                        <li>Complete 5 rounds to get your average reaction time.</li>
                        <li>Track your progress and try to beat your personal best!</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Benefits of Playing Reaction Speed Tests</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li><strong>Improves reflexes</strong> — Regular practice helps your brain process visual information faster.</li>
                        <li><strong>Enhances focus</strong> — Training your attention to stay alert improves concentration.</li>
                        <li><strong>Cognitive training</strong> — Speed-based exercises keep your mind sharp and agile.</li>
                        <li><strong>Fun brain exercise</strong> — An engaging way to challenge yourself daily.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Tips to Improve Your Reaction Time</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Stay relaxed and avoid tensing up before the test.</li>
                        <li>Focus your gaze on the center of the screen.</li>
                        <li>Avoid distractions and find a quiet environment.</li>
                        <li>Get adequate sleep — fatigue slows reaction times significantly.</li>
                        <li>Practice regularly to see improvement over time.</li>
                    </ul>

                    <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] mt-10">
                        <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Try Other Brain Training Games</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/games/typing-speed" className="text-[var(--accent-green)] hover:underline">Typing Speed Test</Link>
                            <Link href="/games/math-speed" className="text-[var(--accent-green)] hover:underline">Math Speed Challenge</Link>
                            <Link href="/games/memory" className="text-[var(--accent-green)] hover:underline">Memory Card Game</Link>
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
