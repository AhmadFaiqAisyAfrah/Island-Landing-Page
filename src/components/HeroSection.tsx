import IslandSVG from "./IslandSVG";
import CloudSVG from "./CloudSVG";
import LaunchpadSlider from "./LaunchpadSlider";

export default function HeroSection() {
    return (
        <section className="relative flex flex-col items-center pt-20 bg-[var(--bg-primary)]">
            {/* Sky gradient background — softer, dreamier */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to bottom, var(--hero-from), var(--hero-via), var(--hero-to))",
                }}
            />

            {/* Animated clouds — multiple layers for depth */}
            <div className="absolute top-12 left-0 w-44 opacity-50 animate-drift-right">
                <CloudSVG variant="soft" />
            </div>
            <div className="absolute top-28 right-0 w-56 opacity-35 animate-drift-left delay-2000">
                <CloudSVG />
            </div>
            <div className="absolute top-44 left-1/4 w-32 opacity-25 animate-drift-right delay-3000">
                <CloudSVG variant="small" />
            </div>
            <div className="absolute top-20 right-1/4 w-28 opacity-20 animate-drift-left delay-1000">
                <CloudSVG variant="small" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Text */}
                <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up">
                    <div className="inline-block rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-1.5 text-xs font-medium text-[var(--accent-green)] tracking-wide">
                        🌿 Focus · Grow · Relax
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight text-[var(--heading-text)]">
                        Grow your focus.
                        <br />
                        <span className="bg-gradient-to-r from-pastel-green-deep to-[#4DAFB8] bg-clip-text text-transparent">
                            Build your own
                        </span>
                        <br />
                        peaceful island.
                    </h1>

                    <p className="text-lg text-[var(--paragraph-text)] max-w-md mx-auto lg:mx-0 leading-relaxed">
                        Stay focused, earn coins, and watch your personal island flourish —
                        one session at a time.
                    </p>

                    <div className="flex flex-col items-center gap-4 justify-center lg:justify-start pt-2">
                        <a
                            href="#features"
                            className="rounded-full border-2 border-[var(--accent-green)] px-8 py-3.5 text-base font-semibold text-[var(--accent-green)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-green)] transition-all duration-300"
                        >
                            Learn More
                        </a>
                        <p className="text-sm text-[var(--paragraph-text)] opacity-60">
                            Island mobile app is coming soon to Google Play
                        </p>
                    </div>
                </div>

                {/* Island Illustration */}
                <div className="flex-1 flex justify-center animate-fade-in-up delay-300">
                    <div className="animate-float w-80 sm:w-[22rem] lg:w-[26rem]">
                        <IslandSVG className="w-full h-auto drop-shadow-[0_20px_40px_rgba(107,191,138,0.22)]" />
                    </div>
                </div>
            </div>

            {/* Launchpad Slider — product preview carousel */}
            <LaunchpadSlider />

            {/* Bottom wave — smoother */}
            <div className="relative w-full mt-auto">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                    <path
                        d="M0 80 C240 40 480 95 720 65 C960 35 1200 85 1440 70 L1440 120 L0 120Z"
                        fill="var(--bg-primary)"
                    />
                    <path
                        d="M0 90 C300 60 600 100 900 75 C1100 55 1300 90 1440 80 L1440 120 L0 120Z"
                        fill="var(--bg-primary)"
                        opacity="0.5"
                    />
                </svg>
            </div>
        </section>
    );
}
