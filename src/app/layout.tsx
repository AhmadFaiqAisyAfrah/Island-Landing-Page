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

const LOGO_URL = "https://ik.imagekit.io/kv42h83lq/Salinan%20dari%20Secarik%20Semangat.%20(4).png";

export const metadata: Metadata = {
    title: "Island — Learn, Focus, and Create Real Impact",
    description:
        "Explore knowledge, improve focus, and create meaningful impact. Island combines learning, productivity, and purpose in one platform.",
    keywords: [
        "island",
        "education",
        "learning",
        "focus",
        "productivity",
        "charity",
        "impact",
        "articles",
        "games",
        "brain training",
    ],
    icons: {
        icon: [
            { url: LOGO_URL },
            { url: LOGO_URL, sizes: "32x32", type: "image/png" },
            { url: LOGO_URL, sizes: "180x180", type: "image/png" },
        ],
        apple: LOGO_URL,
    },
    openGraph: {
        title: "Island — Learn, Focus, and Create Real Impact",
        description:
            "Explore knowledge, improve focus, and create meaningful impact. Island combines learning, productivity, and purpose in one platform.",
        type: "website",
        url: "https://islandapp.id",
        siteName: "Island",
        images: [
            {
                url: LOGO_URL,
                width: 180,
                height: 180,
                alt: "Island Logo",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Island — Learn, Focus, and Create Real Impact",
        description:
            "Explore knowledge, improve focus, and create meaningful impact. Island combines learning, productivity, and purpose in one platform.",
        images: [LOGO_URL],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Island",
        url: "https://islandapp.id",
        logo: LOGO_URL,
        description: "Explore knowledge, improve focus, and create meaningful impact.",
        sameAs: [
            "https://www.instagram.com/islandapp.id",
            "https://www.tiktok.com/@islandapp.id",
            "https://pin.it/7xYj0AyJX",
            "https://youtube.com/@island.learning",
        ],
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href={LOGO_URL} />
                <link rel="icon" type="image/png" sizes="180x180" href={LOGO_URL} />
                <link rel="apple-touch-icon" href={LOGO_URL} />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
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
