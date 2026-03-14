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

                    {/* ===== Option 1: Clear App Data ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            Option 1: Clear App Data (Local Data Only)
                        </h2>
                        <div className="rounded-2xl bg-white/70 border border-pastel-green/10 p-6 space-y-2">
                            <p>
                                1. Open your device&apos;s <strong>Settings</strong>
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

                    {/* ===== Questions? ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            Questions?
                        </h2>
                        <p className="text-text-muted">
                            If you have any questions or need assistance with data deletion, please contact us at{" "}
                            <a
                                href="mailto:help.island.app@gmail.com"
                                className="text-pastel-green-deep hover:underline"
                            >
                                help.island.app@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
