"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { Upload, Image, X, Download, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function JpgToWebp() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [convertedUrls, setConvertedUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError("");
    setConvertedUrls([]);
    const fileArray = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    setFiles(fileArray);
    const urls = fileArray.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);
  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: DragEvent) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => { setFiles([]); setPreviewUrls([]); setConvertedUrls([]); setError(""); };

  const convert = async () => {
    if (!files.length) return;
    setLoading(true);
    setError("");
    const results: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const dataUrl = await fileToDataUrl(files[i]);
        const converted = await convertToFormat(dataUrl);
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

  const convertToFormat = (dataUrl: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Could not get canvas context")); return; }
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/webp", 0.92));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = dataUrl;
    });
  };

  const downloadImage = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted-${index + 1}.webp`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl mb-4">
            <Image className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">JPG to WebP</h1>
          <p className="text-gray-600">Convert images to WebP format for better compression</p>
        </div>

        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => inputRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-8 mb-6 cursor-pointer transition-all ${isDragging ? "border-violet-500 bg-violet-50" : "border-gray-300 hover:border-violet-400"}`}>
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleChange} className="hidden" />
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium mb-1">Click to upload images</span>
            <span className="text-gray-400 text-sm">JPG, PNG, WebP supported</span>
          </div>
        </div>

        {files.length > 0 && !convertedUrls.length && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Selected Files ({files.length})</h3>
              <button onClick={clearAll} className="text-sm text-red-600 hover:text-red-700">Clear all</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg border border-gray-200" />
                  <button onClick={() => removeFile(index)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />{error}
          </div>
        )}

        {files.length > 0 && !convertedUrls.length && (
          <button onClick={convert} disabled={loading} className="w-full py-4 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Converting...</> : <><CheckCircle className="w-5 h-5" />Convert to WebP</>}
          </button>
        )}

        {convertedUrls.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{convertedUrls.length} converted</h3>
              <button onClick={() => convertedUrls.forEach((url, i) => downloadImage(url, i))} className="bg-violet-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-violet-600">
                <Download className="w-4 h-4" />Download All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {convertedUrls.map((url, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-3">
                  <img src={url} alt={`Converted ${index + 1}`} className="w-full rounded-lg" />
                  <button onClick={() => downloadImage(url, index)} className="mt-2 w-full py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200">
                    <Download className="w-4 h-4" />Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">All conversions happen in your browser. Your files never leave your device.</p>
      </div>
    </div>
  );
}