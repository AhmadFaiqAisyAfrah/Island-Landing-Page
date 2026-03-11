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
                            using the App, you agree to the collection and use of information
                            in accordance with this Privacy Policy.
                        </p>
                        <p>
                            We are committed to protecting your privacy and being transparent
                            about how your information is handled. Island is designed with
                            privacy as a core principle — your productivity data stays on your
                            device, and we only collect what is necessary to provide and
                            improve the App experience.
                        </p>
                    </section>

                    {/* ===== 1. Information We Collect ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            1. Information We Collect
                        </h2>

                        <h3 className="text-base font-semibold text-text-dark">
                            1.1 Information Stored Locally on Your Device
                        </h3>
                        <p>
                            The following data is created and stored exclusively on your
                            device using local storage. This data is <strong>never</strong>{" "}
                            transmitted to our servers or any third party:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Focus session history and duration records</li>
                            <li>Island progress, decorations, and unlocked content</li>
                            <li>Island Coin balance and transaction history within the App</li>
                            <li>Timer settings and preferences</li>
                            <li>White noise and ambient sound preferences</li>
                            <li>Visual calendar data and streak records</li>
                            <li>App theme and display preferences</li>
                        </ul>
                        <p className="text-text-muted">
                            You have full control over this data. It can be deleted at any
                            time by clearing the App&apos;s data in your device settings or by
                            uninstalling the App. For detailed instructions, please visit our{" "}
                            <Link
                                href="/data-deletion"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Data Deletion Guide
                            </Link>
                            .
                        </p>

                        <h3 className="text-base font-semibold text-text-dark">
                            1.2 Onboarding Information
                        </h3>
                        <p>
                            When you first use Island, you may voluntarily provide certain
                            information during the onboarding process, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Your chosen display name</li>
                            <li>Your self-reported difficulty focusing due to screen time</li>
                            <li>Your estimated average daily screen time</li>
                        </ul>
                        <p className="text-text-muted">
                            This information is securely stored using Google Firebase services.
                            The onboarding information may be used to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Personalize your Island experience</li>
                            <li>Improve product features and user experience</li>
                            <li>Conduct internal analytics and product development</li>
                            <li>
                                Support future improvements and potential academic or scientific
                                research related to productivity and digital well-being
                            </li>
                        </ul>
                        <p className="text-text-muted">
                            Any research usage will be based on anonymized and aggregated data
                            only. Island does not sell personal data.
                        </p>

                        <h3 className="text-base font-semibold text-text-dark">
                            1.3 Information Collected Through Third-Party Services
                        </h3>
                        <p>
                            The App integrates with third-party services provided by Google.
                            These services may collect certain information automatically as
                            described below. We do not have direct access to the raw data
                            collected by these services beyond the aggregated reports and
                            analytics they provide.
                        </p>
                    </section>

                    {/* ===== 2. Third-Party Services ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            2. Third-Party Services
                        </h2>
                        <p>
                            Island uses the following third-party services. Each service has
                            its own Privacy Policy governing the collection and use of
                            information. We encourage you to review these policies.
                        </p>

                        {/* Google Play Services */}
                        <h3 className="text-base font-semibold text-text-dark">
                            2.1 Google Play Services
                        </h3>
                        <p className="text-text-muted">
                            Google Play Services is a core component required for the App to
                            function on Android devices. It may collect device information,
                            usage data, and unique identifiers. For more information, see the{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Google Privacy Policy
                            </a>
                            .
                        </p>

                        {/* Firebase Authentication */}
                        <h3 className="text-base font-semibold text-text-dark">
                            2.2 Firebase Authentication (Google Sign-In)
                        </h3>
                        <p className="text-text-muted">
                            Island offers optional sign-in via Google Sign-In, powered by
                            Firebase Authentication. When you choose to sign in, we may
                            receive the following information from your Google account:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Display name</li>
                            <li>Email address</li>
                            <li>Profile photo URL</li>
                            <li>Unique user identifier (UID)</li>
                        </ul>
                        <p className="text-text-muted">
                            This information is used solely for authentication purposes and to
                            personalize your experience within the App. We do not sell, share,
                            or distribute your Google account information to any third party.
                        </p>
                        <p className="text-text-muted">
                            Island may also use Firebase Firestore or related Firebase database
                            services to securely store onboarding data and account-related
                            information when users sign in. This data is handled in accordance
                            with Google&apos;s security standards and is used solely to provide
                            and improve the App experience.
                        </p>
                        <p className="text-text-muted">
                            For more information, see the{" "}
                            <a
                                href="https://firebase.google.com/support/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Firebase Privacy Policy
                            </a>
                            .
                        </p>

                        {/* Google Analytics for Firebase */}
                        <h3 className="text-base font-semibold text-text-dark">
                            2.3 Google Analytics for Firebase
                        </h3>
                        <p className="text-text-muted">
                            We use Google Analytics for Firebase to understand how users
                            interact with the App. This service collects anonymous usage data,
                            including:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>App opens and session duration</li>
                            <li>Screen views and navigation patterns</li>
                            <li>Device type, operating system version, and country</li>
                            <li>Crash and error event data</li>
                        </ul>
                        <p className="text-text-muted">
                            This data is collected in aggregate form and does not personally
                            identify you. It is used exclusively to improve the App&apos;s
                            features, performance, and user experience.
                        </p>
                        <p className="text-text-muted">
                            Aggregated onboarding insights (such as general screen time trends
                            or focus difficulty patterns) may also be analyzed internally to
                            improve Island&apos;s focus systems. These analyses do not identify
                            individual users.
                        </p>
                        <p className="text-text-muted">
                            For more information, see the{" "}
                            <a
                                href="https://firebase.google.com/support/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Firebase Privacy Policy
                            </a>
                            .
                        </p>

                        {/* Firebase Crashlytics */}
                        <h3 className="text-base font-semibold text-text-dark">
                            2.4 Firebase Crashlytics
                        </h3>
                        <p className="text-text-muted">
                            Firebase Crashlytics is used to collect crash reports and
                            diagnostic information when the App encounters an error. Data
                            collected may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Crash stack traces and error logs</li>
                            <li>Device state at the time of crash (memory, storage, battery)</li>
                            <li>Device model and operating system version</li>
                            <li>Crashlytics installation UUID</li>
                        </ul>
                        <p className="text-text-muted">
                            This data is used solely to identify, diagnose, and resolve
                            technical issues in order to improve App stability. For more
                            information, see the{" "}
                            <a
                                href="https://firebase.google.com/support/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Firebase Privacy Policy
                            </a>
                            .
                        </p>

                        {/* Google AdMob */}
                        <h3 className="text-base font-semibold text-text-dark">
                            2.5 Google AdMob
                        </h3>
                        <p className="text-text-muted">
                            Island displays advertisements through Google AdMob. AdMob may
                            collect and use data to serve personalized or non-personalized
                            advertisements, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Advertising ID (can be reset or opted out in device settings)</li>
                            <li>Device information and approximate location</li>
                            <li>Ad interaction data (impressions, clicks)</li>
                        </ul>
                        <p className="text-text-muted">
                            You may opt out of personalized advertising by adjusting your
                            device&apos;s ad settings. For more information, see the{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Google Privacy Policy
                            </a>{" "}
                            and the{" "}
                            <a
                                href="https://support.google.com/admob/answer/6128543"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pastel-green-deep hover:underline"
                            >
                                AdMob Privacy &amp; Data Disclosure
                            </a>
                            .
                        </p>

                        {/* Google Play Billing */}
                        <h3 className="text-base font-semibold text-text-dark">
                            2.6 Google Play Billing
                        </h3>
                        <p className="text-text-muted">
                            All in-app purchases within Island — including Island Coin bundles
                            and ad removal — are processed entirely through Google Play&apos;s
                            billing system. We do <strong>not</strong> collect, store, or have
                            direct access to your payment information, including credit card
                            numbers, billing addresses, or financial account details. All
                            payment processing is handled securely by Google Play. For more
                            information, see the{" "}
                            <a
                                href="https://payments.google.com/payments/apis-secure/get_legal_document?ldo=0&ldt=privacynotice"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Google Payments Privacy Notice
                            </a>
                            .
                        </p>
                    </section>

                    {/* ===== 3. How We Use Your Information ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            3. How We Use Your Information
                        </h2>
                        <p>We use the information described above for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>To provide and maintain the core functionality of the App</li>
                            <li>To authenticate your identity when you choose to sign in with Google</li>
                            <li>To process in-app purchases via Google Play Billing</li>
                            <li>To display advertisements through Google AdMob</li>
                            <li>
                                To analyze anonymous usage patterns and improve the App&apos;s
                                features, performance, and user experience
                            </li>
                            <li>To identify and fix technical issues, crashes, and bugs</li>
                            <li>To comply with legal obligations and enforce our Terms &amp; Conditions</li>
                        </ul>
                    </section>

                    {/* ===== 4. Data Sharing ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            4. Data Sharing and Disclosure
                        </h2>
                        <p>
                            We do <strong>not</strong> sell, rent, or trade your personal
                            information to third parties. Information may be shared only under
                            the following limited circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                <strong>With third-party service providers</strong> as described
                                in Section 2 (Google Play Services, Firebase, AdMob), solely for
                                the purposes of providing App functionality, analytics, crash
                                reporting, and advertising.
                            </li>
                            <li>
                                <strong>As required by law</strong>, including to comply with a
                                legal obligation, protect and defend our rights or property,
                                prevent fraud, or protect the personal safety of users.
                            </li>
                        </ul>
                    </section>

                    {/* ===== 5. Data Retention ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            5. Data Retention
                        </h2>
                        <p>
                            Locally stored data (focus sessions, island progress, preferences)
                            is retained on your device until you clear the App&apos;s data or
                            uninstall the App. We do not maintain copies of this data on any
                            server.
                        </p>
                        <p>
                            Data collected through third-party services (Firebase Analytics,
                            Crashlytics, AdMob) is retained according to each service
                            provider&apos;s data retention policies. Google&apos;s default
                            retention period for analytics data is 14 months, after which it
                            is automatically deleted. Crash reports are retained for 90 days.
                        </p>
                        <p>
                            Onboarding data stored in Firebase may be retained for as long as
                            necessary to maintain user accounts and improve the application
                            experience. Users may request deletion of their account-associated
                            data via the{" "}
                            <Link
                                href="/contact"
                                className="text-pastel-green-deep hover:underline"
                            >
                                Contact page
                            </Link>
                            .
                        </p>
                    </section>

                    {/* ===== 6. Data Security ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            6. Data Security
                        </h2>
                        <p>
                            We take the security of your information seriously. Locally stored
                            data is protected by your device&apos;s built-in security features
                            (lock screen, encryption). Communications between the App and
                            third-party services are transmitted over secure, encrypted
                            connections (HTTPS/TLS).
                        </p>
                        <p>
                            However, please be aware that no method of electronic storage or
                            transmission over the Internet is 100% secure. While we strive to
                            use commercially acceptable means to protect your information, we
                            cannot guarantee its absolute security.
                        </p>
                    </section>

                    {/* ===== 7. Children's Privacy ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            7. Children&apos;s Privacy
                        </h2>
                        <p>
                            Island is not directed at children under the age of 13. We do not
                            knowingly collect personally identifiable information from children
                            under 13. If we discover that a child under 13 has provided us
                            with personal information, we will take steps to delete such
                            information promptly. If you are a parent or guardian and believe
                            your child has provided us with personal information, please
                            contact us so that we can take appropriate action.
                        </p>
                    </section>

                    {/* ===== 8. Your Rights ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            8. Your Rights and Choices
                        </h2>
                        <p>You have the following rights regarding your information:</p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>
                                <strong>Delete local data:</strong> You can delete all locally
                                stored data at any time by clearing the App&apos;s data in your
                                device settings or by uninstalling the App.
                            </li>
                            <li>
                                <strong>Opt out of personalized ads:</strong> You can opt out of
                                personalized advertising by adjusting your device&apos;s
                                advertising settings or resetting your Advertising ID.
                            </li>
                            <li>
                                <strong>Revoke Google Sign-In:</strong> If you have signed in
                                with Google, you can revoke access at any time through your
                                Google Account settings under &quot;Third-party apps &amp;
                                services&quot;.
                            </li>
                            <li>
                                <strong>Request data deletion:</strong> For any data deletion
                                requests beyond local data, please contact us using the
                                information provided below.
                            </li>
                        </ul>
                    </section>

                    {/* ===== 9. Changes ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            9. Changes to This Privacy Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect
                            changes in our practices, third-party services, or applicable laws.
                            When we make changes, we will update the &quot;Last updated&quot;
                            date at the top of this page. We encourage you to review this
                            Privacy Policy periodically for any changes. Your continued use of
                            the App after any modifications to this Privacy Policy constitutes
                            your acceptance of such changes.
                        </p>
                    </section>

                    {/* ===== 10. Contact ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            10. Contact Us
                        </h2>
                        <p>
                            If you have any questions, concerns, or requests regarding this
                            Privacy Policy or our data practices, please contact us through
                            our{" "}
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
