import PdfToExcel from "@/components/tools/PdfToExcel";

export const metadata = {
  title: "PDF to Excel - Island Tools",
  description: "Extract tables from PDF to Excel format online. Free browser-based converter.",
};

export default function Page() {
  return <PdfToExcel />;
}