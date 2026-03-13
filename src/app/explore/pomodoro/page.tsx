import { Metadata } from "next";
import Link from "next/link";
import FocusDemo from "@/components/FocusDemo";
import FocusNotebooks from "@/components/FocusNotebooks";
import MonetagInPagePush from "@/components/MonetagInPagePush";
import { ArrowLeft } from "lucide-react";
import { readdir } from "node:fs/promises";
import path from "node:path";

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

const LABEL_MAP: Record<string, string> = {
    forest_vibes: "Forest",
    night_vibes: "Midnight",
    ocean_vibes: "Ocean",
    rainy_vibes: "Rainy",
    snow_vibes: "Snow",
};

const EMOJI_MAP: Record<string, string> = {
    none: "🔇",
    forest_vibes: "🌲",
    night_vibes: "🌙",
    ocean_vibes: "🌊",
    rainy_vibes: "🌧️",
    snow_vibes: "❄️",
};

const ORDER_MAP: Record<string, number> = {
    forest_vibes: 1,
    night_vibes: 2,
    ocean_vibes: 3,
    rainy_vibes: 4,
    snow_vibes: 5,
};

type MusicOption = {
    value: string;
    label: string;
    emoji: string;
    src: string | null;
};

const formatLabel = (baseName: string) => {
    if (LABEL_MAP[baseName]) {
        return LABEL_MAP[baseName];
    }

    return baseName
        .replaceAll("_", " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getMusicOptions = async (): Promise<MusicOption[]> => {
    const audioDir = path.join(process.cwd(), "public", "audio");
    const entries = await readdir(audioDir, { withFileTypes: true });

    const tracks: MusicOption[] = entries
        .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".ogg"))
        .map((entry) => {
            const fileName = entry.name;
            const baseName = fileName.replace(/\.ogg$/i, "");

            return {
                value: baseName,
                label: formatLabel(baseName),
                emoji: EMOJI_MAP[baseName] ?? "🎵",
                src: `/audio/${fileName}`,
                sortOrder: ORDER_MAP[baseName] ?? 999,
            };
        })
        .sort((a, b) => {
            if (a.sortOrder !== b.sortOrder) {
                return a.sortOrder - b.sortOrder;
            }

            return a.label.localeCompare(b.label);
        })
        .map((track) => ({
            value: track.value,
            label: track.label,
            emoji: track.emoji,
            src: track.src,
        }));

    return [{ value: "none", label: "None", emoji: EMOJI_MAP.none, src: null }, ...tracks];
};

export default async function PomodoroPage() {
    const musicOptions = await getMusicOptions();

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
            <FocusDemo musicOptions={musicOptions} />
            <FocusNotebooks />

            {/* Download Island CTA */}
            <div className="py-24 bg-[var(--bg-primary)]">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-[var(--paragraph-text)] mb-6 text-lg">
                            Unlock the full island experience in the Island app. Focus sessions, tree variety, daily journals, and more.
                        </p>
                        <Link
                            href="https://play.google.com/store/apps/details?id=com.ahmadfaiq.island"
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--button-bg)] text-[var(--button-text)] rounded-full font-medium hover:bg-[var(--button-hover)] transition-all hover:scale-105"
                        >
                            Download Island on Google Play
                        </Link>
                    </div>
                </div>
            </div>

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
