import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FocusGame from "@/components/FocusGame";

export const metadata: Metadata = {
    title: "Focus Test Game – Improve Concentration Online | Island",
    description:
        "Test and improve your concentration with this focus game. Click only the correct targets while ignoring distractions. Train your brain to stay focused!",
    keywords: [
        "focus test",
        "attention game",
        "concentration game",
        "brain focus training",
        "focus training",
        "distraction game",
        "attention span",
        "brain game",
        "concentration test",
        "online focus game",
    ],
    openGraph: {
        title: "Focus Test Game – Improve Concentration Online | Island",
        description:
            "Test and improve your concentration with this focus game. Click only the correct targets while ignoring distractions. Train your brain to stay focused!",
        type: "website",
        url: "https://islandapp.id/focus-test",
    },
};

export default function FocusTestPage() {
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

            <FocusGame />

            <section className="max-w-[800px] mx-auto px-6 py-16 bg-[var(--bg-primary)]">
                <div className="space-y-12 text-[var(--paragraph-text)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What is a Focus Test?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            A focus test measures your ability to concentrate on a specific task while ignoring
                            distractions. In this game, you must click only on green circles while avoiding all other
                            shapes and colors. This tests your selective attention — the ability to focus on what matters
                            while filtering out irrelevant information.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed mt-4">
                            <strong>Skills You Train:</strong> This game develops selective attention (focusing on
                            relevant stimuli), inhibitory control (suppressing impulses to click distractions),
                            visual discrimination (distinguishing similar objects), and sustained concentration
                            (maintaining focus over extended periods). These are foundational executive function skills.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Benefits of Focus Training
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Improved Productivity:</strong> A Harvard study found that workers lose up to 2.5 hours daily to distraction recovery. Better focus means faster task completion and less cognitive fatigue.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Enhanced Learning:</strong> Students with stronger focus retain 40% more information and score higher on tests. Focus enables deep learning rather than surface-level cramming.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Better Decision Making:</strong> Focused minds make fewer errors and catch details that distracted minds miss. This translates to better quality work across all domains.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Reduced Stress:</strong> Constant context-switching and distraction causes mental exhaustion. Training focus helps you complete tasks without the cognitive overload of multitasking.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Executive Function Development:</strong> Focus is a core executive function skill. Research shows strong executive function predicts success in school, career, and even health outcomes.</span>
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
                                <span><strong>Choose your mode:</strong> Timed Mode challenges you to score as high as possible in 60 seconds. Lives Mode gives you 3 lives—each mistake costs one life.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">2.</span>
                                <span><strong>Watch for green circles:</strong> Green circles appear on screen with various shapes and colors. Click ONLY the green circles to score points.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">3.</span>
                                <span><strong>Avoid all other shapes:</strong> Red circles, yellow squares, blue triangles—anything that isn&apos;t a green circle is a trap. Clicking distractions costs you points or lives.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">4.</span>
                                <span><strong>Watch your accuracy:</strong> Your accuracy percentage is displayed. High scores require both speed AND precision—clicking fast means nothing if you click wrong.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Game Modes Explained
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Timed Mode (60s):</strong> Race against the clock to maximize your score. Wrong clicks subtract points, so accuracy matters. Best for players who want to push their speed limits.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Lives Mode:</strong> 3 lives creates natural stopping points and consequences for mistakes. Best for focused practice where every click matters. Game ends when all lives are lost.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why This Matters for Real Life
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            In an age of constant notifications, emails, and digital distractions, the ability
                            to focus is becoming increasingly rare and valuable. The average person checks their
                            phone 96 times per day—every check interrupts focus and requires recovery time.
                            Training selective attention helps you maintain concentration despite these interruptions.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Students and Researchers</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Academic success increasingly depends on sustained attention during lectures, while
                            reading complex texts, and during exams. Studies show that focused students spend
                            50% less time studying yet achieve better grades. The ability to filter out
                            distractions—phone notifications, environmental noise, wandering thoughts—is
                            essential for deep learning and knowledge retention.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Remote Workers</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Working from home presents unique focus challenges. The average remote worker
                            experiences 50% more interruptions than office workers due to home environment
                            distractions. Companies like Microsoft and Google report that focus training
                            improves remote worker productivity by 25%. The ability to selectively attend
                            to work tasks while ignoring household activities is a superpower in the modern workplace.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Drivers and Operators</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Selective attention is literally life-saving on the road. Distracted driving causes
                            25% of all accidents. The ability to focus on relevant information (road conditions,
                            other vehicles) while ignoring distractions (phones, billboards, passengers) is
                            fundamental to road safety. This game directly trains the same attention mechanisms
                            used in safe driving.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Tips to Improve Your Score
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Establish a search pattern:</strong> Don&apos;t randomly scan. Systematically sweep the screen—top to bottom, left to right—to ensure you don&apos;t miss targets or falsely click distractions.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Look for the color first:</strong> Your brain processes color faster than shape. Train yourself to identify green before processing shape—this saves precious reaction time.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Move your eyes, not your cursor:</strong> Instead of moving your mouse to search, keep your cursor central and move your eyes. This is faster and more accurate.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Ignore the numbers:</strong> Don&apos;t count targets or track your score mid-game. Focus entirely on the visual search task—let the score take care of itself.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Use peripheral vision:</strong> Your peripheral vision is excellent at detecting movement and color. Keep your gaze central and use your periphery to spot green circles.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Play regularly:</strong> Focus is a trainable skill. Just 10 minutes daily improves measurable attention metrics within 2-3 weeks according to cognitive training studies.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            The Science of Selective Attention
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Your brain processes over 11 million bits of information per second, but your
                             conscious mind can only handle about 40-50 bits. Selective attention is the
                            filter that determines what gets through. The famous &quot;invisible gorilla&quot; experiment
                            demonstrates that even when information is directly in front of us, we often
                            fail to see it due to attentional blindness.
                        </p>
                            <p className="text-base md:text-lg leading-relaxed mt-4">
                            This focus test trains your brain&apos;s selective attention system, particularly
                            the parietal lobe and prefrontal cortex regions responsible for visual attention.
                            Regular practice strengthens these neural pathways, improving your real-world
                            ability to stay focused despite distractions.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Features
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Two game modes: Timed (60s) and Lives (3 lives)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Progressive difficulty with faster spawning</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Accuracy tracking</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>High score tracking for each mode</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Responsive design for desktop and mobile</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
