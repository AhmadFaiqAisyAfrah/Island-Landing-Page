import PdfToJpg from "@/components/tools/PdfToJpg";

export const metadata = {
  title: "PDF to JPG - Island Tools",
  description: "Extract images from PDF documents instantly. Free browser-based converter.",
};

export default function Page() {
  return <PdfToJpg />;
}