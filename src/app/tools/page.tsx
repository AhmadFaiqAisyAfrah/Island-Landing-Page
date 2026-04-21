import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Tools - Island",
  description: "Free online tools for education and productivity. Convert images, boost your learning, and more.",
};

const tools = [
  {
    title: "JPG to PDF",
    description: "Convert JPG images to PDF documents instantly. Free browser-based converter.",
    href: "/tools/jpg-to-pdf",
    icon: "📄",
  },
  {
    title: "PDF to JPG",
    description: "Extract images from PDF files. Fast and secure conversion.",
    href: "/tools/pdf-to-jpg",
    icon: "🖼️",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-serif text-gray-900 mb-4">Free Online Tools</h1>
        <p className="text-lg text-gray-600 mb-12">
          Useful tools to help you work smarter and faster.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block p-6 border border-gray-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h2>
              <p className="text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
