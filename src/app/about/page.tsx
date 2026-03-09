import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Island – Calm Productivity & Deep Work Platform',
    description: 'Pelajari tentang Island, platform calm productivity yang membantu Anda fokus, bekerja mendalam, dan membangun sistem kerja berkelanjutan di era digital.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col pt-32 pb-16 bg-[var(--color-cream)]">
            <main className="flex-1 w-full max-w-[800px] mx-auto px-6 md:px-0 relative animate-fade-in-up">

                {/* 1. Hero Section */}
                <section className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-[var(--color-text-dark)] leading-tight mb-6">
                        About Island
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        Membangun ruang tenang di tengah bisingnya era digital. Kami membantu Anda mendapatkan kembali fokus dan bekerja lebih mendalam.
                    </p>
                </section>

                {/* 2. Tentang Island */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Tentang Island</h2>
                    <div className="prose prose-lg max-w-none text-[var(--color-text-muted)]">
                        <p>
                            Island hadir sebagai respons terhadap dunia kerja modern yang penuh dengan notifikasi tanpa henti, ekspektasi konektivitas 24/7, dan kelelahan mental. Lebih dari sekadar blog, Island adalah sebuah <strong>ekosistem produktivitas</strong> yang dirancang untuk mendukung cara kerja yang lebih berkelanjutan.
                        </p>
                        <p>
                            Kami percaya bahwa produktivitas terbaik tidak diukur dari seberapa sibuk Anda, tetapi dari seberapa banyak karya bermakna yang dapat Anda hasilkan tanpa mengorbankan keseimbangan dan ketenangan pikiran.
                        </p>
                    </div>
                </section>

                {/* 3. Filosofi (Calm Productivity) */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Filosofi Kami: Calm Productivity</h2>
                    <div className="prose prose-lg max-w-none text-[var(--color-text-muted)] space-y-4">
                        <p>
                            Kami mengusung filosofi <strong>Calm Productivity</strong>—sebuah pendekatan yang memprioritaskan niat (<em>intention</em>) di atas kecepatan. Di Island, kami menghargai kerja mendalam (<em>deep work</em>) di mana Anda bisa mencurahkan fokus penuh pada tugas-tugas yang kompleks dan berdampak tinggi.
                        </p>
                        <p>
                            Daripada mencoba melakukan semuanya sekaligus, kami mengajak Anda untuk mengurangi distraksi yang tidak perlu. Tujuannya sederhana: bekerja dengan ritme yang stabil agar Anda dapat mencapai potensi maksimal sekaligus menghindari jebakan <em>burnout</em>.
                        </p>
                    </div>
                </section>

                {/* 4. Apa yang Kami Lakukan */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6">Apa yang Kami Lakukan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)]">
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)] mb-2">Artikel Berbasis Riset</h3>
                            <p className="text-[var(--color-text-muted)]">Ulasan mendalam tentang sains fokus dan manajemen energi.</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)]">
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)] mb-2">Strategi Fokus Praktis</h3>
                            <p className="text-[var(--color-text-muted)]">Pendekatan yang bisa langsung diterapkan di keseharian Anda.</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)]">
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)] mb-2">Sistem Kerja Pribadi</h3>
                            <p className="text-[var(--color-text-muted)]">Panduan untuk mendesain rutinitas kerja yang paling sesuai dengan Anda.</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pastel-sand)]">
                            <h3 className="font-semibold text-lg text-[var(--color-text-dark)] mb-2">Produktivitas Berkelanjutan</h3>
                            <p className="text-[var(--color-text-muted)]">Tips menyeimbangkan <em>output</em> tinggi dengan istirahat yang bermakna.</p>
                        </div>
                    </div>
                </section>

                {/* 5. Tentang Founder */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Tentang Founder</h2>
                    <div className="prose prose-lg max-w-none text-[var(--color-text-muted)]">
                        <p>
                            Island didirikan oleh <strong>Ahmad Faiq</strong> dengan visi untuk menyederhanakan cara kita bekerja di era yang penuh distraksi. Berangkat dari pengalaman menghadapi tuntutan kerja yang tinggi, Faiq membangun Island sebagai ruang untuk mengeksplorasi, mempraktikkan, dan membagikan sistem produktivitas yang tenang, terstruktur, dan efektif—tanpa mengorbankan kesejahteraan mental.
                        </p>
                    </div>
                </section>

                {/* 6. Misi */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Misi Island</h2>
                    <ul className="list-disc pl-5 space-y-3 text-lg text-[var(--color-text-muted)]">
                        <li>Mengembalikan kendali atas fokus dan perhatian di tengah ekonomi distraksi.</li>
                        <li>Mengedukasi pendekatan kerja yang sehat, tenang, dan berkelanjutan.</li>
                        <li>Menyediakan alat dan <em>framework</em> untuk membantu transisi ke model <em>deep work</em>.</li>
                        <li>Membangun komunitas profesional yang peduli pada keseimbangan antara karya dan kehidupan.</li>
                    </ul>
                </section>

                {/* 7. CTA Section */}
                <section className="mt-20 pt-12 border-t border-[var(--color-pastel-sand)] text-center">
                    <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-4">
                        Mulai Perjalanan Ketenangan Anda
                    </h2>
                    <p className="text-lg text-[var(--color-text-muted)] mb-8 max-w-xl mx-auto">
                        Jelajahi berbagai artikel untuk membantu Anda membangun kebiasaan fokus yang baru, atau coba aplikasi kami untuk memfasilitasi kerja mendalam Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/articles" className="w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-text-dark)] font-medium rounded-full border border-[var(--color-pastel-sand)] hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md text-center">
                            Baca Artikel
                        </Link>
                        <Link href="/#download" className="w-full sm:w-auto px-8 py-4 bg-[var(--color-pastel-green-deep)] text-white font-medium rounded-full border border-transparent hover:bg-[#5FBF8F] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                            Coba Aplikasi
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}
