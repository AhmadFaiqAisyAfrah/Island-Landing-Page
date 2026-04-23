import Link from "next/link";
import { FileText, Image, FileStack, Scissors, FileLock } from "lucide-react";

export const metadata = {
  title: "PDF Tools - Island Tools",
  description: "Free online PDF conversion tools. Merge, split, compress PDFs and more. Fast, secure, and browser-based.",
};

const tools = [
  {
    href: "/tools/jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert images to PDF",
    icon: FileText,
    color: "bg-emerald-100 text-emerald-600",
  },
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
    description: "Extract PDF pages",
    icon: Scissors,
    color: "bg-purple-100 text-purple-600",
  },
  {
    href: "/tools/compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size",
    icon: FileLock,
    color: "bg-red-100 text-red-600",
  },
];

export default function PdfToolsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            PDF Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Free online PDF conversion tools. Merge, split, and compress PDFs instantly in your browser.
            Fast, secure, and 100% private.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            ← View All Converter Tools
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
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

        <div className="mt-12 text-center">
          <Link
            href="/tools/image"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View Image Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}