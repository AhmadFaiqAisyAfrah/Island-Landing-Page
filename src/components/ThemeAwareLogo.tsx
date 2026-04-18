interface ThemeAwareLogoProps {
    className?: string;
    priority?: boolean;
}

const LOGO_URL = "https://ik.imagekit.io/kv42h83lq/Salinan_dari_Secarik_Semangat.__5_-removebg-preview.png?updatedAt=1775184392046";

export default function ThemeAwareLogo({ 
    className = "h-14 md:h-16 w-auto",
    priority = false 
}: ThemeAwareLogoProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={LOGO_URL}
            alt="Island Logo"
            className={`${className} object-contain bg-transparent`}
            width={100}
            height={56}
            loading={priority ? "eager" : "lazy"}
        />
    );
}
