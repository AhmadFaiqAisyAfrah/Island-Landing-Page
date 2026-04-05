import Link from "next/link";
import { Droplets, ArrowRight } from "lucide-react";

export default function CharityHighlight() {
    return (
        <section className="py-24 bg-gradient-to-br from-[var(--bg-primary)] to-blue-500/5">
            <div className="mx-auto max-w-4xl px-6">
                <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 md:p-12 border border-[var(--border-color)] text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-8">
                        <Droplets className="w-10 h-10 text-blue-500" />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--heading-text)] mb-4">
                        $1 = Clean Water for a Child
                    </h2>
                    
                    <p className="text-lg text-[var(--paragraph-text)] max-w-xl mx-auto mb-8">
                        Help bring safe drinking water to children in Indonesia&apos;s islands.
                        Your support can make a real difference in a child&apos;s life.
                    </p>
                    
                    <Link
                        href="/charity"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Support Now
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
