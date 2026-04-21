import dynamic from "next/dynamic";

export const metadata = {
  title: "PDF to JPG - Island Tools",
  description: "Extract images from PDF documents instantly. Free browser-based converter.",
};

const PdfToJpg = dynamic(
  () => import("@/components/tools/PdfToJpg"),
  { ssr: false }
);

export default function Page() {
  return <PdfToJpg />;
}