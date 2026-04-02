import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MemoryGame from "@/components/MemoryGame";

export const metadata: Metadata = {
    title: "Memory Card Game – Train Your Brain Online | Island",
    description:
        "Play a fun memory card game to train your brain. Match pairs of cards and improve your memory skills with this free online game.",
    keywords: [
        "memory game",
        "brain training game",
        "card matching game",
        "improve memory",
        "memory cards",
        "matching game",
        "brain game",
        "memory training",
        "concentration game",
        "free memory game",
    ],
    openGraph: {
        title: "Memory Card Game – Train Your Brain Online | Island",
        description:
            "Play a fun memory card game to train your brain. Match pairs of cards and improve your memory skills with this free online game.",
        type: "website",
        url: "https://islandapp.id/memory-game",
    },
};

export default function MemoryGamePage() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-[1200px] mx-auto px-6 mb-4 pt-24">
                <Link
                    href="/games"
                    className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Learning Games
                </Link>
            </div>

            <MemoryGame />

            <section className="max-w-[800px] mx-auto px-6 py-16 bg-[var(--bg-primary)]">
                <div className="space-y-12 text-[var(--paragraph-text)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What is a Memory Card Game?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            A memory card game is a classic brain training exercise where you flip cards to find matching pairs.
                            The game tests and improves your short-term memory, concentration, and pattern recognition skills.
                            Studies have shown that regular memory training can help maintain cognitive function as we age.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed mt-4">
                            <strong>Skills You Train:</strong> This game exercises visual-spatial memory (remembering card locations),
                            working memory (holding multiple pieces of information simultaneously), selective attention
                            (tracking which cards you&apos;ve seen), and strategic thinking (planning your next flip based
                            on previous observations).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Benefits of Memory Training
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Academic Performance:</strong> Memory games directly correlate with improved performance in subjects requiring recall—languages, history, science, and mathematics all depend on strong memory.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Reduced Cognitive Decline:</strong> Studies at the University of California found that memory training can reduce dementia risk by up to 29% when practiced regularly over 10+ years.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Better Focus and Concentration:</strong> Finding matches requires sustained attention. Regular practice trains your brain to concentrate for longer periods without distraction.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Enhanced Pattern Recognition:</strong> This skill transfers to many real-world tasks—from recognizing faces to identifying trends in data.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Stress Relief:</strong> The simple, repetitive nature of the game creates a meditative effect, reducing stress and anxiety while engaging your brain constructively.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            How to Play
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">1.</span>
                                <span><strong>Select difficulty:</strong> Choose Easy (4×4 grid with 8 pairs), Medium (6×4 grid with 12 pairs), or Hard (8×4 grid with 16 pairs).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">2.</span>
                                <span><strong>Flip the first card:</strong> Click any card to reveal its hidden icon. Try to memorize its position and appearance.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">3.</span>
                                <span><strong>Flip the second card:</strong> Click another card. If it matches the first, both stay face-up. If not, both flip back over after a brief moment.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">4.</span>
                                <span><strong>Match all pairs:</strong> Continue flipping cards and finding matches. Complete the board in the fewest moves to achieve the best score.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why This Matters for Real Life
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Memory is the foundation of learning and daily functioning. Every skill we acquire,
                            every fact we know, every experience we value—all depend on memory. Memory games
                            provide targeted exercise for these essential cognitive functions.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Students and Lifelong Learners</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Imagine remembering names at networking events, dates for history exams, vocabulary
                            for language learning, or formulas for math tests with ease. Memory training
                            strengthens the neural pathways used in all these tasks. Research from MIT shows
                            that spatial memory exercises—like those used in card matching—improve declarative
                            memory by up to 50%, helping you remember facts and experiences more reliably.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Professional Success</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            In the workplace, strong memory helps you remember client names, project details,
                            meeting notes, and procedures without constantly referring to notes. Professionals
                            with excellent memory are perceived as more competent and reliable. Studies show
                            that memory skills correlate with higher performance reviews and faster career
                            advancement.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Brain Health and Longevity</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            The brain is a use-it-or-lose-it organ. Memory training creates new neural connections
                            and strengthens existing ones—a process called neuroplasticity. The Alzheimer&apos;s
                            Association recommends memory exercises as one strategy for maintaining cognitive
                            health. Regular memory training in middle age is associated with significantly lower
                            dementia rates in later years.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Tips to Improve Your Score
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Scan systematically:</strong> Instead of random clicking, mentally divide the grid into sections and scan each area methodically. This prevents missing cards and wasted moves.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Use spatial memory:</strong> Remember cards by their grid position, not just their icon. &quot;Top-left corner has the star&quot; is more efficient than &quot;the star card somewhere.&quot;</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Look for patterns in placement:</strong> Cards are often placed in related groups. If you find one icon in a corner, its match might be nearby.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Practice chunking:</strong> Try to remember groups of 3-4 cards together rather than one at a time. This works your working memory more effectively.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Take your time on first flips:</strong> Spend extra attention on your first look at cards. The initial encoding is crucial—better first impressions mean faster matching later.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Play regularly:</strong> Like physical fitness, cognitive fitness requires consistent practice. 10 minutes daily is more effective than an hour once a week.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Difficulty Levels Explained
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Easy (4×4):</strong> 8 pairs on a 16-card grid. Perfect for beginners, children, or quick warm-up sessions. Expect to complete in 20-40 moves with practice.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Medium (6×4):</strong> 12 pairs on a 24-card grid. A solid challenge for regular brain training. Look to complete in 40-60 moves.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Hard (8×4):</strong> 16 pairs on a 32-card grid. This tests your memory limits. Elite performance is under 60 moves; average completion is 70-90 moves.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Features
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Three difficulty levels: Easy, Medium, and Hard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Real-time tracking of time and moves</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Best score tracking for each difficulty level</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Responsive design for desktop and mobile</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Smooth card flip animations</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
