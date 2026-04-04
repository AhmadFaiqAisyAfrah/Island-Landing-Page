import { Metadata } from "next";
import { Droplets, Utensils, Users, Heart, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Island Charity: Air Bersih & Nutrisi untuk Kepulauan Indonesia",
    description:
        "Island Charity membantu menyediakan air minum bersih dan nutrisi bagi masyarakat kepulauan Indonesia untuk mengatasi krisis air dan stunting.",
    keywords: [
        "charity",
        "air bersih",
        "nutrisi",
        "kepulauan Indonesia",
        "bantuan sosial",
        "stunting",
        "Island",
    ],
    openGraph: {
        title: "Island Charity: Air Bersih & Nutrisi untuk Kepulauan Indonesia",
        description:
            "Island Charity membantu menyediakan air minum bersih dan nutrisi bagi masyarakat kepulauan Indonesia untuk mengatasi krisis air dan stunting.",
        type: "website",
    },
};

export default function CharityPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-green)]/10 text-[var(--accent-green)] text-sm font-medium mb-6">
                        <Heart className="w-4 h-4" />
                        <span>Island Charity</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--heading-text)] leading-tight mb-6">
                        Membangun Kehidupan yang{" "}
                        <span className="text-[var(--accent-green)]">Lebih Sehat</span>{" "}
                        di Kepulauan Indonesia
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--paragraph-text)] max-w-3xl mx-auto leading-relaxed mb-10">
                        Akses terhadap air bersih dan nutrisi yang layak masih menjadi tantangan
                        besar di banyak wilayah kepulauan. Island hadir untuk membawa perubahan
                        nyata—melalui program penyediaan air minum dan dukungan gizi bagi
                        masyarakat yang membutuhkan.
                    </p>
                    <Link
                        href="#"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent-green)] text-white font-semibold rounded-full hover:bg-[var(--accent-green-hover)] transition-all shadow-lg hover:shadow-xl"
                    >
                        <Heart className="w-5 h-5" />
                        Dukung Sekarang
                    </Link>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-20 md:py-28 px-6 bg-[var(--bg-primary)]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading-text)] mb-4">
                            Krisis Air dan Nutrisi di{" "}
                            <span className="text-[var(--accent-green)]">Wilayah Kepulauan</span>
                        </h2>
                        <p className="text-[var(--paragraph-text)] text-lg max-w-2xl mx-auto">
                            Tantangan yang dihadapi masyarakat kepulauan Indonesia
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-start p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center">
                                <Droplets className="w-6 h-6 text-[var(--accent-green)]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[var(--heading-text)] mb-2">
                                    Kekurangan Air Bersih
                                </h3>
                                <p className="text-[var(--paragraph-text)] leading-relaxed">
                                    Banyak wilayah kepulauan yang menghadapi kesulitan akses air minum
                                    bersih. Jarak yang jauh dari sumber air tawar membuat
                                    masyarakat harus menempuh perjalanan panjang untuk mendapatkan
                                    air layak konsumsi.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center">
                                <Users className="w-6 h-6 text-[var(--accent-green)]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[var(--heading-text)] mb-2">
                                    Dampak pada Kesehatan
                                </h3>
                                <p className="text-[var(--paragraph-text)] leading-relaxed">
                                    Kurangnya akses air bersih menyebabkan berbagai masalah
                                    kesehatan seperti diare, infeksi kulit, dan penyakit lainnya.
                                    Anak-anak adalah kelompok yang paling rentan terhadap
                                    dampak kesehatan ini.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-[var(--accent-green)]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[var(--heading-text)] mb-2">
                                    Stunting akibat Gizi Buruk
                                </h3>
                                <p className="text-[var(--paragraph-text)] leading-relaxed">
                                    Indonesia masih menghadapi masalah stunting yang tinggi,
                                    terutama di wilayah terpencil. Kurangnya asupan nutrisi
                                    yang baik pada masa pertumbuhan anak menyebabkan
                                    gangguan perkembangan fisik dan kognitif.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-20 md:py-28 px-6 bg-[var(--bg-secondary)]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading-text)] mb-4">
                            Program{" "}
                            <span className="text-[var(--accent-green)]">Kami</span>
                        </h2>
                        <p className="text-[var(--paragraph-text)] text-lg max-w-2xl mx-auto">
                            Dua pilar utama untuk menciptakan perubahan nyata
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Air Bersih Card */}
                        <div className="group p-8 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-green)]/30 transition-all hover:shadow-xl">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-green)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Droplets className="w-8 h-8 text-[var(--accent-green)]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--heading-text)] mb-4">
                                Air Bersih
                            </h3>
                            <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                                Program penyediaan air minum bersih melalui teknologi filtrasi
                                sederhana dan sistem distribusi yang berkelanjutan untuk
                                masyarakat kepulauan.
                            </p>
                            <ul className="space-y-3 text-[var(--paragraph-text)]">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                                    <span>Pemasangan sistem filtrasi air</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                                    <span>Distribusi air bersih berkala</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                                    <span>Pembuatan sumur dan sumber air</span>
                                </li>
                            </ul>
                        </div>

                        {/* Nutrisi Card */}
                        <div className="group p-8 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-green)]/30 transition-all hover:shadow-xl">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-green)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Utensils className="w-8 h-8 text-[var(--accent-green)]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--heading-text)] mb-4">
                                Nutrisi & Pangan
                            </h3>
                            <p className="text-[var(--paragraph-text)] leading-relaxed mb-6">
                                Program bantuan makanan bergizi dan edukasi nutrisi untuk
                                memastikan anak-anak dan keluarga memiliki asupan gizi yang
                                seimbang dan berkelanjutan.
                            </p>
                            <ul className="space-y-3 text-[var(--paragraph-text)]">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                                    <span>Bantuan makanan bergizi</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                                    <span>Program susu dan vitamin</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                                    <span>Edukasi gizi untuk orang tua</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 md:py-28 px-6 bg-[var(--bg-primary)]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--heading-text)] mb-4">
                            Bagaimana Kami{" "}
                            <span className="text-[var(--accent-green)]">Membantu</span>
                        </h2>
                        <p className="text-[var(--paragraph-text)] text-lg max-w-2xl mx-auto">
                            Pendekatan kami untuk menciptakan dampak nyata
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4 items-start p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent-green)] flex items-center justify-center">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--heading-text)] mb-2">
                                    Distribusi Bantuan
                                </h4>
                                <p className="text-sm text-[var(--paragraph-text)]">
                                    Mengirimkan bantuan air bersih dan nutrisi langsung ke
                                    wilayah yang membutuhkan melalui jaringan logistik kami.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent-green)] flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--heading-text)] mb-2">
                                    Kerja Sama Komunitas Lokal
                                </h4>
                                <p className="text-sm text-[var(--paragraph-text)]">
                                    Bermitra dengan pemerintah daerah dan organisasi
                                    masyarakat untuk memastikan bantuan sampai ke
                                    tangan yang membutuhkan.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent-green)] flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--heading-text)] mb-2">
                                    Edukasi Kesehatan
                                </h4>
                                <p className="text-sm text-[var(--paragraph-text)]">
                                    Memberikan pelatihan dan edukasi tentang pentingnya
                                    air bersih dan nutrisi bagi kesehatan keluarga.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--accent-green)] flex items-center justify-center">
                                <Droplets className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--heading-text)] mb-2">
                                    Teknologi Sederhana
                                </h4>
                                <p className="text-sm text-[var(--paragraph-text)]">
                                    Menggunakan teknologi tepat guna yang mudah
                                    dipelihara dan dapat beroperasi di wilayah
                                    terpencil.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32 px-6 bg-gradient-to-br from-[var(--accent-green)] to-[#0d7a5c]">
                <div className="max-w-3xl mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Jadilah Bagian dari{" "}
                        <span className="text-yellow-200">Perubahan</span>
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 opacity-90">
                        Setiap kontribusi memiliki arti.
                    </p>
                    <Link
                        href="#"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[var(--accent-green)] font-bold text-lg rounded-full hover:bg-yellow-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <Heart className="w-6 h-6" />
                        Dukung Island Charity
                    </Link>
                </div>
            </section>
        </div>
    );
}
