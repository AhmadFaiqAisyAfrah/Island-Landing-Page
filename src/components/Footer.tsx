import Link from "next/link";

const footerLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Data Deletion", href: "/data-deletion" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    return (
        <footer className="bg-cream-dark border-t border-pastel-green/20">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="flex items-center gap-2 text-lg font-bold text-text-dark">
                        <span className="text-xl">🏝️</span>
                        <span>Island</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-text-muted hover:text-pastel-green-deep transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-6 border-t border-pastel-green/10 text-center">
                    <p className="text-xs text-text-muted">
                        © {new Date().getFullYear()} Island. Built with 💚 for peaceful productivity.
                    </p>
                </div>
            </div>
        </footer>
    );
}
