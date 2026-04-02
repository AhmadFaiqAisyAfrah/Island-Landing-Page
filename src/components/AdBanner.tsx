"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

interface AdBannerProps {
    className?: string;
    slot?: string;
    format?: "auto" | "rectangle" | "horizontal" | "vertical";
}

export default function AdBanner({ 
    className = "", 
    slot,
    format = "auto" 
}: AdBannerProps) {
    const insRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        if (insRef.current) {
            try {
                if (typeof window !== "undefined") {
                    window.adsbygoogle = window.adsbygoogle || [];
                    window.adsbygoogle.push({});
                }
            } catch (e) {
                console.log("AdSense error:", e);
            }
        }
    }, []);

    return (
        <div className={`ads-container ${className}`}>
            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: "block", width: "100%", minHeight: "90px" }}
                data-ad-client="ca-pub-6763889648869554"
                data-ad-slot={slot || "AUTO"}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
