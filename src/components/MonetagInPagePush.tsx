"use client";

import Script from "next/script";

export default function MonetagInPagePush() {
    return (
        <Script
            id="monetag-in-page-push"
            strategy="afterInteractive"
            data-zone="10705460"
            src="https://nap5k.com/tag.min.js"
        />
    );
}
