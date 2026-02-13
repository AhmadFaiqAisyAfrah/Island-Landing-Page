import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Island — Grow Your Focus",
    description:
        "Build your own peaceful island while staying productive. Focus sessions, island coins, and a calming experience that makes productivity feel light.",
    keywords: [
        "productivity",
        "focus",
        "pomodoro",
        "island",
        "calm",
        "mindfulness",
    ],
    openGraph: {
        title: "Island — Grow Your Focus",
        description:
            "Build your own peaceful island while staying productive.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="font-sans antialiased">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
