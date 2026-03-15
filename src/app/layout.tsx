import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";

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
                <Script id="theme-init" strategy="beforeInteractive">
                    {`
(function() {
    try {
        var theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else if (theme === "light") {
            document.documentElement.classList.remove("dark");
        }
    } catch(e) {}
})();
`}
                </Script>
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>
                <AuthProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
