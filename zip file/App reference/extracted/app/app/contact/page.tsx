import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Contact — Island",
    description: "Get in touch with the Island team.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-28 pb-20 bg-cream">
            <div className="mx-auto max-w-3xl px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm text-pastel-green-deep hover:underline mb-8"
                >
                    ← Back to home
                </Link>

                <h1 className="text-3xl font-bold text-text-dark mb-4">
                    Get in Touch
                </h1>
                <p className="text-text-muted mb-10">
                    We&apos;d love to hear from you. Whether you have a question, feedback,
                    or just want to say hi — reach out anytime.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-pastel-green/10 p-8 text-center space-y-4 hover:shadow-lg transition-all">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-green/20">
                            <span className="text-3xl">📧</span>
                        </div>
                        <h3 className="text-lg font-semibold text-text-dark">Email</h3>
                        <p className="text-sm text-text-muted">
                            For general inquiries, support, or feedback.
                        </p>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=help.island.app@gmail.com&su=Island%20App%20Support&body=Hi%20Island%20Team,"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm font-medium text-pastel-green-deep hover:underline"
                        >
                            help.island.app@gmail.com
                        </a>
                    </div>

                    {/* Feedback */}
                    <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-pastel-green/10 p-8 text-center space-y-4 hover:shadow-lg transition-all">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-blue/20">
                            <span className="text-3xl">💬</span>
                        </div>
                        <h3 className="text-lg font-semibold text-text-dark">
                            Google Play
                        </h3>
                        <p className="text-sm text-text-muted">
                            Leave a review or report an issue on the Play Store.
                        </p>
                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-sm font-medium text-pastel-blue-deep hover:underline"
                        >
                            Open Play Store
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
