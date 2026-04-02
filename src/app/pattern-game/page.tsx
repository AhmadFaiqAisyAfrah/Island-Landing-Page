import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PatternGame from "@/components/PatternGame";

export const metadata: Metadata = {
    title: "Number Pattern Test – IQ Brain Game Online | Island",
    description:
        "Challenge your logic and IQ with number patterns. Find the next number in the sequence and test your brain with this fun online puzzle game.",
    keywords: [
        "number pattern test",
        "IQ test game",
        "brain puzzle",
        "sequence game",
        "pattern recognition",
        "logic puzzle",
        "number sequence",
        "brain training",
        "mental challenge",
        "IQ game online",
    ],
    openGraph: {
        title: "Number Pattern Test – IQ Brain Game Online | Island",
        description:
            "Challenge your logic and IQ with number patterns. Find the next number in the sequence and test your brain with this fun online puzzle game.",
        type: "website",
        url: "https://islandapp.id/pattern-game",
    },
};

export default function PatternGamePage() {
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

            <PatternGame />

            <section className="max-w-[800px] mx-auto px-6 py-16 bg-[var(--bg-primary)]">
                <div className="space-y-12 text-[var(--paragraph-text)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What is a Number Pattern Test?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            A number pattern test challenges your logical thinking by presenting a sequence of numbers
                            and asking you to identify the next number in the pattern. These types of puzzles are commonly
                            found in IQ tests and are excellent for training your brain to recognize mathematical relationships
                            and sequences.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed mt-4">
                            <strong>Skills You Train:</strong> This game develops logical reasoning, mathematical
                            intuition, analytical thinking, and the ability to identify relationships between
                            numbers. These cognitive abilities are fundamental to problem-solving in mathematics,
                            science, programming, and strategic decision-making.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Benefits of Pattern Recognition Training
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Improved Problem-Solving:</strong> Pattern recognition is at the heart of all problem-solving. Recognizing patterns helps you break down complex problems into simpler, solvable components.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Better Test Performance:</strong> Pattern-based questions appear on SAT, GRE, GMAT, IQ tests, and civil service exams. Regular practice dramatically improves scores on these assessments.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Enhanced Data Analysis:</strong> In business and research, spotting trends and patterns in data drives better decisions. This skill distinguishes exceptional analysts from average ones.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Programming and Coding:</strong> Programmers who recognize code patterns write software faster and with fewer errors. Pattern recognition is foundational to algorithmic thinking.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Cognitive Reserve Building:</strong> Studies show that challenging mental exercises like pattern puzzles build cognitive reserve, providing protection against memory loss and cognitive decline.</span>
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
                                <span><strong>Choose your mode:</strong> Select Endless Mode (3 lives) for unlimited challenges, or Timed Mode (60 seconds) to test how many patterns you can solve under pressure.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">2.</span>
                                <span><strong>Study the sequence:</strong> Look carefully at the number sequence displayed. Try to identify the mathematical relationship between consecutive numbers.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">3.</span>
                                <span><strong>Select your answer:</strong> Choose the correct next number from four options. In Endless Mode, wrong answers cost a life. In Timed Mode, you race against the clock.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">4.</span>
                                <span><strong>Track your score:</strong> Your score increases with each correct answer. Beat your personal best and climb the leaderboard!</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Pattern Types You Will Encounter
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Arithmetic sequences:</strong> Numbers increase or decrease by a constant value (e.g., 2, 4, 6, 8... answer: 10). Find the common difference.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Geometric sequences:</strong> Numbers are multiplied by a constant (e.g., 3, 6, 12, 24... answer: 48). Find the common ratio.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Fibonacci-like sequences:</strong> Each number is the sum of the previous two (e.g., 1, 1, 2, 3, 5... answer: 8).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Alternating patterns:</strong> Two different operations applied alternately (e.g., +3, ×2, +3, ×2... keep alternating).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Square sequences:</strong> Perfect squares (1, 4, 9, 16...) or variations involving squares.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why This Matters for Real Life
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Pattern recognition is one of the most valuable cognitive skills because it
                            underlies so many real-world competencies. From predicting market trends to
                            diagnosing diseases, from optimizing routes to understanding language—patterns
                            are everywhere.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Academic Success</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Standardized tests like the SAT, GRE, and GMAT all include pattern recognition
                            questions. Medical boards, law school admissions, and civil service exams all
                            test this skill. Students who train pattern recognition see average score
                            improvements of 15-25% on these high-stakes assessments. Beyond testing,
                            strong pattern skills make learning new subjects faster and more intuitive.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Technology Careers</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Programming is essentially pattern recognition at scale. Coders who recognize
                            algorithmic patterns write programs faster and more efficiently. Data scientists
                            use pattern recognition to find insights in data. Even non-technical careers
                            increasingly require analytical thinking—pattern recognition training develops
                            exactly this skill set.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Everyday Intelligence</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            We all use pattern recognition constantly—predicting traffic patterns to plan
                            commutes, recognizing social cues in conversations, identifying signs of
                            mechanical problems before they fail. Sharp pattern recognition makes you
                            more perceptive and better equipped to navigate complex situations.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Tips to Improve Your Score
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Calculate differences first:</strong> Always check the difference between consecutive numbers first. If the differences are constant, you have an arithmetic sequence.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Check the ratios:</strong> If differences aren&apos;t constant, try dividing consecutive numbers. A constant ratio indicates a geometric sequence.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Look for multiple operations:</strong> Some sequences alternate between two operations. Check if +3, ×2, +3, ×2 pattern exists.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Consider squares and cubes:</strong> Numbers like 1, 4, 9, 16 are squares (1², 2², 3², 4²). 1, 8, 27 are cubes (1³, 2³, 3³).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Test your hypothesis:</strong> Once you think you&apos;ve found the pattern, verify it works for all given numbers before selecting your answer.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Practice mental math:</strong> Strong arithmetic skills make pattern recognition faster. Practice basic operations until they&apos;re automatic.</span>
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
                                <span>Two game modes: Endless with 3 lives, or Timed 60-second challenge</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Multiple pattern types including arithmetic, geometric, Fibonacci, and more</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Instant feedback on answers with visual cues</span>
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
