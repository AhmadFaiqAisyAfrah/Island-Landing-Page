"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { jsPDF } from "jspdf";
import { Upload, FileText, X, Download, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, FileImage } from "lucide-react";

interface ImageFile {
  file: File;
  preview: string;
}

export default function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [convertedPdf, setConvertedPdf] = useState<string | null>(null);
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
    setConvertedPdf(null);
    
    const fileArray = Array.from(newFiles).filter((f) => 
      f.type.startsWith("image/")
    );
    setFiles(fileArray);

    const urls = fileArray.map((f) => URL.createObjectURL(f));
    setImageUrls(urls);
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
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setImageUrls([]);
    setConvertedPdf(null);
    setError("");
  };

  const convertToPdf = async () => {
    if (!files.length) return;

    setLoading(true);
    setError("");

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < files.length; i++) {
        const imgData = await fileToDataUrl(files[i]);
        const img = new Image();
        img.src = imgData;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            const ratio = Math.min(
              (pageWidth - 20) / imgWidth,
              (pageHeight - 20) / imgHeight
            );
            const width = imgWidth * ratio;
            const height = imgHeight * ratio;
            const x = (pageWidth - width) / 2;
            const y = (pageHeight - height) / 2;

            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, "JPEG", x, y, width, height);
            resolve();
          };
          img.onerror = () => {
            setError(`Failed to load image: ${files[i].name}`);
            resolve();
          };
        });
      }

      pdf.save("island-converted.pdf");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">JPG to PDF</h1>
          <p className="text-gray-600">Convert your images to PDF documents instantly</p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-8 mb-6 cursor-pointer transition-all ${
            isDragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium mb-1">Click to upload images</span>
            <span className="text-gray-400 text-sm">Supports multiple JPG, PNG, WebP files</span>
          </div>
        </div>

        {files.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                Selected Files ({files.length})
              </h3>
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {imageUrls.map((url, index) => (
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

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <button
          onClick={convertToPdf}
          disabled={!files.length || loading}
          className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
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