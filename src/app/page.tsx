'use client';

import HeroSection from "@/components/HeroSection";
import WhatIsIsland from "@/components/WhatIsIsland";
import EcosystemSection from "@/components/EcosystemSection";
import GamesPreview from "@/components/GamesPreview";
import ArticlesPreview from "@/components/ArticlesPreview";
import IslandAppSection from "@/components/IslandAppSection";

export default function Home() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Island',
        url: 'https://islandapp.id',
        logo: 'https://ik.imagekit.io/kv42h83lq/island-logo.png',
        description: 'A digital platform focused on education, knowledge, and personal growth.',
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
            <GamesPreview />
            <ArticlesPreview />
            <IslandAppSection />
        </>
    );
}