import Link from "next/link";
import { BookOpen, Gamepad2, Heart, Sparkles } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center bg-[var(--bg-primary)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-primary)] to-[var(--accent-green)]/5" />
            
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-green)]/10 rounded-full mb-8">
                        <Sparkles className="w-4 h-4 text-[var(--accent-green)]" />
                        <span className="text-sm font-medium text-[var(--accent-green)]">Education • Information • Impact</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--heading-text)] mb-6 leading-tight">
                        Island — A Platform for
                        <span className="block bg-gradient-to-r from-[var(--accent-green)] to-[#4DAFB8] bg-clip-text text-transparent">
                            Knowledge, Growth, and Impact
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-[var(--paragraph-text)] max-w-2xl mx-auto mb-10 leading-relaxed">
                        Explore insights, train your brain, and support meaningful change across Indonesia&apos;s islands.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/articles"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent-green)] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                        >
                            <BookOpen className="w-5 h-5" />
                            Explore Articles
                        </Link>
                        <Link
                            href="/games"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--bg-secondary)] text-[var(--heading-text)] rounded-full font-semibold hover:bg-[var(--border-color)] transition-colors border border-[var(--border-color)]"
                        >
                            <Gamepad2 className="w-5 h-5" />
                            Try Learning Games
                        </Link>
                        <Link
                            href="/charity"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--bg-secondary)] text-[var(--heading-text)] rounded-full font-semibold hover:bg-[var(--border-color)] transition-colors border border-[var(--border-color)]"
                        >
                            <Heart className="w-5 h-5 text-red-500" />
                            Support Charity
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                    <path
                        d="M0 80 C240 40 480 95 720 65 C960 35 1200 85 1440 70 L1440 120 L0 120Z"
                        fill="var(--bg-secondary)"
                    />
                </svg>
            </div>
        </section>
    );
}
