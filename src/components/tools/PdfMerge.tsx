"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, FileText, X, Download, CheckCircle, AlertCircle, Loader2, FileStack } from "lucide-react";

interface PdfFile {
  file: File;
  name: string;
}

export default function PdfMerge() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [mergedPdf, setMergedPdf] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError("");
    setMergedPdf(null);
    
    const fileArray = Array.from(newFiles)
      .filter((f) => f.type === "application/pdf")
      .map((f) => ({ file: f, name: f.name }));
    
    setFiles(fileArray);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setMergedPdf(null);
    setError("");
  };

  const mergePdfs = async () => {
    if (!files.length) return;

    setLoading(true);
    setError("");

    try {
      const mergedPdfDoc = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdfDoc.addPage(page));
      }

      const pdfBytes = await mergedPdfDoc.save();
      const uint8Array = new Uint8Array(pdfBytes);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdf(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to merge PDFs");
    } finally {
      setLoading(false);
    }
  };

  const downloadMerged = () => {
    if (!mergedPdf) return;
    const link = document.createElement("a");
    link.href = mergedPdf;
    link.download = "merged.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <FileStack className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">Merge PDF</h1>
          <p className="text-gray-600">Combine multiple PDFs into one document</p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-8 mb-6 cursor-pointer transition-all ${
            isDragging
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300 hover:border-orange-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium mb-1">Click to upload PDFs</span>
            <span className="text-gray-400 text-sm">Select multiple PDF files</span>
          </div>
        </div>

        {files.length > 0 && !mergedPdf && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                Selected PDFs ({files.length})
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-2">
              {files.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-700">{pdf.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {files.length > 1 && !mergedPdf && (
          <button
            onClick={mergePdfs}
            disabled={loading}
            className="w-full py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Merging...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Merge PDFs
              </>
            )}
          </button>
        )}

        {mergedPdf && (
          <div className="text-center">
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl mb-6 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              PDFs merged successfully!
            </div>
            <button
              onClick={downloadMerged}
              className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Merged PDF
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          All operations happen in your browser. Your files never leave your device.
        </p>
      </div>
    </div>
  );
}