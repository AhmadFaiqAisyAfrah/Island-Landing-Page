"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { Upload, FileText, X, Download, Image, File, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export interface ToolLayoutProps {
  title: string;
  description: string;
  accept: string;
  multiple?: boolean;
  children?: React.ReactNode;
  onConvert?: (files: File[]) => Promise<void>;
  onDownload?: () => void;
  outputLabel?: string;
  inputLabel?: string;
  convertButtonText?: string;
}

export default function ToolLayout({
  title,
  description,
  accept,
  multiple = false,
  children,
  onConvert,
  onDownload,
  outputLabel = "Download",
  inputLabel = "Click or drag files here",
  convertButtonText = "Convert Now",
}: ToolLayoutProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
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
    setResult(null);
    
    const fileArray = multiple ? Array.from(newFiles) : [newFiles[0]];
    setFiles(fileArray);
    setOriginalSize(fileArray.reduce((acc, f) => acc + f.size, 0));

    const urls = fileArray.map((f) => URL.createObjectURL(f));
    setPreviewUrls(multiple ? urls : urls.slice(0, 1));
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
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setPreviewUrls([]);
    setResult(null);
    setError("");
  };

  const handleConvert = async () => {
    if (!files.length || !onConvert) return;

    setLoading(true);
    setError("");

    try {
      await onConvert(files);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = (resultUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = resultUrl;
    const ext = multiple ? `file-${index + 1}` : "converted";
    link.download = `${ext}.${accept.split("/")[1].split(",")[0].trim()}`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
            <Image className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        {!files.length ? (
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
              accept={accept}
              multiple={multiple}
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 text-gray-400 mb-3" />
              <span className="text-gray-600 font-medium mb-1">{inputLabel}</span>
              <span className="text-gray-400 text-sm">
                {accept.split(",").map((t) => t.trim()).join(", ").toUpperCase()}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={files[index]?.name || `Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1 rounded">
                      {files[index]?.name?.slice(0, 12)}...
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                Total size: {formatFileSize(originalSize)}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {onConvert && (
              <button
                onClick={handleConvert}
                disabled={loading || !files.length}
                className="w-full py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {convertButtonText}
                  </>
                )}
              </button>
            )}

            {children}
          </>
        )}

        <p className="text-center text-sm text-gray-500">
          All conversions happen in your browser. Your files never leave your device.
        </p>
      </div>
    </div>
  );
}