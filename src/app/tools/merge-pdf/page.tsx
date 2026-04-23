import PdfMerge from "@/components/tools/PdfMerge";

export const metadata = {
  title: "Merge PDF - Island Tools",
  description: "Combine multiple PDF files into one document. Free browser-based merger. Fast, secure, and 100% private.",
};

export default function Page() {
  return <PdfMerge />;
}