import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms & Conditions — Island",
    description: "Terms and conditions for using the Island app.",
};

export default function TermsPage() {
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
                    Terms &amp; Conditions
                </h1>

                <div className="prose prose-sm text-text-muted space-y-6 leading-relaxed">
                    <p>
                        <strong>Last updated:</strong> February 2026
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Acceptance of Terms
                    </h2>
                    <p>
                        By downloading, installing, or using the Island app, you agree to
                        these terms and conditions. If you do not agree, please do not use
                        the app.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Use of the App
                    </h2>
                    <p>
                        Island is a personal productivity tool. You may use it for personal,
                        non-commercial purposes. You agree not to reverse engineer,
                        decompile, or disassemble the app.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        In-App Purchases
                    </h2>
                    <p>
                        Island offers optional in-app purchases for Island Coins. All
                        purchases are final and non-refundable, except as required by
                        applicable law or Google Play&apos;s refund policies. Purchases are
                        processed through Google Play Billing.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Intellectual Property
                    </h2>
                    <p>
                        All content, graphics, and software in Island are owned by us and
                        protected by intellectual property laws. You may not reproduce or
                        distribute any part of the app without permission.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Limitation of Liability
                    </h2>
                    <p>
                        Island is provided &quot;as is&quot; without warranties. We are not
                        liable for any damages arising from your use of the app, including
                        loss of data stored locally on your device.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">
                        Changes to Terms
                    </h2>
                    <p>
                        We reserve the right to update these terms at any time. Continued
                        use of the app after changes constitutes acceptance of the new terms.
                    </p>

                    <h2 className="text-xl font-semibold text-text-dark">Contact</h2>
                    <p>
                        Questions about these terms? Visit our{" "}
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
