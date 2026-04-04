import Link from "next/link";
import TypingGame from "@/components/TypingGame";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Typing Speed Test – Check Your WPM & Accuracy | Island",
    description: "Test your typing speed and accuracy online. Measure your WPM and improve your typing skills with real-time results.",
};

export default function TypingSpeedPage() {
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
                <TypingGame />

                <section className="max-w-[800px] mx-auto mt-8 mb-12 px-4">
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">What is a Typing Speed Test?</h2>
                    <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                        A typing speed test measures how fast and accurately you can type on a keyboard. It calculates your words per minute (WPM) score based on your typing speed. Whether you are learning to type or want to improve your productivity, a WPM test helps you track your progress and set goals for improvement.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">How to Play the Typing Speed Challenge</h2>
                    <ol className="list-decimal list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Choose between Timed Mode (1-3 minutes) or Full Text Mode.</li>
                        <li>Start typing the displayed sentence exactly as shown.</li>
                        <li>Your WPM and accuracy are calculated in real-time.</li>
                        <li>Complete the challenge to see your final score.</li>
                        <li>Review your mistakes and try to beat your high score!</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Benefits of Typing Speed Practice</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li><strong>Increased productivity</strong> — Faster typing speeds save hours of work time.</li>
                        <li><strong>Better accuracy</strong> — Practice reduces typing errors significantly.</li>
                        <li><strong>Professional skill</strong> — High WPM scores are valued in many careers.</li>
                        <li><strong>Brain exercise</strong> — Hand-eye coordination keeps your mind active.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Tips to Improve Your Typing Speed</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Learn to type without looking at the keyboard (touch typing).</li>
                        <li>Focus on accuracy first — speed will follow naturally.</li>
                        <li>Keep your fingers positioned correctly on the home row.</li>
                        <li>Practice regularly with diverse text content.</li>
                        <li>Maintain proper posture and relaxed hands while typing.</li>
                    </ul>

                    <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] mt-10">
                        <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Try Other Brain Training Games</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/games/math-speed" className="text-[var(--accent-green)] hover:underline">Math Speed Challenge</Link>
                            <Link href="/games/reaction" className="text-[var(--accent-green)] hover:underline">Reaction Speed Test</Link>
                            <Link href="/games/focus" className="text-[var(--accent-green)] hover:underline">Focus Test</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
