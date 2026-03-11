import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import EmotionalSection from "@/components/EmotionalSection";
import TransparencySection from "@/components/TransparencySection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Island',
        url: 'https://islandapp.id',
        logo: 'https://islandapp.id/island-logo.png', // Fallback to the same logo used in navbar
        founder: {
            '@type': 'Person',
            name: 'Ahmad Faiq'
        },
        sameAs: [] // Empty as requested, to be populated later
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection />
            <FeaturesSection />
            <EmotionalSection />
            <TransparencySection />
            <FAQSection />
        </>
    );
}
