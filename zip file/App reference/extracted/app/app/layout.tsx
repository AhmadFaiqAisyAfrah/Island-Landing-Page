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
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6763889648869554"
                    crossOrigin="anonymous"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var localTheme = localStorage.getItem('theme');
                                    var sysTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    var shouldUseDark = localTheme === 'dark' || (!localTheme && sysTheme);
                                    document.documentElement.classList.toggle('dark-mode', shouldUseDark);
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
