"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

const slides = [
    { src: "/launchpad/1.png", alt: "Island — Grow your focus" },
    { src: "/launchpad/2.png", alt: "Build your calm world" },
    { src: "/launchpad/3.png", alt: "Day to Night transition" },
    { src: "/launchpad/4.png", alt: "Label your study session" },
    { src: "/launchpad/5.png", alt: "Calm Soundscapes" },
    { src: "/launchpad/6.png", alt: "Focus up to 120 minutes" },
    { src: "/launchpad/7.png", alt: "Stay consistent with gentle reminders" },
    { src: "/launchpad/8.png", alt: "Track your focus history" },
    { src: "/launchpad/9.png", alt: "Expand your island" },
    { src: "/launchpad/10.png", alt: "Focus, gently" },
];

export default function LaunchpadSlider() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const slideWidth = container.firstElementChild
            ? (container.firstElementChild as HTMLElement).offsetWidth
            : 340;
        const gap = 24;
        const index = Math.round(scrollLeft / (slideWidth + gap));
        setActiveIndex(Math.min(Math.max(index, 0), slides.length - 1));
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="launchpad-wrapper animate-fade-in-up delay-500">
            {/* Scrollable track */}
            <div ref={scrollRef} className="launchpad-slider">
                {slides.map((slide, i) => (
                    <div key={i} className="launchpad-slide">
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            width={340}
                            height={680}
                            loading="lazy"
                            className="launchpad-slide-img"
                        />
                    </div>
                ))}
            </div>

            {/* Dot indicators */}
            <div className="launchpad-dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`launchpad-dot ${i === activeIndex ? "active" : ""}`}
                        onClick={() => {
                            const container = scrollRef.current;
                            if (!container) return;
                            const slideEl = container.children[i] as HTMLElement;
                            if (slideEl) {
                                container.scrollTo({
                                    left:
                                        slideEl.offsetLeft -
                                        container.offsetWidth / 2 +
                                        slideEl.offsetWidth / 2,
                                    behavior: "smooth",
                                });
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
