import HeroSection from "@/components/island/HeroSection";
import FeaturesSection from "@/components/island/FeaturesSection";
import EmotionalSection from "@/components/island/EmotionalSection";
import TransparencySection from "@/components/island/TransparencySection";
import FAQSection from "@/components/island/FAQSection";

export default function IslandAppContent() {
    return (
        <div className="island-app-page">
            <HeroSection />
            <FeaturesSection />
            <EmotionalSection />
            <TransparencySection />
            <FAQSection />
        </div>
    );
}
