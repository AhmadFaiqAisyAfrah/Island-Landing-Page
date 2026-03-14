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
                            Terms and Conditions (&quot;Terms&quot;). If you disagree with
                            any part of these Terms, you may not use the App.
                        </p>
                    </section>

                    {/* ===== 2. Intellectual Property ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            2. Intellectual Property
                        </h2>
                        <p>
                            The App, including but not limited to its design, graphics,
                            logos, icons, and software, is the intellectual property of
                            Island. All rights reserved. You may not copy, modify,
                            distribute, sell, or lease any part of the App without prior
                            written permission from us.
                        </p>
                    </section>

                    {/* ===== 3. User Content ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            3. User Content
                        </h2>
                        <p>
                            The App allows you to create, upload, and store content such
                            as notes, flashcards, and study materials (&quot;User
                            Content&quot;). You retain ownership of your User Content and
                            grant us a license to use it solely for providing and
                            improving the App&apos;s services.
                        </p>
                        <p className="text-text-muted">
                            By creating User Content, you represent and warrant that:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>You own or have the necessary rights to use and share your User Content.</li>
                            <li>Your User Content does not infringe on the intellectual property rights of any third party.</li>
                            <li>Your User Content does not contain harmful, illegal, or inappropriate material.</li>
                        </ul>
                    </section>

                    {/* ===== 4. Prohibited Uses ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            4. Prohibited Uses
                        </h2>
                        <p>
                            You agree not to use the App for any unlawful purpose or in
                            any way that could damage, disable, overburden, or impair the
                            App. Prohibited activities include, but are not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>Attempting to gain unauthorized access to the App&apos;s systems.</li>
                            <li>Using the App to transmit viruses, malware, or other harmful code.</li>
                            <li>Engaging in any activity that interferes with or disrupts the App.</li>
                            <li>Collecting or storing personal data about other users without their consent.</li>
                        </ul>
                    </section>

                    {/* ===== 5. Disclaimer of Warranties ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            5. Disclaimer of Warranties
                        </h2>
                        <p>
                            THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
                            WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT
                            THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY
                            SECURE.
                        </p>
                        <p className="text-text-muted">
                            To the maximum extent permitted by law, we disclaim all
                            warranties, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</li>
                            <li>WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.</li>
                        </ul>
                    </section>

                    {/* ===== 6. Limitation of Liability ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            6. Limitation of Liability
                        </h2>
                        <p>
                            IN NO EVENT SHALL ISLAND BE LIABLE FOR ANY INDIRECT,
                            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                            INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE,
                            GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-text-muted">
                            <li>YOUR USE OR INABILITY TO USE THE APP.</li>
                            <li>ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS.</li>
                            <li>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE APP.</li>
                            <li>ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE APP.</li>
                        </ul>
                    </section>

                    {/* ===== 7. Indemnification ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            7. Indemnification
                        </h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless Island and
                            its officers, directors, employees, and agents from and
                            against any claims, liabilities, damages, losses, or expenses
                            (including reasonable attorneys&apos; fees) arising out of or
                            in any way connected with your access to or use of the App
                            or your violation of these Terms.
                        </p>
                    </section>

                    {/* ===== 8. Changes to Terms ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            8. Changes to Terms
                        </h2>
                        <p>
                            We reserve the right to modify these Terms at any time. We
                            will provide notice of any material changes by posting the
                            new Terms on this page and updating the &quot;Last updated&quot;
                            date. Your continued use of the App after any such changes
                            constitutes your acceptance of the new Terms.
                        </p>
                    </section>

                    {/* ===== 9. Termination ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            9. Termination
                        </h2>
                        <p>
                            We may terminate or suspend your access to the App
                            immediately, without prior notice or liability, for any
                            reason whatsoever, including without limitation if you breach
                            these Terms. Upon termination, your right to use the App will
                            immediately cease.
                        </p>
                    </section>

                    {/* ===== 10. Governing Law ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            10. Governing Law
                        </h2>
                        <p>
                            These Terms shall be governed by and construed in accordance
                            with the laws of Indonesia, without regard to its conflict of
                            law provisions.
                        </p>
                    </section>

                    {/* ===== 11. Contact Us ===== */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-text-dark">
                            11. Contact Us
                        </h2>
                        <p>
                            If you have any questions about these Terms, please contact
                            us at:{" "}
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
