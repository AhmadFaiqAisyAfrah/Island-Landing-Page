import Link from "next/link";
import Image from "next/image";

const footerSections: { title: string; social?: boolean; links: { label: string; href: string; icon?: string }[] }[] = [
    {
        title: "Social Media",
        social: true,
        links: [
            { label: "Instagram", href: "https://www.instagram.com/islandapp.id/", icon: "/island-logo/instagram.png" },
        ],
    },
    {
        title: "Study Tools",
        links: [
            { label: "Island App", href: "/" },
            { label: "Explore", href: "/explore" },
            { label: "Pomodoro Timer", href: "/explore/pomodoro" },
            { label: "Flashcards", href: "/explore/flashcards" },
        ],
    },
    {
        title: "Articles",
        links: [
            { label: "Articles", href: "/articles" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Data Deletion", href: "/data-deletion" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col items-center">
                    {/* Logo badge */}
                    <Image src="/island-logo.png" alt="Island" width={100} height={100} className="h-[100px] w-auto object-contain mb-4" />

                    {/* Navigation columns */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full max-w-4xl mb-8">
                        {footerSections.map((section) => (
                            <div key={section.title} className="text-center md:text-left">
                                <h4 className="text-sm font-semibold text-[var(--heading-text)] mb-4 uppercase tracking-wider">
                                    {section.title}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            {section.social ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                                                >
                                                    {link.icon && (
                                                        <Image src={link.icon} alt="" width={18} height={18} className="w-[18px] h-[18px]" />
                                                    )}
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors"
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-[var(--text-secondary)]">
                        © 2026 Island — All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
