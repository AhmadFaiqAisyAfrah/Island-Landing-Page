import FocusDemo from "@/components/FocusDemo";

const musicOptions = [
    { value: "none", label: "None", emoji: "🔇", src: null },
    { value: "forest_vibes", label: "Forest", emoji: "🌲", src: "/audio/forest_vibes.ogg" },
    { value: "night_vibes", label: "Midnight", emoji: "🌙", src: "/audio/night_vibes.ogg" },
    { value: "ocean_vibes", label: "Ocean", emoji: "🌊", src: "/audio/ocean_vibes.ogg" },
    { value: "rainy_vibes", label: "Rainy", emoji: "🌧️", src: "/audio/rainy_vibes.ogg" },
    { value: "snow_vibes", label: "Snow", emoji: "❄️", src: "/audio/snow_vibes.ogg" },
];

export const metadata = {
    title: "Explore Focus Demo - Island",
    description: "Experience a simplified preview of how Island turns your focus time into a peaceful growing world.",
};

export default function ExplorePage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <FocusDemo musicOptions={musicOptions} />
        </div>
    );
}
