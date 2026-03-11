export default function CloudSVG({ className = "", variant = "default" }: { className?: string; variant?: "default" | "soft" | "small" }) {
    if (variant === "small") {
        return (
            <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <ellipse cx="40" cy="30" rx="28" ry="14" fill="white" opacity="0.6" />
                <ellipse cx="60" cy="25" rx="24" ry="12" fill="white" opacity="0.75" />
                <ellipse cx="80" cy="30" rx="26" ry="11" fill="white" opacity="0.55" />
            </svg>
        );
    }

    if (variant === "soft") {
        return (
            <svg viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <ellipse cx="80" cy="50" rx="60" ry="20" fill="white" opacity="0.5" />
                <ellipse cx="120" cy="42" rx="50" ry="18" fill="white" opacity="0.6" />
                <ellipse cx="160" cy="48" rx="55" ry="16" fill="white" opacity="0.45" />
                <ellipse cx="110" cy="38" rx="35" ry="14" fill="white" opacity="0.7" />
                <ellipse cx="145" cy="36" rx="28" ry="12" fill="white" opacity="0.55" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <ellipse cx="70" cy="50" rx="50" ry="22" fill="white" opacity="0.65" />
            <ellipse cx="100" cy="42" rx="40" ry="20" fill="white" opacity="0.75" />
            <ellipse cx="130" cy="50" rx="45" ry="18" fill="white" opacity="0.55" />
            <ellipse cx="90" cy="38" rx="30" ry="15" fill="white" opacity="0.85" />
        </svg>
    );
}
