import { getCompanyPages } from "@/lib/notion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const companyPages = await getCompanyPages();
    const page = companyPages.find((p) => p.slug === slug);

    return (
        <div className="min-h-screen bg-white pt-20 md:pt-24">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {page ? (
                    <article>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">
                            {page.title}
                        </h1>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600">
                                Content for &quot;{page.title}&quot; will be rendered from Notion in the next step.
                            </p>
                        </div>
                    </article>
                ) : (
                    <div className="text-center py-20">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Page Not Found
                        </h1>
                        <p className="text-gray-600 mb-8">
                            The page you are looking for does not exist.
                        </p>
                        <Link
                            href="/"
                            className="text-emerald-600 hover:underline"
                        >
                            Go back home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}