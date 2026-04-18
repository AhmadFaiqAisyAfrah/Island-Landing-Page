import Navbar from "@/components/Navbar";
import IslandAppContent from "@/components/island/IslandAppContent";

export const metadata = {
    title: "Island App – Focus, Earn Rewards, Build Your Island",
    description: "Stay focused, earn coins, and watch your personal island flourish. Download Island App on Play Store now.",
};

export default function IslandAppPage() {
    return (
        <main>
            <Navbar />
            <IslandAppContent />
        </main>
    );
}