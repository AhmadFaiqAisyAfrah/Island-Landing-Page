import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TypingGame from "@/components/TypingGame";

export const metadata: Metadata = {
    title: "Typing Speed Test – Improve Your WPM | Island",
    description:
        "Test and improve your typing speed with Island's free typing speed test. Track your WPM and accuracy to become a faster typist.",
    keywords: [
        "typing test",
        "typing speed",
        "WPM test",
        "typing practice",
        "typing speed test",
        "free typing test",
        "online typing test",
        "typing games",
        "keyboard practice",
    ],
    openGraph: {
        title: "Typing Speed Test – Improve Your WPM | Island",
        description:
            "Test and improve your typing speed with Island's free typing speed test. Track your WPM and accuracy to become a faster typist.",
        type: "website",
        url: "https://islandapp.id/typing-game",
    },
};

export default function TypingGamePage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-[1200px] mx-auto px-6 mb-4">
                <Link
                    href="/games"
                    className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Learning Games
                </Link>
            </div>

            <TypingGame />

            <section className="max-w-[800px] mx-auto px-6 py-16">
                <div className="space-y-12 text-[var(--paragraph-text)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What is a Typing Speed Test?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            A typing speed test measures how fast and accurately you can type on a keyboard.
                            The test calculates your Words Per Minute (WPM) score based on how many
                            characters you type correctly within a given time period. Regular practice
                            can significantly improve your typing speed and reduce errors.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed mt-4">
                            <strong>Skills You Train:</strong> This test develops muscle memory for keyboard
                            layout, hand-eye coordination, rhythm and flow in typing, and the ability to
                            maintain focus over extended periods. These skills form the foundation of efficient
                            computer use in modern workplaces and academic settings.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Benefits of Typing Practice
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Massive Time Savings:</strong> Doubling your typing speed from 40 to 80 WPM can save you 2-3 hours daily if you type frequently. That&apos;s 500-750 hours per year!</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Reduced Physical Strain:</strong> Proper touch typing technique distributes keystroke workload across all fingers, reducing the risk of repetitive strain injuries (RSI).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Improved Focus:</strong> Learning to type without looking at the keyboard frees your visual attention to focus on content quality rather than hunting for keys.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Better Communication:</strong> Faster typing enables more fluid email exchanges, chat conversations, and document creation, improving overall communication efficiency.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Professional Advantage:</strong> Typing speed is a valued skill in virtually every industry. Fast, accurate typing signals professionalism and competence.</span>
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
                                <span><strong>Select your mode:</strong> Choose between Timed Challenge (30 or 60 seconds) or Full Text Mode where you type an entire passage.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">2.</span>
                                <span><strong>Position your hands:</strong> Place your fingers on the home row (ASDF for left hand, JKL; for right hand). The small bumps on F and J help you find them without looking.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">3.</span>
                                <span><strong>Start typing:</strong> The text is displayed above the input area. Type each character exactly as shown. Correct characters turn green, mistakes turn red.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">4.</span>
                                <span><strong>Track your stats:</strong> Watch your real-time WPM and accuracy percentage. Your final results show your complete performance breakdown.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why This Matters for Real Life
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            In our digital age, typing has become a fundamental skill akin to handwriting.
                            Whether you&apos;re writing emails, creating documents, coding software, or messaging
                            colleagues, efficient typing directly impacts your productivity and professional image.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Students</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            University students spend countless hours typing essays, research papers, and notes.
                            A typing speed of 60+ WPM means a 20-page paper that takes others 2 hours can be
                            completed in just 1 hour. More importantly, the focus on accuracy reduces the
                            frustration of corrections and editing, leading to better-written work submitted
                            on time.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Remote Workers</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            With the rise of remote work, communication happens predominantly through written
                            channels. Slack messages, emails, project management tools, and documentation all
                            require rapid, accurate typing. Studies show remote workers who type faster report
                            35% less work-related stress due to keeping up with communication demands.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Developers and Writers</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Programmers who code without looking at the keyboard write code 40% faster according
                            to developer productivity studies. Writers find their creative flow improves when
                            typing speed doesn&apos;t become a bottleneck for their thoughts. The skill directly
                            amplifies output quality and quantity.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Tips to Improve Your WPM Score
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Master the home row first:</strong> Before trying to increase speed, ensure you can type all home row keys (ASDF JKL;) without looking. Build muscle memory with slow, accurate practice.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Don&apos;t look at the keyboard:</strong> This is the biggest barrier to speed. Force yourself to keep your eyes on the screen. You&apos;ll make more mistakes initially but will improve faster long-term.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Practice proper posture:</strong> Sit with feet flat on the floor, back straight, and wrists floating above the keyboard. This prevents fatigue and enables faster typing.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Use all fingers:</strong> Each finger has assigned keys. Using only certain fingers creates a bottleneck. Learn the proper finger placement and discipline yourself to follow it.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Focus on rhythm:</strong> Typing should feel like playing a musical instrument with a steady rhythm. Try to maintain a constant pace rather than stopping and starting.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Accuracy over speed:</strong> A 90% accurate 50 WPM typist outperforms an 70% accurate 70 WPM typist. Focus on reducing errors first, then build speed incrementally.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Understanding WPM Benchmarks
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">•</span>
                                <span><strong>Beginner (20-30 WPM):</strong> Still learning proper technique, frequently looks at keyboard.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">•</span>
                                <span><strong>Average (40-50 WPM):</strong> Most office workers type at this level. Competent but not exceptional.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">•</span>
                                <span><strong>Fast (60-80 WPM):</strong> Professional typist level. Easily handles heavy typing workloads.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">•</span>
                                <span><strong>Elite (90+ WPM):</strong> Rare level achieved through years of dedicated practice. Often achieved by court reporters, transcriptionists, and competitive typists.</span>
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
                                <span>Two game modes: Timed Challenge and Full Text</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Real-time WPM and accuracy tracking</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Visual feedback with color-coded characters</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>High score tracking with local storage</span>
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
