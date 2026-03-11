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

                <div className="space-y-10 text-[15px] text-text-dark leading-relaxed">

                    {/* ===== Introduction ===== */}
                    <p>
                        Island gives you full control over your data. Because the app stores most productivity data locally on your device and only limited onboarding data in secure cloud services, you can manage or delete your information at any time.
                    </p>

                    {/* ===== Types of Data Stored ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            Types of Data Stored
                        </h2>

                        <h3 className="text-base font-semibold text-text-dark">
                            1. Local Device Data
                        </h3>
                        <p className="text-text-muted">
                            The following data is created and stored exclusively on your device. It is never transmitted to our servers:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Focus session history and duration records</li>
                            <li>Island progress, decorations, and unlocked content</li>
                            <li>Island Coin balance</li>
                            <li>Timer settings and preferences</li>
                            <li>White noise and ambient sound preferences</li>
                            <li>Visual calendar data and streak records</li>
                        </ul>

                        <h3 className="text-base font-semibold text-text-dark">
                            2. Cloud-Based Data (Firebase)
                        </h3>
                        <p className="text-text-muted">
                            If you sign in with Google, the following limited data may be stored securely using Google Firebase services:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Your chosen display name</li>
                            <li>Self-reported focus difficulty related to screen time</li>
                            <li>Average daily screen time (as entered during onboarding)</li>
                            <li>Anonymous technical identifiers (Firebase UID)</li>
                        </ul>
                        <p className="text-text-muted">
                            This data is used solely to personalize your experience and improve Island's features.
                        </p>
                    </section>

                    {/* ===== Option 1: Clear App Data (Local Data Only) ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            Option 1: Clear App Data (Local Data Only)
                        </h2>
                        <div className="rounded-2xl bg-white/70 border border-pastel-green/10 p-6 space-y-2">
                            <p>
                                1. Open your device's <strong>Settings</strong>
                            </p>
                            <p>
                                2. Go to <strong>Apps</strong> → <strong>Island</strong>
                            </p>
                            <p>
                                3. Tap <strong>Storage &amp; cache</strong>
                            </p>
                            <p>
                                4. Tap <strong>Clear storage</strong> (or <strong>Clear data</strong>)
                            </p>
                            <p className="text-xs text-text-muted mt-3">
                                ⚠️ This will permanently delete all locally stored productivity data including focus history, island progress, coins, and settings.
                            </p>
                        </div>
                        <p className="text-text-muted">
                            This does not delete your cloud-based onboarding data if you signed in with Google.
                        </p>
                    </section>

                    {/* ===== Option 2: Uninstall the App ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            Option 2: Uninstall the App
                        </h2>
                        <p>
                            Uninstalling Island removes all locally stored data from your device.
                        </p>
                        <p className="text-text-muted">
                            Cloud-based onboarding data will not be automatically deleted upon uninstallation.
                        </p>
                    </section>

                    {/* ===== Option 3: Delete Your Account and Cloud Data ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            Option 3: Delete Your Account and Cloud Data
                        </h2>
                        <p>
                            If you signed in using Google, you may request permanent deletion of your account and associated cloud-based data.
                        </p>
                        <p className="text-text-muted">
                            To request account deletion:
                        </p>
                        <div className="rounded-2xl bg-white/70 border border-pastel-green/10 p-6 space-y-2">
                            <p>
                                1. Send an email to:{" "}
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=help.island.app@gmail.com&su=Account%20Deletion%20Request&body=Hi%20Island%20Team,%0A%0AI%20would%20like%20to%20request%20deletion%20of%20my%20account%20and%20cloud-based%20data.%0A%0AMy%20Google%20account%20email:%20"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pastel-green-deep font-medium hover:underline"
                                >
                                    help.island.app@gmail.com
                                </a>
                            </p>
                            <p>
                                2. Use the subject line:{" "}
                                <strong>&quot;Account Deletion Request&quot;</strong>
                            </p>
                            <p>
                                3. Include the <strong>Google email address</strong>{" "}
                                associated with your Island account
                            </p>
                        </div>
                        <p className="text-text-muted">
                            Your cloud-based onboarding data and Firebase account identifier will be permanently deleted within <strong>7 business days</strong> of receiving your request.
                        </p>
                        <p className="text-xs text-text-muted">
                            ⚠️ This action is irreversible. We may retain minimal information if required to comply with legal obligations.
                        </p>
                    </section>

                    {/* ===== What About Purchases? ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            What About Purchases?
                        </h2>
                        <p className="text-text-muted">
                            All in-app purchases (Island Coins and Remove Ads) are processed entirely by Google Play Billing.
                        </p>
                        <p className="text-text-muted">
                            Island does not collect or store payment information.
                        </p>
                        <p className="text-text-muted">
                            Purchase records are managed by Google Play and tied to your Google account. If you reinstall the app using the same Google account, purchases can be restored automatically.
                        </p>
                    </section>

                    {/* ===== Legal Compliance ===== */}
                    <section className="space-y-4 border-t border-pastel-green/10 pt-8">
                        <p className="text-text-muted">
                            Island does not sell personal data. We process onboarding data
                            solely for improving user experience, research insights, and
                            future feature development.
                        </p>
                        <p className="text-text-muted">
                            For additional information, please review our{" "}
                            <Link
                                href="/privacy"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </section>

                    {/* ===== Need Help? ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            Need Help?
                        </h2>
                        <p>
                            If you need further assistance, visit our{" "}
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
