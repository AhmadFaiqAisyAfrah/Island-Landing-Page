"use client";

import { useMemo } from "react";

export default function BackgroundNetwork() {
  const dots = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float-dot {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--tx, 10px), var(--ty, -10px)); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(0, 209, 160, 0.12) 0%, transparent 70%)",
            animation: "pulse-glow 10s ease-in-out infinite",
            filter: "blur(60px)",
          }}
        />

        <div
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)",
            animation: "pulse-glow 12s ease-in-out infinite",
            animationDelay: "3s",
            filter: "blur(70px)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />

        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              background: `radial-gradient(circle, rgba(0, 209, 160, ${dot.opacity}) 0%, transparent 70%)`,
              animation: `float-dot ${dot.duration}s ease-in-out infinite`,
              animationDelay: `${dot.delay}s`,
              ["--tx" as string]: `${(Math.random() - 0.5) * 20}px`,
              ["--ty" as string]: `${(Math.random() - 0.5) * 20}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}
