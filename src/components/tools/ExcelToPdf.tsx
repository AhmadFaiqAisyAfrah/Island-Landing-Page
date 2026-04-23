"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { Upload, FileSpreadsheet, X, Download, AlertCircle } from "lucide-react";

export default function ExcelToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError("");
    const fileArray = Array.from(newFiles).filter((f) => 
      f.name.endsWith(".xlsx") || f.name.endsWith(".xls")
    );
    if (fileArray.length) setFile(fileArray[0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);
  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: DragEvent) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); };

  const clearAll = () => { setFile(null); setError(""); };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
            <FileSpreadsheet className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">Excel to PDF</h1>
          <p className="text-gray-600">Convert Excel spreadsheets to PDF</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Note</p>
              <p>Browser-based Excel to PDF conversion has limited support. For best results, please use our online converter.</p>
            </div>
          </div>
        </div>

        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => inputRef.current?.click()}
          className={`bg-white rounded-2xl border-2 border-dashed p-8 mb-6 cursor-pointer transition-all ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"}`}>
          <input ref={inputRef} type="file" accept=".xlsx,.xls" onChange={handleChange} className="hidden" />
          <div className="flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium mb-1">Click to upload Excel file</span>
            <span className="text-gray-400 text-sm">XLS or XLSX files</span>
          </div>
        </div>

        {file && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-900">{file.name}</span>
              </div>
              <button onClick={clearAll} className="text-sm text-red-600 hover:text-red-700">Clear</button>
            </div>
          </div>
        )}

        <a href="https://convertio.co/xls-pdf/" target="_blank" rel="noopener noreferrer"
          className="w-full py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Convert using Online Converter
        </a>

        <p className="text-center text-sm text-gray-500 mt-8">This tool opens an external converter. Your files are processed securely.</p>
      </div>
    </div>
  );
}