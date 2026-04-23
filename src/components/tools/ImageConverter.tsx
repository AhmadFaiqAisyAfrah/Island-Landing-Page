"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { Upload, Image, X, Download, CheckCircle, AlertCircle, Loader2, ArrowRightLeft } from "lucide-react";

interface FormatOption {
  value: string;
  label: string;
  mime: string;
}

const formats: FormatOption[] = [
  { value: "png", label: "PNG", mime: "image/png" },
  { value: "jpeg", label: "JPG", mime: "image/jpeg" },
  { value: "webp", label: "WebP", mime: "image/webp" },
];

export default function ImageConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [targetFormat, setTargetFormat] = useState("png");
  const [convertedUrls, setConvertedUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError("");
    setConvertedUrls([]);
    
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
    setConvertedUrls([]);
    setError("");
  };

  const convertImage = async () => {
    if (!files.length) return;

    setLoading(true);
    setError("");
    const results: string[] = [];

    const format = formats.find((f) => f.value === targetFormat);
    if (!format) {
      setError("Invalid format selected");
      setLoading(false);
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUrl = await fileToDataUrl(file);
        const converted = await convertToFormat(dataUrl, format.mime);
        results.push(converted);
      }
      setConvertedUrls(results);
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

  const convertToFormat = (dataUrl: string, mimeType: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const result = canvas.toDataURL(mimeType, 0.92);
        resolve(result);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = dataUrl;
    });
  };

  const downloadImage = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    const ext = targetFormat === "jpeg" ? "jpg" : targetFormat;
    link.download = `converted-${index + 1}.${ext}`;
    link.click();
  };

  const downloadAll = () => {
    convertedUrls.forEach((url, index) => downloadImage(url, index));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
            <ArrowRightLeft className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">Image Converter</h1>
          <p className="text-gray-600">Convert images between formats instantly</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Convert to:
          </label>
          <div className="flex gap-2">
            {formats.map((format) => (
              <button
                key={format.value}
                onClick={() => setTargetFormat(format.value)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  targetFormat === format.value
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-8 mb-6 cursor-pointer transition-all ${
            isDragging
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 hover:border-purple-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium mb-1">Click to upload images</span>
            <span className="text-gray-400 text-sm">JPG, PNG, WebP supported</span>
          </div>
        </div>

        {files.length > 0 && !convertedUrls.length && (
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

        {files.length > 0 && !convertedUrls.length && (
          <button
            onClick={convertImage}
            disabled={loading}
            className="w-full py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Convert to {formats.find((f) => f.value === targetFormat)?.label}
              </>
            )}
          </button>
        )}

        {convertedUrls.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {convertedUrls.length} converted
              </h3>
              <button
                onClick={downloadAll}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600"
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {convertedUrls.map((url, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-3">
                  <img
                    src={url}
                    alt={`Converted ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={() => downloadImage(url, index)}
                    className="mt-2 w-full py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          All conversions happen in your browser. Your files never leave your device.
        </p>
      </div>
    </div>
  );
}