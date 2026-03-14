import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy — Island",
    description:
        "Privacy Policy for the Island productivity app. Learn how we handle your data, third-party integrations, and your rights.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-28 pb-20 bg-cream">
            <div className="mx-auto max-w-3xl px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm text-pastel-green-deep hover:underline mb-8"
                >
                    ← Back to home
                </Link>

                <h1 className="text-3xl sm:text-4xl font-bold text-text-dark mb-3">
                    Privacy Policy
                </h1>
                <p className="text-sm text-text-muted mb-10">
                    <strong>Last updated:</strong> February 2026
                </p>

                <div className="space-y-10 text-[15px] text-text-dark leading-relaxed">
                    {/* ===== Introduction ===== */}
                    <section className="space-y-4">
                        <p>
                            This Privacy Policy describes how <strong>Island</strong>{" "}
                            (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
                            uses, and shares information when you use the Island mobile
                            application (the &quot;App&quot;). By downloading, installing, or
                            using the App, you agree to the collection and use of
                            information in accordance with this policy.
                        </p>
                    </section>

                    {/* ===== Information We Collect ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            1. Information We Collect
                        </h2>
                        <h3 className="text-base font-semibold text-text-dark">
                            Personal Information
                        </h3>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                <strong>Google Sign-In:</strong> When you sign in with
                                Google, we receive your basic profile information
                                (name, email address, and profile picture) for
                                authentication purposes only.
                            </li>
                            <li>
                                <strong>User Content:</strong> Any notes, flashcards, or
                                other content you create within the App is stored
                                locally on your device and/or in our secure cloud
                                database.
                            </li>
                        </ul>
                        <h3 className="text-base font-semibold text-text-dark">
                            Automatically Collected Information
                        </h3>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                <strong>Device Information:</strong> We may collect
                                device-specific information such as device model,
                                operating system version, and unique device identifiers.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> We collect data about how you
                                interact with the App, including session duration,
                                feature usage, and crash logs for troubleshooting
                                purposes.
                            </li>
                            <li>
                                <strong>Analytics:</strong> We use Firebase Analytics to
                                understand user behavior and improve the App. This data
                                is anonymized and cannot be used to identify you
                                personally.
                            </li>
                        </ul>
                    </section>

                    {/* ===== How We Use Information ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            2. How We Use Information
                        </h2>
                        <p className="text-text-muted">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                <strong>Provide and Maintain Services:</strong> To deliver
                                the core functionality of the App, including focus
                                sessions, flashcards, and progress tracking.
                            </li>
                            <li>
                                <strong>Improve and Develop Services:</strong> To analyze
                                usage patterns and enhance user experience.
                            </li>
                            <li>
                                <strong>Communicate with You:</strong> To send important
                                updates, respond to your inquiries, and provide customer
                                support.
                            </li>
                            <li>
                                <strong>Personalization:</strong> To tailor content and
                                recommendations based on your usage patterns.
                            </li>
                        </ul>
                    </section>

                    {/* ===== Data Storage and Security ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            3. Data Storage and Security
                        </h2>
                        <h3 className="text-base font-semibold text-text-dark">
                            Local Storage
                        </h3>
                        <p className="text-text-muted">
                            Most of your data—including focus sessions, notes, flashcards,
                            island progress, and coins—is stored locally on your device.
                            This data remains under your control and can be deleted at
                            any time by clearing the App&apos;s data or uninstalling the
                            App.
                        </p>
                        <h3 className="text-base font-semibold text-text-dark">
                            Cloud Storage
                        </h3>
                        <p className="text-text-muted">
                            When you sign in with Google, limited onboarding data (such as
                            your name and email) is stored in Firebase Cloud Firestore
                            to enable cross-device synchronization and account recovery.
                            This data is encrypted both in transit and at rest using
                            Firebase&apos;s industry-standard security measures.
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                All data transfers are encrypted using HTTPS/TLS
                                protocol.
                            </li>
                            <li>
                                Firebase provides robust access controls and regular
                                security audits.
                            </li>
                            <li>
                                We follow security best practices recommended by Google
                                Cloud.
                            </li>
                        </ul>
                    </section>

                    {/* ===== Third-Party Services ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            4. Third-Party Services
                        </h2>
                        <p className="text-text-muted">
                            The App uses the following third-party services:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                <strong>Firebase (Google):</strong> Used for authentication,
                                cloud database, and analytics. View{" "}
                                <a
                                    href="https://firebase.google.com/support/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pastel-green-deep hover:underline"
                                >
                                    Firebase Privacy Policy
                                </a>
                            </li>
                            <li>
                                <strong>Google Play Services:</strong> Used for sign-in and
                                device verification.
                            </li>
                            <li>
                                <strong>Google AdMob:</strong> Displays ads in the free
                                version of the App. View{" "}
                                <a
                                    href="https://support.google.com/admob/answer/6128543"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pastel-green-deep hover:underline"
                                >
                                    AdMob Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* ===== Your Rights ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            5. Your Rights
                        </h2>
                        <p className="text-text-muted">
                            You have the following rights regarding your data:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                <strong>Access:</strong> You can view all data stored locally
                                within the App.
                            </li>
                            <li>
                                <strong>Deletion:</strong> You can delete all local data by
                                clearing App data in your device settings or uninstalling
                                the App. For cloud data deletion, see our{" "}
                                <Link
                                    href="/data-deletion"
                                    className="text-pastel-green-deep hover:underline"
                                >
                                    Data Deletion Guide
                                </Link>
                                .
                            </li>
                            <li>
                                <strong>Opt-Out:</strong> You can disable analytics tracking
                                through your device settings or by contacting us.
                            </li>
                        </ul>
                    </section>

                    {/* ===== Children&apos;s Privacy ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            6. Children&apos;s Privacy
                        </h2>
                        <p className="text-text-muted">
                            The App is not intended for children under the age of 13. We
                            do not knowingly collect personal information from children
                            under 13. If you become aware that a child has provided us
                            with personal information, please contact us so we can delete
                            such data.
                        </p>
                    </section>

                    {/* ===== Changes to Privacy Policy ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            7. Changes to Privacy Policy
                        </h2>
                        <p className="text-text-muted">
                            We may update this Privacy Policy from time to time. We will
                            notify you of any changes by posting the new Privacy Policy
                            on this page and updating the &quot;Last updated&quot; date. You
                            are advised to review this Privacy Policy periodically for
                            any changes.
                        </p>
                    </section>

                    {/* ===== Contact Us ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            8. Contact Us
                        </h2>
                        <p className="text-text-muted">
                            If you have any questions or suggestions about this Privacy
                            Policy, please contact us at:{" "}
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
