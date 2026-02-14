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

                <div className="space-y-10 text-[15px] text-text-dark leading-relaxed">
                    <p className="text-sm text-text-muted">
                        <strong>Last updated:</strong> February 2026
                    </p>

                    {/* ===== 1. Acceptance of Terms ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By downloading, installing, or using the Island mobile
                            application (&quot;App&quot;), you agree to be bound by these
                            Terms &amp; Conditions (&quot;Terms&quot;). If you do not agree
                            to these Terms, you must not download, install, or use the App.
                        </p>
                        <p className="text-text-muted">
                            These Terms constitute a legally binding agreement between you
                            and Island (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
                            We reserve the right to modify these Terms at any time, and your
                            continued use of the App following any changes constitutes your
                            acceptance of the revised Terms.
                        </p>
                    </section>

                    {/* ===== 2. Description of Service ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            2. Description of Service
                        </h2>
                        <p>
                            Island is a personal productivity application designed to help
                            users build focused work habits through a calming, gamified
                            experience. The App includes, but is not limited to, the
                            following features:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Customizable focus sessions (Pomodoro-style timer)</li>
                            <li>A virtual coin system earned through completed sessions</li>
                            <li>Island customization with decorations, trees, and buildings</li>
                            <li>Visual calendar for tracking focus streaks</li>
                            <li>White noise and ambient soundscapes</li>
                            <li>
                                Account-based cloud storage for onboarding and profile data
                                (when signed in via Google)
                            </li>
                        </ul>
                    </section>

                    {/* ===== 3. Use of the App ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            3. Use of the App
                        </h2>
                        <p>
                            Island is intended for personal, non-commercial use only. You
                            agree to use the App in compliance with all applicable laws and
                            regulations. You shall not:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Reverse engineer, decompile, or disassemble the App</li>
                            <li>
                                Attempt to exploit, hack, or manipulate the App&apos;s
                                systems, including the virtual coin economy
                            </li>
                            <li>
                                Use the App in any manner that could damage, disable, or
                                impair its functionality
                            </li>
                            <li>
                                Redistribute, sublicense, or commercially exploit any part of
                                the App without prior written permission
                            </li>
                        </ul>
                    </section>

                    {/* ===== 4. Account and Authentication ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            4. Account and Authentication
                        </h2>
                        <p>
                            Island offers optional sign-in via Google, powered by Firebase
                            Authentication. When you choose to sign in, your authentication
                            is handled securely through Google&apos;s infrastructure.
                        </p>
                        <p className="text-text-muted">
                            You are solely responsible for safeguarding your Google account
                            credentials and for any activity that occurs under your account.
                            We are not liable for any loss or damage arising from
                            unauthorized access to your account due to your failure to
                            maintain the security of your credentials.
                        </p>
                        <p className="text-text-muted">
                            You may revoke Island&apos;s access to your Google account at
                            any time through your Google Account settings under
                            &quot;Third-party apps &amp; services.&quot;
                        </p>
                    </section>

                    {/* ===== 5. Cloud Storage and Data ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            5. Cloud Storage and Data
                        </h2>
                        <p>
                            If you sign in with Google, certain onboarding data and
                            account-related information may be stored securely using Firebase
                            services, including Firebase Firestore. This may include your
                            display name, self-reported screen time, and focus difficulty
                            preferences.
                        </p>
                        <p className="text-text-muted">
                            Core productivity data — including focus session history, island
                            progress, coin balance, timer settings, and calendar data — is
                            stored locally on your device.
                        </p>
                        <p className="text-text-muted">
                            We are not responsible for loss of locally stored data due to
                            device malfunction, factory reset, operating system updates, or
                            app uninstallation. It is your responsibility to manage your
                            device&apos;s data accordingly.
                        </p>
                    </section>

                    {/* ===== 6. Virtual Coins and Digital Goods ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            6. Virtual Coins and Digital Goods
                        </h2>
                        <p>
                            Island features a virtual coin system (&quot;Island
                            Coins&quot;). Coins are earned by completing focus sessions and
                            may also be acquired through in-app purchases. Please note:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                Island Coins are virtual digital items with{" "}
                                <strong>no real-world monetary value</strong>.
                            </li>
                            <li>
                                Coins cannot be redeemed for cash, converted to currency, or
                                transferred between users or accounts.
                            </li>
                            <li>
                                Virtual goods purchased with coins (decorations, buildings,
                                trees) are non-transferable and have no resale value.
                            </li>
                            <li>
                                We reserve the right to adjust pricing, coin balances, or the
                                virtual economy in the event of a technical error, exploit, or
                                to maintain the integrity of the App experience.
                            </li>
                        </ul>
                    </section>

                    {/* ===== 7. In-App Purchases ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            7. In-App Purchases
                        </h2>
                        <p>
                            Island offers optional in-app purchases, including Island Coin
                            bundles and the &quot;Remove Ads&quot; feature. All purchases are
                            processed exclusively through Google Play&apos;s billing system.
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                All purchases are final and non-refundable, except as required
                                by applicable law or Google Play&apos;s refund policies.
                            </li>
                            <li>
                                Refund requests must be submitted through Google Play. We do
                                not process refunds directly.
                            </li>
                            <li>
                                We do <strong>not</strong> collect, store, or have direct
                                access to your payment information. All payment data is
                                handled securely by Google Play.
                            </li>
                        </ul>
                    </section>

                    {/* ===== 8. Advertisements ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            8. Advertisements
                        </h2>
                        <p>
                            Island may display advertisements served through Google AdMob.
                            These advertisements help support the continued development and
                            availability of the App at no cost to users.
                        </p>
                        <p className="text-text-muted">
                            Users who purchase the &quot;Remove Ads&quot; feature will no
                            longer see advertisements within the App, except where
                            technically required by the platform or third-party services. You
                            may also opt out of personalized advertising through your
                            device&apos;s advertising settings.
                        </p>
                    </section>

                    {/* ===== 9. Research and Product Improvement ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            9. Research and Product Improvement
                        </h2>
                        <p>
                            Island may analyze anonymized and aggregated user data to improve
                            features, enhance user experience, and support internal product
                            research related to productivity and digital well-being.
                        </p>
                        <p className="text-text-muted">
                            No personally identifiable information is sold, shared, or
                            disclosed to third parties for research purposes. Any research
                            conducted using App data will rely exclusively on anonymized,
                            non-identifiable datasets. For more details on how your data is
                            handled, please refer to our{" "}
                            <Link
                                href="/privacy"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </section>

                    {/* ===== 10. Intellectual Property ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            10. Intellectual Property
                        </h2>
                        <p>
                            All content, graphics, illustrations, software, and other
                            materials within Island are the intellectual property of Island
                            and are protected by applicable copyright, trademark, and other
                            intellectual property laws.
                        </p>
                        <p className="text-text-muted">
                            You may not reproduce, distribute, modify, create derivative
                            works of, or publicly display any part of the App or its content
                            without prior written permission from us.
                        </p>
                    </section>

                    {/* ===== 11. Limitation of Liability ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            11. Limitation of Liability
                        </h2>
                        <p>
                            The App is provided on an &quot;as is&quot; and &quot;as
                            available&quot; basis, without warranties of any kind, either
                            express or implied, including but not limited to implied
                            warranties of merchantability, fitness for a particular purpose,
                            and non-infringement.
                        </p>
                        <p className="text-text-muted">
                            To the maximum extent permitted by applicable law, we shall not
                            be liable for any indirect, incidental, special, consequential,
                            or punitive damages, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Loss of data stored locally on your device</li>
                            <li>Loss of virtual coins or digital goods</li>
                            <li>Interruption or unavailability of the App</li>
                            <li>
                                Any damages resulting from unauthorized access to your account
                            </li>
                        </ul>
                    </section>

                    {/* ===== 12. Governing Law ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            12. Governing Law
                        </h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with
                            the laws of the jurisdiction in which the developer operates,
                            without regard to its conflict of law provisions. Any disputes
                            arising from or relating to these Terms or your use of the App
                            shall be resolved in accordance with the applicable laws of that
                            jurisdiction.
                        </p>
                    </section>

                    {/* ===== 13. Changes to Terms ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            13. Changes to These Terms
                        </h2>
                        <p>
                            We reserve the right to update or modify these Terms at any time.
                            When we make changes, we will update the &quot;Last updated&quot;
                            date at the top of this page. Your continued use of the App
                            following any modifications constitutes your acceptance of the
                            revised Terms. We encourage you to review these Terms
                            periodically.
                        </p>
                    </section>

                    {/* ===== 14. Contact ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            14. Contact Us
                        </h2>
                        <p>
                            If you have any questions or concerns about these Terms, please
                            contact us through our{" "}
                            <Link
                                href="/contact"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Contact page
                            </Link>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
