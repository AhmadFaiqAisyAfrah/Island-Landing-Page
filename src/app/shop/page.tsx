import { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Shop – Island Products & Merchandise',
    description: 'Explore Island tools and merchandise to boost your productivity.',
};

export default async function ShopPage() {
    const products = await getAllProducts();
    
    console.log('[Shop] Products loaded:', products.length);
    if (products.length > 0) {
        console.log('[Shop] First product price:', products[0].price);
        console.log('[Shop] First product discountPrice:', products[0].discountPrice);
        console.log('[Shop] First product image:', products[0].image ? 'set' : 'none');
    }

    return (
        <div className="min-h-screen flex flex-col pt-32 pb-16 bg-[var(--color-cream)]">
            <main className="flex-1 w-full max-w-[800px] mx-auto px-6 md:px-0 relative animate-fade-in-up">
                <section className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-[var(--color-text-dark)] leading-tight mb-6">
                        Shop
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        Explore tools and merch to boost your productivity.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">All Products</h2>
                    
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {products.map((product) => {
                                const displayPrice = product.discountPrice || product.price;
                                const originalPrice = product.discountPrice ? product.price : null;
                                return (
                                <a 
                                    key={product.id} 
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)] hover:shadow-md hover:-translate-y-1 transition-all"
                                >
                                    {product.image && (
                                        <div className="w-full h-56 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="max-w-full max-h-full object-contain p-4"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        {product.tags.map((tag) => (
                                            <span key={tag} className="bg-[var(--accent-green)] text-white text-xs px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="font-semibold text-lg text-[var(--color-text-dark)] leading-tight">{product.name}</h3>
                                    <p className="text-[var(--color-text-muted)] text-sm mt-1 line-clamp-2">{product.shortDescription || product.description}</p>
                                    <div className="mt-3 flex items-center gap-2">
                                        {originalPrice ? (
                                            <>
                                                <span className="text-gray-400 line-through text-sm">Rp {originalPrice.toLocaleString('id-ID')}</span>
                                                <span className="font-bold text-lg text-[var(--accent-green)]">Rp {displayPrice.toLocaleString('id-ID')}</span>
                                            </>
                                        ) : (
                                            <span className="font-bold text-lg text-[var(--color-text-dark)]">Rp {displayPrice.toLocaleString('id-ID')}</span>
                                        )}
                                    </div>
                                </a>
                                )})}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[var(--color-text-muted)] mb-4">No products available yet.</p>
                            <p className="text-sm text-gray-500">Check back soon for new products!</p>
                        </div>
                    )}
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/shop/best-seller" className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)] hover:shadow-md transition-all">
                            <span className="bg-[var(--accent-green)] text-white text-xs px-2 py-1 rounded">NEW</span>
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)] mt-2">Best Seller</h3>
                            <p className="text-[var(--color-text-muted)]">Our most popular products.</p>
                        </Link>
                        <Link href="/shop/new" className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)] hover:shadow-md transition-all">
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">HOT</span>
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)] mt-2">New Arrivals</h3>
                            <p className="text-[var(--color-text-muted)]">Check out our latest products.</p>
                        </Link>
                        <Link href="/shop/merch" className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)] hover:shadow-md transition-all">
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)]">Island Merch</h3>
                            <p className="text-[var(--color-text-muted)]">Merchandise and branded items.</p>
                        </Link>
                        <Link href="/shop/cart" className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)] hover:shadow-md transition-all">
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)]">Cart</h3>
                            <p className="text-[var(--color-text-muted)]">View your shopping cart.</p>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}