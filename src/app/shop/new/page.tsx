import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New Arrivals – Island Shop',
    description: 'Check out our latest products.',
};

export default function NewArrivalsPage() {
    return (
        <div className="min-h-screen flex flex-col pt-32 pb-16 bg-[var(--color-cream)]">
            <main className="flex-1 w-full max-w-[800px] mx-auto px-6 md:px-0 relative animate-fade-in-up">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-[var(--color-text-dark)] leading-tight mb-6">
                        New Arrivals
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-text-muted)]">
                        Check out our latest products.
                    </p>
                </section>
            </main>
        </div>
    );
}