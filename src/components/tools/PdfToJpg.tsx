"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Upload, Image, Download, X, FileText } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs";

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setImages([]);
      setError("");
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileName("");
    setImages([]);
    setError("");
  };

  const convert = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const imgs: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
          canvas,
        }).promise;

        imgs.push(canvas.toDataURL("image/jpeg", 0.9));
      }

      setImages(imgs);
    } catch (err) {
      console.error("PDF conversion error:", err);
      setError("Failed to convert PDF. Please try a different file.");
    } finally {
      setLoading(false);
    }
  };

  const downloadAll = () => {
    images.forEach((img, index) => {
      const link = document.createElement("a");
      link.href = img;
      link.download = `${fileName.replace(".pdf", "")}-page-${index + 1}.jpg`;
      link.click();
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <Image className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">PDF to JPG</h1>
        <p className="text-gray-600">Extract images from PDF documents instantly</p>
      </div>

      {!file ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8">
          <label className="flex flex-col items-center cursor-pointer">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium mb-1">Click to upload PDF</span>
            <span className="text-gray-400 text-sm">Supports PDF files</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{fileName}</p>
                <p className="text-sm text-gray-500">
                  {loading ? "Converting..." : "Ready to convert"}
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      {file && !images.length && (
        <button
          onClick={convert}
          disabled={loading}
          className="w-full py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Converting...
            </>
          ) : (
            <>
              <Image className="w-5 h-5" />
              Convert to JPG
            </>
          )}
        </button>
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              {images.length} page{images.length > 1 ? "s" : ""} extracted
            </h3>
            <button
              onClick={downloadAll}
              className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>

          <div className="space-y-4">
            {images.map((img, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <img
                  src={img}
                  alt={`Page ${index + 1}`}
                  className="w-full"
                />
                <div className="p-3 flex items-center justify-between border-t border-gray-100">
                  <span className="text-sm text-gray-500">Page {index + 1}</span>
                  <a
                    href={img}
                    download={`page-${index + 1}.jpg`}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={removeFile}
            className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Convert another file
          </button>
        </div>
      )}

      <p className="text-center text-sm text-gray-500 mt-6">
        All conversions happen in your browser. Your files never leave your device.
      </p>
    </div>
  );
}
