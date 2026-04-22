"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function JpgToPdfClient() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const convert = async () => {
    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      const data = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const img = new Image();
      img.src = data;

      await new Promise((resolve) => {
        img.onload = () => {
          const width = pdf.internal.pageSize.getWidth();
          const height = (img.height * width) / img.width;

          if (i > 0) pdf.addPage();
          pdf.addImage(img, "JPEG", 0, 0, width, height);
          resolve(true);
        };
      });
    }

    pdf.save("converted.pdf");
  };

  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-serif mb-6">JPG to PDF</h1>

      <input type="file" multiple onChange={handleUpload} />

      <button
        onClick={convert}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl"
      >
        Convert
      </button>
    </div>
  );
}
