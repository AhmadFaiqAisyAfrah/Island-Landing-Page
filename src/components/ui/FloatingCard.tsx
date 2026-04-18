"use client";

import { motion } from "framer-motion";
import { TrendingUp, Brain, Heart } from "lucide-react";

interface FloatingCardProps {
  variant: "growth" | "latihan" | "donasi";
  className?: string;
  delay?: number;
}

const variants = {
  growth: {
    icon: TrendingUp,
    title: "+20%",
    subtitle: "Learning Growth",
    accentColor: "#00D1A0",
    bgColor: "rgba(0, 209, 160, 0.08)",
    borderColor: "rgba(0, 209, 160, 0.25)",
    glowColor: "rgba(0, 209, 160, 0.2)",
  },
  latihan: {
    icon: Brain,
    title: "Latihan",
    subtitle: "Otak & Fokus",
    accentColor: "#38bdf8",
    bgColor: "rgba(56, 189, 248, 0.08)",
    borderColor: "rgba(56, 189, 248, 0.25)",
    glowColor: "rgba(56, 189, 248, 0.2)",
  },
  donasi: {
    icon: Heart,
    title: "Donasi",
    subtitle: "Bantu Sesama",
    accentColor: "#f472b6",
    bgColor: "rgba(244, 114, 182, 0.08)",
    borderColor: "rgba(244, 114, 182, 0.25)",
    glowColor: "rgba(244, 114, 182, 0.2)",
  },
};

export default function FloatingCard({ variant, className = "", delay = 0 }: FloatingCardProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, scale: 0.8, x: variant === "donasi" ? 50 : -50 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        x: { duration: 0.6, delay },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        },
      }}
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="relative px-4 py-2.5 rounded-xl backdrop-blur-xl border max-w-[180px]"
        style={{
          background: config.bgColor,
          borderColor: config.borderColor,
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.2), 0 0 20px ${config.glowColor}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${config.accentColor}20, ${config.accentColor}08)`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color: config.accentColor }} />
          </div>
          <div className="min-w-0">
            <div
              className="font-bold text-sm leading-tight"
              style={{ color: config.accentColor }}
            >
              {config.title}
            </div>
            <div className="text-[10px] leading-tight" style={{ color: "#94a3b8" }}>
              {config.subtitle}
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${config.accentColor}05, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
