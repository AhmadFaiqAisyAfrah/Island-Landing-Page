import OldHeroSection from "@/components/island/OldHeroSection";
import OldFeaturesSection from "@/components/island/OldFeaturesSection";
import OldEmotionalSection from "@/components/island/OldEmotionalSection";
import OldTransparencySection from "@/components/island/OldTransparencySection";
import OldFAQSection from "@/components/island/OldFAQSection";

export default function IslandAppContent() {
    return (
        <div className="island-app-page">
            <OldHeroSection />
            <OldFeaturesSection />
            <OldEmotionalSection />
            <OldTransparencySection />
            <OldFAQSection />
        </div>
    );
}
