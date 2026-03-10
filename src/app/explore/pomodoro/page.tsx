import { Metadata } from "next";
import Link from "next/link";
import FocusDemo from "@/components/FocusDemo";
import MonetagInPagePush from "@/components/MonetagInPagePush";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Pomodoro Timer Online – Calm Focus Timer | Island",
    description:
        "A minimalist pomodoro timer designed for deep focus. Start a calm study session and improve productivity with Island Pomodoro Timer.",
    keywords: [
        "pomodoro timer online",
        "study timer online",
        "focus timer",
        "pomodoro technique timer",
        "online pomodoro",
        "productivity timer",
    ],
    openGraph: {
        title: "Pomodoro Timer Online – Calm Focus Timer | Island",
        description:
            "A minimalist pomodoro timer designed for deep focus. Start a calm study session and improve productivity with Island Pomodoro Timer.",
        type: "website",
        url: "https://islandapp.id/explore/pomodoro",
    },
};

export default function PomodoroPage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <div className="max-w-[1200px] mx-auto px-6 mb-4">
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Study Tools
                </Link>
            </div>

            <MonetagInPagePush />
            <FocusDemo />

            {/* SEO Content Section */}
            <section className="max-w-[800px] mx-auto px-6 pb-24 pt-8">
                <div className="space-y-12 text-[var(--paragraph-text)]">

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            What is the Pomodoro Technique?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            The Pomodoro Technique is a time management method that helps people
                            stay focused by working in short sessions followed by breaks. Developed
                            by Francesco Cirillo in the late 1980s, this technique breaks work into
                            intervals — traditionally 25 minutes — separated by short breaks. It is
                            widely used by students and professionals to improve productivity and
                            reduce burnout.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)] mb-4">
                            Why use Island Pomodoro Timer?
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed">
                            Island Pomodoro Timer provides a calm and distraction-free environment
                            designed for deep focus. By combining a minimalist timer with a peaceful
                            interface, Island helps you concentrate better during study sessions,
                            work tasks, or creative projects. Set your session length, start focusing,
                            and watch your island come alive as you build productive habits.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
}
