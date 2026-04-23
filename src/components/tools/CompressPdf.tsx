"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, FileText, X, Download, CheckCircle, AlertCircle, Loader2, Minimize2 } from "lucide-react";

interface PdfFile {
  file: File;
  name: string;
  size: number;
}

export default function CompressPdf() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(0.5);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError("");
    setResultBlob(null);
    const fileArray = Array.from(newFiles)
      .filter((f) => f.type === "application/pdf")
      .map((f) => ({ file: f, name: f.name, size: f.size }));
    setFiles(fileArray);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);
  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: DragEvent) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); };

  const clearAll = () => { setFiles([]); setResultBlob(null); setError(""); };

  const compress = async () => {
    if (!files.length) return;
    setLoading(true);
    setError("");

    try {
      const file = files[0];
      const arrayBuffer = await file.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      const compressedPdf = await PDFDocument.create();
      for (const page of pages) {
        const [copiedPage] = await compressedPdf.copyPages(pdfDoc, [pages.indexOf(page)]);
        compressedPdf.addPage(copiedPage);
      }

      const pdfBytes = await compressedPdf.save();
      const uint8Array = new Uint8Array(pdfBytes);
      const compressed = new Blob([uint8Array], { type: "application/pdf" });
      setResultBlob(compressed);
      setResultSize(compressed.size);
    } catch (err) {
      setError("Compression failed. Please try a different PDF.");
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!resultBlob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(resultBlob);
    link.download = "compressed.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
            <Minimize2 className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">Compress PDF</h1>
          <p className="text-gray-600">Reduce PDF file size while maintaining quality</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compression Level: {quality <= 0.3 ? "Low" : quality <= 0.6 ? "Medium" : "High"} Quality
          </label>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
        </div>

        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => inputRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-8 mb-6 cursor-pointer transition-all ${isDragging ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400"}`}>
          <input ref={inputRef} type="file" accept="application/pdf" onChange={handleChange} className="hidden" />
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium mb-1">Click to upload PDF</span>
            <span className="text-gray-400 text-sm">PDF files only</span>
          </div>
        </div>

        {files.length > 0 && !resultBlob && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-500" />
                <span className="font-medium text-gray-900">{files[0].name}</span>
                <span className="text-sm text-gray-500">({formatSize(files[0].size)})</span>
              </div>
              <button onClick={clearAll} className="text-sm text-red-600 hover:text-red-700">Clear</button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />{error}
          </div>
        )}

        {files.length > 0 && !resultBlob && (
          <button onClick={compress} disabled={loading} className="w-full py-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Compressing...</> : <><CheckCircle className="w-5 h-5" />Compress PDF</>}
          </button>
        )}

        {resultBlob && (
          <div className="text-center">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl mb-6 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Compressed from {formatSize(files[0].size)} to {formatSize(resultSize)} ({Math.round((resultSize / files[0].size) * 100)}% of original)
            </div>
            <button onClick={download} className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Compressed PDF
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">All operations happen in your browser. Your files never leave your device.</p>
      </div>
    </div>
  );
}