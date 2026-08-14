import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, X, Zap, PlayCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language, DemoPreset } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';
import { DEMO_PRESETS } from '../data/demoBills';

interface BillUploaderProps {
  currentLang: Language;
  onAnalyzeFile: (file: File | null, presetId?: string) => void;
  externalError?: string | null;
}

export const BillUploader: React.FC<BillUploaderProps> = ({
  currentLang,
  onAnalyzeFile,
  externalError
}) => {
  const t = TRANSLATIONS[currentLang].uploader;
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (externalError) {
      setErrorMsg(externalError);
    }
  }, [externalError]);

  const handleFileSelect = (selectedFile: File) => {
    setErrorMsg(null);
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMsg("We couldn't read this file format. Please upload a clear JPG, PNG, or PDF bill.");
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setErrorMsg('File size exceeds 15MB limit. Please upload a smaller image or PDF.');
      return;
    }

    setFile(selectedFile);
    setSelectedPresetId(null);

    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handlePresetSelect = (preset: DemoPreset) => {
    setSelectedPresetId(preset.id);
    setFile(null);
    setFilePreviewUrl(null);
    setErrorMsg(null);
  };

  const handleRemove = () => {
    setFile(null);
    setFilePreviewUrl(null);
    setSelectedPresetId(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartAnalysis = () => {
    if (selectedPresetId) {
      onAnalyzeFile(null, selectedPresetId);
    } else if (file) {
      onAnalyzeFile(file);
    } else {
      setErrorMsg('Please upload a bill or choose a demo preset to proceed.');
    }
  };

  return (
    <section id="upload-section" className="py-16 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#12261F] border border-[#1B392F] rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>AI Multimodal Scanner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border-2 border-red-500/40 text-red-200 text-sm flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
              <span className="font-semibold leading-relaxed">{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Drag & Drop Upload Dropzone */}
        {!file && !selectedPresetId && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
              isDragOver
                ? 'border-emerald-400 bg-emerald-950/40 electric-glow scale-[1.01]'
                : 'border-[#1B392F] hover:border-emerald-500/50 bg-[#0B1914]/60 hover:bg-[#0B1914]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600/30 to-emerald-400/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <p className="text-lg font-bold text-white mb-1">
                {t.dragDropText}
              </p>
              <p className="text-xs text-gray-400">
                {t.supportedFormats}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-500 hover:text-slate-950 transition-all duration-200"
              >
                {t.browseButton}
              </button>
            </div>
          </div>
        )}

        {/* File Preview Card */}
        {file && (
          <div className="bg-[#0B1914] border border-emerald-500/40 rounded-2xl p-6 relative flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-16 h-16 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 overflow-hidden">
                {filePreviewUrl ? (
                  <img src={filePreviewUrl} alt="Bill preview" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <FileText className="w-8 h-8" />
                )}
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white truncate max-w-xs sm:max-w-sm">
                    {file.name}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {(file.size / 1024).toFixed(1)} KB • {file.type || 'Electricity Bill PDF'}
                </p>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  ✓ Selected File Ready for AI Multimodal Analysis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleRemove}
                className="p-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>{t.removeFile}</span>
              </button>

              <button
                onClick={handleStartAnalysis}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>{t.analyzeCta}</span>
              </button>
            </div>
          </div>
        )}

        {/* Selected Preset Card */}
        {selectedPresetId && !file && (
          <div className="bg-[#0B1914] border border-amber-500/40 rounded-2xl p-6 relative flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-mono font-bold text-xl">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">
                    {DEMO_PRESETS.find(p => p.id === selectedPresetId)?.name}
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    PRESET DEMO
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  {DEMO_PRESETS.find(p => p.id === selectedPresetId)?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleRemove}
                className="p-2.5 rounded-xl border border-gray-700 bg-gray-800 text-gray-300 hover:text-white transition-all text-xs font-semibold"
              >
                Change
              </button>
              <button
                onClick={handleStartAnalysis}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>{t.analyzeCta}</span>
              </button>
            </div>
          </div>
        )}

        {/* Demo Presets Section */}
        <div className="mt-8 pt-6 border-t border-[#1B392F]/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
            <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-amber-400" />
              <span>{t.selectPresetTitle}</span>
            </h4>
            <span className="text-xs text-emerald-400 font-mono">
              Hackathon Quick Test Mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DEMO_PRESETS.map(preset => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-[#0B1914]/60 border-[#1B392F] hover:border-emerald-500/40 text-gray-300 hover:bg-[#0B1914]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">
                        {preset.name}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-semibold">
                        {preset.provider.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      {preset.badge}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#1B392F]/40 text-[10px] text-amber-400 font-mono font-bold flex items-center justify-between">
                    <span>Rs. {preset.data.currentBill.toLocaleString()}</span>
                    <span>{preset.data.currentUnits} units →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
