export default function EmotionalSection() {
    return (
        <section className="relative py-28 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
                <div className="flex justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "200ms" }} />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: "500ms" }} />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Productivity doesn&apos;t have
                    <br />
                    to feel <span className="text-emerald-600">heavy</span>.
                </h2>

                <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                    We believe in gentle progress — small steps that add up to big change.
                    Island turns your focus into something beautiful, one peaceful session at a time.
                </p>

                <div className="flex justify-center">
                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-amber-400" />
                </div>
            </div>
        </section>
    );
}
