"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeAwareLogo from "./ThemeAwareLogo";
import { useEffect, useState } from "react";

interface CompanyPage {
    id: string;
    title: string;
    slug: string;
}

const footerSections: { title: string; social?: boolean; links: { label: string; href: string; icon?: string; badge?: string }[] }[] = [
    {
        title: "Social Media",
        social: true,
        links: [
            { label: "Instagram", href: "https://www.instagram.com/islandapp.id?igsh=dDFtb3AyNHBmM3g2", icon: "https://ik.imagekit.io/kv42h83lq/Download_Instagram_Logo_On_Circle_Style_With_Transparent_Background-removebg-preview.png" },
            { label: "TikTok", href: "https://www.tiktok.com/@islandapp.id?_r=1&_t=ZS-95FNUeTD3Ar", icon: "https://ik.imagekit.io/kv42h83lq/TikTok_Logo_tik_tok_Download_png-removebg-preview.png" },
            { label: "Pinterest", href: "https://pin.it/7xYj0AyJX", icon: "https://ik.imagekit.io/kv42h83lq/Follow_Us_on_Pinterest__-_Threads-removebg-preview.png" },
            { label: "YouTube", href: "https://youtube.com/@island.learning?si=8QcjV9f_9x-2Xrsq", icon: "https://ik.imagekit.io/kv42h83lq/Download_Youtube_logo_png__Youtube_logo_transparent_png__Youtube_icon_transparent_free_png-removebg-preview.png" },
        ],
    },
    {
        title: "Study Tools",
        links: [
            { label: "Island App", href: "/island-app" },
            { label: "Explore", href: "/explore" },
            { label: "Pomodoro Timer", href: "/explore/pomodoro" },
            { label: "Flashcards", href: "/explore/flashcards" },
        ],
    },
    {
        title: "Learning Games",
        links: [
            { label: "View All Games", href: "/games" },
            { label: "Math Speed Challenge", href: "/games/math-speed" },
            { label: "Typing Speed Challenge", href: "/games/typing-speed" },
            { label: "Reaction Speed Test", href: "/games/reaction" },
            { label: "Memory Card Game", href: "/games/memory" },
            { label: "Number Pattern Test", href: "/games/number-pattern" },
            { label: "Focus Test", href: "/games/focus" },
        ],
    },
    {
        title: "Articles",
        links: [
            { label: "All Articles", href: "/articles" },
            { label: "Browse by Tag", href: "/tags" },
        ],
    },
    {
        title: "Shop",
        links: [
            { label: "All Products", href: "/shop" },
            { label: "Best Seller", href: "/shop/best-seller", badge: "NEW" },
            { label: "New Arrivals", href: "/shop/new", badge: "HOT" },
            { label: "Island Merch", href: "/shop/merch" },
            { label: "Cart", href: "/shop/cart" },
        ],
    },
];

export default function Footer() {
    const [companyPages, setCompanyPages] = useState<CompanyPage[]>([]);

    useEffect(() => {
        fetch("/api/company")
            .then((res) => res.json())
            .then((data) => setCompanyPages(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col items-center">
                    <ThemeAwareLogo className="h-16 md:h-20 w-auto mx-auto mb-4 object-contain bg-transparent" />

                    <div className="grid grid-cols-2 md:grid-cols-7 gap-8 w-full mb-8">
                        {footerSections.map((section) => (
                            <div key={section.title} className="text-center md:text-left">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                                    {section.title}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link, index) => (
                                        <li key={`${link.href}-${index}`}>
                                            {section.social ? (
                                                <a
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm text-gray-600 hover:opacity-70 transition-opacity"
                                                >
                                                    {link.icon && (
                                                        <Image 
                                                            src={link.icon} 
                                                            alt={`${link.label} Island`} 
                                                            width={20} 
                                                            height={20} 
                                                            className="w-[20px] h-[20px] object-contain" 
                                                        />
                                                    )}
                                                    <span>{link.label}</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center"
                                                >
                                                    {link.label}
                                                    {link.badge && (
                                                        <span className="ml-1.5 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                                                            {link.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        
                        {/* Company Section - Static with CMS fallback */}
                        <div className="text-center md:text-left">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider font-serif">
                                Company
                            </h4>
                            <ul className="space-y-3">
                                {companyPages.length > 0 ? (
                                    companyPages.map((page: CompanyPage) => (
                                        <li key={page.id}>
                                            <Link
                                                href={`/company/${page.slug}`}
                                                className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                            >
                                                {page.title}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <>
                                        <li><Link href="/company/about" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">About</Link></li>
                                        <li><Link href="/company/privacy" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
                                        <li><Link href="/company/terms" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Terms & Conditions</Link></li>
                                        <li><Link href="/company/data-deletion" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Data Deletion</Link></li>
                                        <li><Link href="/company/contact" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Contact</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500">
                        © 2026 Island — All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
