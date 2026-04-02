import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactionGame from "@/components/ReactionGame";

export const metadata: Metadata = {
    title: "Reaction Speed Test – Measure Your Reflex Time | Island",
    description:
        "Test your reaction speed in milliseconds. Click as fast as possible and improve your reflexes with this fun online game.",
    keywords: [
        "reaction time test",
        "reflex test",
        "click speed test",
        "brain reaction game",
        "reaction speed",
        "reflex game",
        "speed test online",
        "reaction game",
        " reflexes",
        "fast click game",
    ],
    openGraph: {
        title: "Reaction Speed Test – Measure Your Reflex Time | Island",
        description:
            "Test your reaction speed in milliseconds. Click as fast as possible and improve your reflexes with this fun online game.",
        type: "website",
        url: "https://islandapp.id/reaction-test",
    },
};

export default function ReactionTestPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <div className="absolute top-4 left-4 z-50">
                <Link
                    href="/games"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur text-[var(--paragraph-text)] rounded-full text-sm hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Games
                </Link>
            </div>

            <ReactionGame />

            <section className="max-w-[800px] mx-auto px-6 py-16 bg-[var(--bg-primary)]">
                <div className="space-y-12 text-[var(--paragraph-text)]">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What is a Reaction Speed Test?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            A reaction speed test measures how quickly your brain can process and respond to
                            visual stimuli. The test displays a screen that changes color, and you must click
                            as soon as it turns green. Your reaction time is measured in milliseconds (ms),
                            with faster times indicating better reflexes.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed mt-4">
                            <strong>Skills You Train:</strong> This test develops visual processing speed,
                            motor response coordination, sustained attention, and impulse control. These
                            abilities are fundamental to nearly every physical and cognitive task we perform
                            in daily life.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Benefits of Reaction Time Training
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Enhanced Driving Safety:</strong> Faster reaction time can mean the difference between a near-miss and a collision. Studies show a 200ms improvement in reaction time reduces accident risk by 40%.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Sports Performance:</strong> Athletes with faster reactions have significant advantages in tennis, boxing, baseball, martial arts, and virtually every sport involving timing.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Improved Gaming:</strong> Competitive gamers often have reaction times under 200ms. Faster reactions mean better performance in action games, fighting games, and real-time strategy titles.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Better Hand-Eye Coordination:</strong> Training reaction time improves the communication between your eyes, brain, and hands—essential for everything from cooking to surgery.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Cognitive Sharpness:</strong> Fast reactions indicate healthy neural pathways and efficient brain processing, markers of overall cognitive health.</span>
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
                                <span><strong>Choose your mode:</strong> Select Quick Test for a single reaction measurement, or Multi-Round for 5 consecutive tests to get a more reliable average.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">2.</span>
                                <span><strong>Wait for the screen:</strong> The screen will display &quot;Wait...&quot; in red. Do not click yet—this tests your ability to resist premature responses.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">3.</span>
                                <span><strong>Click when green:</strong> When the screen turns green and shows &quot;CLICK NOW!&quot;, click or press Space/Enter as quickly as possible.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">4.</span>
                                <span><strong>Review your result:</strong> Your reaction time appears instantly. The Multi-Round mode calculates your average and shows all individual round results.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Understanding Your Results
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Under 200ms (Excellent):</strong> You have lightning-fast reflexes. This is the reaction time of elite athletes, professional esports players, and martial artists.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span><strong>200-300ms (Good):</strong> Above average reaction time. You have excellent reflexes that serve you well in daily activities and sports.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500 mt-1">✓</span>
                                <span><strong>300-400ms (Average):</strong> Normal reaction time for most healthy adults. Regular practice can help you improve into the &quot;Good&quot; range.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✓</span>
                                <span><strong>Over 400ms (Slow):</strong> Your reaction time could benefit from brain training exercises. Many factors like sleep, stress, and age can affect this.</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why This Matters for Real Life
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Reaction time affects countless daily activities, often without us realizing it.
                            Every time you brake suddenly, catch a falling object, or respond to someone&apos;s
                            question, you&apos;re relying on your reaction speed. Faster reactions make you
                            safer, more responsive, and more capable in physical challenges.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Driving Safety</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            The average car traveling at 60 mph covers 88 feet per second. If your reaction
                            time is 300ms instead of 250ms, you need an additional 14 feet to stop—more than
                            a car length. At highway speeds, this difference can be life-saving. Professional
                            driving schools specifically train reaction time because it&apos;s so critical to safety.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Athletes</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            In professional sports, the difference between winning and losing often comes
                            down to milliseconds. A tennis player&apos;s 150ms reaction to a serve, a baseball
                            player&apos;s split-second swing timing, a football player&apos;s response to a snap—these
                            athletes spend years training their reactions. Even recreational athletes benefit
                            significantly from improved reaction time.
                        </p>
                        <h3 className="text-xl font-bold text-[var(--heading-text)] mt-6 mb-3">For Brain Health</h3>
                        <p className="text-base md:text-lg leading-relaxed">
                            Research published in the journal Nature shows that reaction time is one of the
                            best measures of cognitive aging. Slower reactions often indicate declining
                            neural processing speed, which can be an early sign of cognitive decline.
                            Regular reaction training helps maintain neural pathway efficiency, potentially
                            slowing cognitive aging.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Tips to Improve Your Reaction Time
                        </h2>
                        <ul className="space-y-3 text-base md:text-lg leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Get adequate sleep:</strong> Fatigue is the single biggest factor slowing reaction time. Even one night of poor sleep can reduce reaction speed by 30%. Aim for 7-9 hours consistently.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Practice regularly:</strong> Like any skill, reaction time improves with practice. Play reaction games daily for 10-15 minutes. Research shows improvement within 2-3 weeks.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Eliminate distractions:</strong> Before testing, close unnecessary apps and find a quiet space. Distractions delay your response even if you don&apos;t consciously notice them.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Stay physically active:</strong> Regular aerobic exercise improves blood flow to the brain and has been shown to reduce reaction times by 20-30ms on average.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Use keyboard shortcuts:</strong> Training yourself to use Space or Enter for quick responses (instead of mouse clicking) can improve your speed in this test and real applications.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span><strong>Warm up:</strong> Just like physical exercise, your brain benefits from a warm-up. Do a few practice rounds before attempting your official best time.</span>
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
                                <span>Quick Test mode for single reaction measurement</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Multi-Round mode with 5 rounds for more accurate results</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>High score tracking with local storage</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[var(--accent-green)] mt-1">✓</span>
                                <span>Performance labels: Excellent, Good, Average, Slow</span>
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
