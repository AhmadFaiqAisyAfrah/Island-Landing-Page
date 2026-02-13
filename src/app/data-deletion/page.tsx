import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Data Deletion Guide — Island",
    description: "How to delete your data from the Island app.",
};

export default function DataDeletionPage() {
    return (
        <div className="min-h-screen pt-28 pb-20 bg-cream">
            <div className="mx-auto max-w-3xl px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm text-pastel-green-deep hover:underline mb-8"
                >
                    ← Back to home
                </Link>

                <h1 className="text-3xl font-bold text-text-dark mb-8">
                    Data Deletion Guide
                </h1>

                <div className="prose prose-sm text-text-muted space-y-6 leading-relaxed">
                    <p>
                        Since Island stores all data locally on your device, deleting your
                        data is straightforward and entirely in your control.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Option 1: Clear App Data
                    </h2>
                    <div className="rounded-2xl bg-white/70 border border-pastel-green/10 p-6 space-y-2">
                        <p>1. Open your device&apos;s <strong>Settings</strong></p>
                        <p>2. Go to <strong>Apps</strong> → <strong>Island</strong></p>
                        <p>3. Tap <strong>Storage &amp; cache</strong></p>
                        <p>4. Tap <strong>Clear storage</strong> (or <strong>Clear data</strong>)</p>
                        <p className="text-xs text-text-muted mt-3">
                            ⚠️ This will reset all focus history, island progress, coins, and
                            settings.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Option 2: Uninstall the App
                    </h2>
                    <p>
                        Uninstalling Island will remove all app data from your device,
                        including focus history, island progress, and settings.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        What About Purchases?
                    </h2>
                    <p>
                        In-app purchase records are managed by Google Play and tied to your
                        Google account, not stored in the app. Clearing app data or
                        uninstalling will not affect your purchase history. If you reinstall,
                        your purchases can be restored through Google Play.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Need Help?
                    </h2>
                    <p>
                        If you need assistance, visit our{" "}
                        <Link href="/contact" className="text-pastel-green-deep hover:underline">
                            Contact page
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
