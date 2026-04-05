import Link from "next/link";
import { ArrowRight } from "lucide-react";

const mockArticles = [
    {
        title: "Understanding Nutrition: A Guide for Healthy Living",
        category: "Health",
        slug: "understanding-nutrition-guide",
        excerpt: "Learn the fundamentals of balanced nutrition and how to make healthier food choices for a better life.",
    },
    {
        title: "Digital Learning: The Future of Education in Indonesia",
        category: "Education",
        slug: "digital-learning-future-education",
        excerpt: "Exploring how technology is transforming education and making learning accessible to all.",
    },
    {
        title: "Clean Water Initiatives: Making a Difference",
        category: "Community",
        slug: "clean-water-initiatives",
        excerpt: "Understanding the impact of clean water projects and how you can contribute to positive change.",
    },
];

export default function ArticlesPreview() {
    return (
        <section className="py-24 bg-[var(--bg-secondary)]">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--heading-text)] mb-2">
                            Latest Articles
                        </h2>
                        <p className="text-[var(--paragraph-text)]">
                            Insights and research across health, economy, and technology
                        </p>
                    </div>
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-2 text-[var(--accent-green)] font-medium hover:underline"
                    >
                        Read More Articles
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockArticles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/articles/${article.slug}`}
                            className="group bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-color)] hover:border-[var(--accent-green)]/50 transition-all duration-300"
                        >
                            <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--accent-green)] bg-[var(--accent-green)]/10 rounded-full mb-4">
                                {article.category}
                            </span>
                            <h3 className="text-lg font-bold text-[var(--heading-text)] mb-3 group-hover:text-[var(--accent-green)] transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-sm text-[var(--paragraph-text)] line-clamp-3">
                                {article.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
