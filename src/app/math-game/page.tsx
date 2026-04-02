import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MathGame from "@/components/MathGame";

export const metadata: Metadata = {
    title: "Math Speed Challenge – Train Your Brain Fast | Island",
    description:
        "Play a fast-paced math game to improve your calculation speed. Fun, challenging, and perfect for daily brain training.",
    keywords: [
        "math game",
        "brain training",
        "mental math",
        "speed math",
        "math game online",
        "brain games",
        "calculation training",
        "math practice",
        "daily brain training",
        "number games",
    ],
    openGraph: {
        title: "Math Speed Challenge – Train Your Brain Fast | Island",
        description:
            "Play a fast-paced math game to improve your calculation speed. Fun, challenging, and perfect for daily brain training.",
        type: "website",
        url: "https://islandapp.id/math-game",
    },
};

export default function MathGamePage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-[1200px] mx-auto px-6 mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            <MathGame />

            <section className="max-w-[800px] mx-auto px-6 py-16">
                <div className="space-y-12 text-[var(--paragraph-text)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What is Math Speed Challenge?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Math Speed Challenge is a fast-paced brain training game designed to improve your
                            mental calculation speed. Answer math questions across four operations: addition,
                            subtraction, multiplication, and division. The difficulty scales as you progress,
                            starting with simple numbers and ramping up to more complex calculations.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed mt-4">
                            <strong>Skills You Train:</strong> This game develops rapid mental arithmetic abilities,
                            working memory (holding numbers while calculating), number sense, and the ability to
                            perform under time pressure. These cognitive skills transfer directly to real-world
                            mathematical reasoning and problem-solving tasks.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Benefits of Mental Math Training
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Enhanced Cognitive Function:</strong> Regular mental math practice strengthens neural pathways in the brain, improving overall cognitive performance and processing speed.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Better Number Sense:</strong> Develops intuitive understanding of numbers, relationships, and mathematical patterns that help in everyday calculations.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Improved Concentration:</strong> Racing against the clock while maintaining accuracy trains your brain to focus intensely and filter out distractions.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Reduced Math Anxiety:</strong> Regular practice builds confidence with numbers and reduces fear of mathematical tasks in academic and professional settings.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Quick Decision Making:</strong> Improves your ability to think quickly and make accurate decisions under pressure.</span>
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
                                <span><strong>Choose your operation:</strong> Select from addition, subtraction, multiplication, or division—or play all four combined.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">2.</span>
                                <span><strong>Answer quickly:</strong> Solve each math problem before time runs out. Select the correct answer from multiple choices.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">3.</span>
                                <span><strong>Watch your lives:</strong> You start with 3 lives. Each wrong answer costs one life. Game over when all lives are lost.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">4.</span>
                                <span><strong>Beat your high score:</strong> The longer you survive, the higher your score. Try to beat your personal best!</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why This Matters for Real Life
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Mental math skills are surprisingly valuable in everyday situations. When shopping,
                            you can quickly calculate discounts and compare prices. In the kitchen, recipe
                            adjustments become effortless. Managing finances—calculating tips, interest rates,
                            or budget allocations—becomes second nature.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Students</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Strong mental math abilities reduce dependency on calculators, leading to faster
                            test completion and deeper understanding of mathematical concepts. Studies show
                            students who practice mental math perform better in standardized tests and have
                            higher math grades throughout their education.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Professionals</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Quick mental calculations impress in business settings. From estimating project
                            timelines to calculating data proportions, mental math skills demonstrate
                            analytical capability and boost professional credibility.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Brain Health</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Research from Stanford University shows that mental math training activates
                            multiple brain regions, creating more neural connections. This cognitive exercise
                            helps maintain mental sharpness as we age and may reduce the risk of cognitive
                            decline. Think of it as a workout for your brain&apos;s numerical processing center.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Tips to Improve Your Score
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Master multiplication tables:</strong> If multiplication is slow, memorize times tables up to 12. This eliminates the need to calculate and saves precious seconds.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Practice the lattice method:</strong> This visual technique makes complex multiplications easier to solve mentally.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Learn chunking strategies:</strong> Break large numbers into smaller parts. For example, 47 + 38 = (47 + 30) + 8 = 77 + 8 = 85.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Use number complements:</strong> For subtraction, think of what you need to add to reach the minuend. For 100 - 37, add 3 to get to 40, then add 60 to reach 100: answer is 63.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Focus on accuracy first:</strong> Speed comes naturally with practice. Prioritize getting answers right, then gradually increase your pace.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Play daily:</strong> Just 5-10 minutes of daily practice leads to significant improvement within 2-3 weeks.</span>
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
                                <span>Four math operations: addition, subtraction, multiplication, division</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Adaptive difficulty that grows with your skill level</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>3 lives system with visual feedback for correct and wrong answers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>High score tracking with local storage persistence</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Responsive design optimized for mobile and desktop</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
