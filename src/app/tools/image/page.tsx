import Link from "next/link";
import { FileText, Image, ArrowRightLeft, FileImage, FileStack, Shrink } from "lucide-react";

export const metadata = {
  title: "Image Tools - Island Tools",
  description: "Free online image conversion tools. Convert JPG to PNG, compress images, resize, and more. Fast, secure, and browser-based.",
};

const tools = [
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
    href: "/tools/image-converter",
    title: "Image Converter",
    description: "Convert between JPG, PNG, WebP",
    icon: ArrowRightLeft,
    color: "bg-purple-100 text-purple-600",
  },
  {
    href: "/tools/png-to-jpg",
    title: "PNG to JPG",
    description: "Convert PNG to JPG format",
    icon: FileImage,
    color: "bg-pink-100 text-pink-600",
  },
  {
    href: "/tools/compress-image",
    title: "Compress Image",
    description: "Reduce image file size",
    icon: Shrink,
    color: "bg-orange-100 text-orange-600",
  },
  {
    href: "/tools/resize-image",
    title: "Resize Image",
    description: "Change image dimensions",
    icon: FileStack,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default function ImageToolsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Image Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Free online image conversion tools. Convert, compress, and resize images instantly in your browser.
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
            href="/tools/pdf"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View PDF Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}