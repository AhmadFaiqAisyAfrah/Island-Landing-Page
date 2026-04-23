import Link from "next/link";
import { FileText, Image, File, FileStack, ArrowRightLeft, Shrink, Maximize2, Scissors, Minimize2, FileEdit, Table, FileSpreadsheet } from "lucide-react";

export const metadata = {
  title: "Converter Tools - Island Tools",
  description: "Free online converter tools. Convert images and PDFs instantly. Fast, secure, and browser-based.",
};

const imageTools = [
  {
    href: "/tools/jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert images to PDF documents",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    href: "/tools/jpg-to-png",
    title: "JPG to PNG",
    description: "Convert JPG to PNG format",
    icon: Image,
    color: "bg-blue-100 text-blue-600",
  },
  {
    href: "/tools/png-to-jpg",
    title: "PNG to JPG",
    description: "Convert PNG to JPG format",
    icon: Image,
    color: "bg-pink-100 text-pink-600",
  },
  {
    href: "/tools/jpg-to-webp",
    title: "JPG to WebP",
    description: "Convert to WebP format",
    icon: ArrowRightLeft,
    color: "bg-violet-100 text-violet-600",
  },
  {
    href: "/tools/webp-to-jpg",
    title: "WebP to JPG",
    description: "Convert WebP to JPG format",
    icon: ArrowRightLeft,
    color: "bg-teal-100 text-teal-600",
  },
  {
    href: "/tools/image-converter",
    title: "Image Converter",
    description: "Convert between JPG, PNG, WebP",
    icon: ArrowRightLeft,
    color: "bg-purple-100 text-purple-600",
  },
  {
    href: "/tools/compress-image",
    title: "Image Compressor",
    description: "Reduce image file size",
    icon: Shrink,
    color: "bg-orange-100 text-orange-600",
  },
  {
    href: "/tools/resize-image",
    title: "Resize Image",
    description: "Change image dimensions",
    icon: Maximize2,
    color: "bg-cyan-100 text-cyan-600",
  },
];

const pdfTools = [
  {
    href: "/tools/pdf-to-jpg",
    title: "PDF to JPG",
    description: "Extract images from PDF",
    icon: Image,
    color: "bg-blue-100 text-blue-600",
  },
  {
    href: "/tools/merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs",
    icon: FileStack,
    color: "bg-orange-100 text-orange-600",
  },
  {
    href: "/tools/split-pdf",
    title: "Split PDF",
    description: "Split PDF into pages",
    icon: Scissors,
    color: "bg-purple-100 text-purple-600",
  },
  {
    href: "/tools/compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size",
    icon: Minimize2,
    color: "bg-red-100 text-red-600",
  },
  {
    href: "/tools/pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to DOCX",
    icon: FileEdit,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    href: "/tools/word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOCX to PDF",
    icon: FileEdit,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    href: "/tools/pdf-to-excel",
    title: "PDF to Excel",
    description: "Extract tables to Excel",
    icon: Table,
    color: "bg-green-100 text-green-600",
  },
  {
    href: "/tools/jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert images to PDF",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    href: "/tools/excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel to PDF",
    icon: FileSpreadsheet,
    color: "bg-green-100 text-green-600",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Converter Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free online converter tools. Convert images and PDFs instantly in your browser.
            Fast, secure, and 100% private.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Image className="w-6 h-6" />
            Image Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {imageTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-6 rounded-2xl border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-emerald-600">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <File className="w-6 h-6" />
            PDF Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pdfTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-6 rounded-2xl border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-emerald-600">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center py-8 bg-gray-50 rounded-2xl">
          <p className="text-gray-600 mb-2">
            {imageTools.length + pdfTools.length} tools available
          </p>
          <p className="text-sm text-gray-500">
            All conversions happen in your browser. Your files never leave your device.
          </p>
        </div>
      </div>
    </div>
  );
}