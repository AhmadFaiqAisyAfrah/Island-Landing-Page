import dynamic from "next/dynamic";

export const metadata = {
  title: "JPG to PDF - Island Tools",
  description: "Convert JPG images to PDF documents instantly. Free browser-based converter.",
};

const JpgToPdf = dynamic(
  () => import("@/components/tools/JpgToPdf"),
  { ssr: false }
);

export default function Page() {
  return <JpgToPdf />;
}