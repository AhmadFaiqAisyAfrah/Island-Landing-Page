import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";

export default function IslandAppSection() {
    return (
        <section id="island-app" className="py-24 bg-[var(--bg-primary)]">
            <div className="mx-auto max-w-4xl px-6">
                <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--accent-green)]/10 rounded-3xl p-8 md:p-12 border border-[var(--border-color)] text-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center mx-auto mb-8">
                        <Globe className="w-10 h-10 text-[var(--accent-green)]" />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--heading-text)] mb-4">
                        Island App
                    </h2>
                    
                    <p className="text-lg text-[var(--paragraph-text)] max-w-xl mx-auto mb-8">
                        Stay focused, earn rewards, and build your personal island.
                        A productivity app that makes focusing feel rewarding.
                    </p>
                    
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-green)] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
                    >
                        Open Island App
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
