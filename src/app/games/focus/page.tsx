import Link from "next/link";
import FocusGame from "@/components/FocusGame";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Focus Test – Train Concentration & Attention | Island",
    description: "Test and improve your concentration with focus training games. Click only on targets and avoid distractions to boost your attention span.",
};

export default function FocusPage() {
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
                <FocusGame />

                <section className="max-w-[800px] mx-auto mt-8 mb-12 px-4">
                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">What is the Focus Test?</h2>
                    <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                        The Focus Test is a concentration training game that challenges your ability to maintain focus while ignoring distractions. Click only on green target circles while avoiding all other shapes and colors. This brain training exercise is designed to improve selective attention and impulse control through engaging gameplay.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">How to Play the Focus Test</h2>
                    <ol className="list-decimal list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Choose your game mode: Timed Mode or Lives Mode.</li>
                        <li>Watch for green circles appearing on the screen.</li>
                        <li>Click only on green circles — avoid clicking other shapes.</li>
                        <li>In Timed Mode, survive as long as possible for a high score.</li>
                        <li>In Lives Mode, maintain accuracy while completing objectives.</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Benefits of Focus Training Games</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li><strong>Improved concentration</strong> — Training helps you stay focused longer on tasks.</li>
                        <li><strong>Better impulse control</strong> — Learn to resist clicking on distractions.</li>
                        <li><strong>Enhanced selective attention</strong> — Better ability to focus on what matters.</li>
                        <li><strong>Stress management</strong> — Fun gameplay provides mindful mental breaks.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[var(--heading-text)] mb-6">Tips to Improve Your Focus Game Score</h2>
                    <ul className="list-disc list-inside text-[var(--paragraph-text)] leading-relaxed mb-6 space-y-2">
                        <li>Keep your eyes moving systematically across the screen.</li>
                        <li>Focus on accuracy rather than speed — avoid impulse clicks.</li>
                        <li>Take deep breaths to stay calm during fast-paced rounds.</li>
                        <li>Practice in short sessions for better concentration.</li>
                        <li>Remove external distractions before playing.</li>
                    </ul>

                    <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)] mt-10">
                        <h3 className="text-lg font-semibold text-[var(--heading-text)] mb-4">Try Other Brain Training Games</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/games/reaction" className="text-[var(--accent-green)] hover:underline">Reaction Speed Test</Link>
                            <Link href="/games/memory" className="text-[var(--accent-green)] hover:underline">Memory Card Game</Link>
                            <Link href="/games/typing-speed" className="text-[var(--accent-green)] hover:underline">Typing Speed Test</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
