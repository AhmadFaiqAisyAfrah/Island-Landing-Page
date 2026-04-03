import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    icons: {
        icon: [
            { url: "https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png" },
            { url: "https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png", sizes: "32x32", type: "image/png" },
            { url: "https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png", sizes: "180x180", type: "image/png" },
        ],
        apple: "https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png",
    },
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
                <link rel="icon" type="image/png" sizes="32x32" href="https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png" />
                <link rel="icon" type="image/png" sizes="180x180" href="https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png" />
                <link rel="apple-touch-icon" href="https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png" />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6763889648869554"
                    crossOrigin="anonymous"
                ></script>
            </head>
            <body className={`${inter.variable} font-sans antialiased`}>
                <ThemeProvider>
                    <AuthProvider>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
