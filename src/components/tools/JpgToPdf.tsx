"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Upload, FileText, X, Download } from "lucide-react";

export default function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const convertToPdf = async () => {
    if (!files.length) return;

    setLoading(true);
    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const imgData = await toBase64(files[i]);

      const img = new Image();
      img.src = imgData;

      await new Promise((resolve) => {
        img.onload = () => {
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          
          const imgWidth = img.width;
          const imgHeight = img.height;
          
          const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
          const width = imgWidth * ratio;
          const height = imgHeight * ratio;
          
          const x = (pageWidth - width) / 2;
          const y = (pageHeight - height) / 2;

          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", x, y, width, height);
          resolve(true);
        };
      });
    }

    pdf.save("island-converted.pdf");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">JPG to PDF</h1>
          <p className="text-gray-600">Convert your images to PDF documents instantly</p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8 mb-6">
          <label className="flex flex-col items-center cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mb-3" />
              <span className="text-gray-600 font-medium mb-1">Click to upload images</span>
              <span className="text-gray-400 text-sm">Supports multiple JPG files</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
        </div>

        {previewUrls.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                Selected Files ({files.length})
              </h3>
              <button
                onClick={() => {
                  setFiles([]);
                  setPreviewUrls([]);
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1 rounded">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={convertToPdf}
          disabled={!files.length || loading}
          className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Converting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Convert to PDF
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          All conversions happen in your browser. Your files never leave your device.
        </p>
      </div>
    </div>
  );
}
