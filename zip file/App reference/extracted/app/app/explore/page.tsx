import FocusDemo from "@/components/FocusDemo";

export const metadata = {
    title: "Explore Focus Demo - Island",
    description: "Experience a simplified preview of how Island turns your focus time into a peaceful growing world.",
};

export default function ExplorePage() {
    return (
        <div className="pt-24 min-h-screen bg-[var(--bg-primary)]">
            <FocusDemo />
        </div>
    );
}
