import IslandSVG from "@/components/IslandSVG";
import CloudSVG from "@/components/CloudSVG";
import LaunchpadSlider from "@/components/LaunchpadSlider";

export default function HeroSection() {
    return (
        <section className="relative flex flex-col items-center pt-20">
            {/* Sky gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-emerald-50 to-gray-50 dark:from-[#0B1E2D] dark:via-[#0f2236] dark:to-[#0a1520]" />

            {/* Animated clouds */}
            <div className="absolute top-12 left-0 w-44 opacity-50 dark:opacity-30 animate-drift-right">
                <CloudSVG variant="soft" />
            </div>
            <div className="absolute top-28 right-0 w-56 opacity-35 dark:opacity-20 animate-drift-left delay-2000">
                <CloudSVG />
            </div>
            <div className="absolute top-44 left-1/4 w-32 opacity-25 dark:opacity-15 animate-drift-right delay-3000">
                <CloudSVG variant="small" />
            </div>
            <div className="absolute top-20 right-1/4 w-28 opacity-20 dark:opacity-10 animate-drift-left delay-1000">
                <CloudSVG variant="small" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Text */}
                <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up">
                    <div className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 tracking-wide">
                        🌿 Focus · Grow · Relax
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white">
                        Grow your focus.
                        <br />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Build your own
                        </span>
                        <br />
                        peaceful island.
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
                        Stay focused, earn coins, and watch your personal island flourish —
                        one session at a time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Download Free
                            <span className="inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">→</span>
                        </a>
                        <a
                            href="#features"
                            className="rounded-full border-2 border-emerald-500 dark:border-emerald-400 px-8 py-3.5 text-base font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Island Illustration */}
                <div className="flex-1 flex justify-center animate-fade-in-up delay-300">
                    <div className="animate-float w-80 sm:w-[22rem] lg:w-[26rem]">
                        <IslandSVG className="w-full h-auto drop-shadow-[0_20px_40px_rgba(16,185,129,0.15)]" />
                    </div>
                </div>
            </div>

            {/* Launchpad Slider */}
            <LaunchpadSlider />

            {/* Bottom wave */}
            <div className="relative w-full mt-auto">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                    <path
                        d="M0 80 C240 40 480 95 720 65 C960 35 1200 85 1440 70 L1440 120 L0 120Z"
                        fill="#f9fafb"
                        className="fill-gray-50 dark:fill-[#0a1520]"
                    />
                    <path
                        d="M0 90 C300 60 600 100 900 75 C1100 55 1300 90 1440 80 L1440 120 L0 120Z"
                        fill="#f9fafb"
                        className="fill-gray-100 dark:fill-[#0f1f2e]"
                        opacity="0.5"
                    />
                </svg>
            </div>
        </section>
    );
}
