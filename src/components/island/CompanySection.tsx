import Link from "next/link";

const companyLinks = [
    {
        label: "About Island App",
        href: "/about",
        description: "Learn our story and mission",
    },
    {
        label: "Privacy Policy",
        href: "/privacy",
        description: "How we handle your data",
    },
    {
        label: "Terms & Conditions",
        href: "/terms",
        description: "Usage terms and agreements",
    },
    {
        label: "Data Deletion",
        href: "/data-deletion",
        description: "How to delete your data",
    },
    {
        label: "Contact",
        href: "/contact",
        description: "Get in touch with us",
    },
];

export default function CompanySection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center space-y-4 mb-12">
                    <h2 
                        className="text-3xl sm:text-4xl font-bold text-gray-900"
                        style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
                    >
                        Island App Information
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Everything you need to know about the Island App, including policies and support options.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companyLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                {link.label}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {link.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}