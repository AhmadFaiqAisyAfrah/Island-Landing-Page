import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Best Seller – Island Shop',
    description: 'Browse our best selling products.',
};

export default function BestSellerPage() {
    return (
        <div className="min-h-screen flex flex-col pt-32 pb-16 bg-[var(--color-cream)]">
            <main className="flex-1 w-full max-w-[800px] mx-auto px-6 md:px-0 relative animate-fade-in-up">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-[var(--color-text-dark)] leading-tight mb-6">
                        Best Seller
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-text-muted)]">
                        Our most popular products.
                    </p>
                </section>
            </main>
        </div>
    );
}