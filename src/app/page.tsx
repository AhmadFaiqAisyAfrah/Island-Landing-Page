import HeroSection from "@/components/HeroSection";
import WhatIsIsland from "@/components/WhatIsIsland";
import EcosystemSection from "@/components/EcosystemSection";
import ImpactSection from "@/components/ImpactSection";
import CharityHighlight from "@/components/CharityHighlight";
import GamesPreview from "@/components/GamesPreview";
import ArticlesPreview from "@/components/ArticlesPreview";
import IslandAppSection from "@/components/IslandAppSection";

export const metadata = {
    title: "Island — Platform for Knowledge, Growth, and Impact",
    description: "Explore insights, train your brain, and support meaningful change across Indonesia's islands. Island combines education, brain training games, and charity initiatives.",
};

export default function Home() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Island',
        url: 'https://islandapp.id',
        logo: 'https://ik.imagekit.io/kv42h83lq/island-logo.png',
        description: 'A digital platform focused on education, information, and real-world impact.',
        founder: {
            '@type': 'Person',
            name: 'Ahmad Faiq'
        },
        sameAs: [
            'https://www.instagram.com/islandapp.id',
            'https://www.tiktok.com/@islandapp.id',
            'https://pin.it/7xYj0AyJX',
            'https://youtube.com/@island.learning'
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection />
            <WhatIsIsland />
            <EcosystemSection />
            <ImpactSection />
            <CharityHighlight />
            <GamesPreview />
            <ArticlesPreview />
            <IslandAppSection />
        </>
    );
}
