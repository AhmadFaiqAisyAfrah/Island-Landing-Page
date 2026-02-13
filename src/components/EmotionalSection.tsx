import CloudSVG from "./CloudSVG";

export default function EmotionalSection() {
    return (
        <section className="relative py-28 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pastel-green/20 via-pastel-blue/15 to-pastel-sand/20" />

            {/* Decorative clouds */}
            <div className="absolute top-10 right-10 w-32 opacity-30 animate-float-slow">
                <CloudSVG />
            </div>
            <div className="absolute bottom-10 left-10 w-28 opacity-20 animate-float-slow delay-1000">
                <CloudSVG />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-3xl px-6 text-center space-y-8 animate-fade-in-up">
                {/* Decorative dots */}
                <div className="flex justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pastel-green animate-pulse-soft" />
                    <span className="w-2 h-2 rounded-full bg-pastel-blue animate-pulse-soft delay-200" />
                    <span className="w-2 h-2 rounded-full bg-pastel-sand animate-pulse-soft delay-500" />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
                    Productivity doesn&apos;t have
                    <br />
                    to feel <span className="text-pastel-green-deep">heavy</span>.
                </h2>

                <p className="text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
                    We believe in gentle progress — small steps that add up to big change.
                    Island turns your focus into something beautiful, one peaceful session at a time.
                </p>

                {/* Decorative line */}
                <div className="flex justify-center">
                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-pastel-green via-pastel-blue to-pastel-sand" />
                </div>
            </div>
        </section>
    );
}
