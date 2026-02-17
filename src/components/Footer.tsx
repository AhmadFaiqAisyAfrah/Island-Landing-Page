import Link from "next/link";
import Image from "next/image";

const footerLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Data Deletion", href: "/data-deletion" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    return (
        <footer className="bg-[#F4F1EA]">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex flex-col items-center text-center space-y-3">
                    {/* Logo badge */}
                    <Image src="/island-logo.png" alt="Island" width={100} height={100} className="h-[100px] w-auto object-contain" />

                    {/* Brand name */}
                    <h3 className="text-2xl font-bold text-[#3A3D3F]">Island</h3>

                    {/* Nav links */}
                    <div className="flex flex-wrap justify-center gap-5 mt-2">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-[#7A7F82] hover:text-[#5FBF8F] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>


                    {/* Copyright */}
                    <p className="text-xs text-[#A0A5A8] pt-2">
                        © 2026 Island — All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
