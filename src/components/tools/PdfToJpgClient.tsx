"use client";

import { useState, useEffect } from "react";

export default function PdfToJpgClient() {
  const [images, setImages] = useState<string[]>([]);
  const [pdfjsLib, setPdfjsLib] = useState<typeof import("pdfjs-dist") | null>(null);

  useEffect(() => {
    import("pdfjs-dist").then((lib) => {
      lib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs";
      setPdfjsLib(lib);
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pdfjsLib) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const pdf = await pdfjsLib.getDocument(
        new Uint8Array(reader.result as ArrayBuffer)
      ).promise;

      const imgs: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport, canvas }).promise;

        imgs.push(canvas.toDataURL("image/jpeg"));
      }

      setImages(imgs);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-serif mb-6">PDF to JPG</h1>

      <input type="file" onChange={handleUpload} disabled={!pdfjsLib} />

      <div className="mt-6 space-y-4">
        {images.map((img, i) => (
          <img key={i} src={img} className="w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
