import React, { useState, useEffect } from 'react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Zap, PlayCircle, BarChart3, HelpCircle, Key, Check, X, Cpu } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, getGeminiModel, setGeminiModel } from '../services/aiService';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: () => void;
  onTryDemoClick: () => void;
  onAnalyzeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onTryDemoClick,
  onAnalyzeClick
}) => {
  const t = TRANSLATIONS[currentLang].nav;
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [modelInput, setModelInput] = useState('gemini-2.0-flash');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const existingKey = getStoredApiKey();
    const existingModel = getGeminiModel();
    setHasKey(!!existingKey);
    setApiKeyInput(existingKey);
    setModelInput(existingModel);
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(apiKeyInput);
    setGeminiModel(modelInput);
    setHasKey(!!apiKeyInput.trim());
    setShowKeyModal(false);
  };

  const scrollToSection = (id: string) => {
    onNavigateHome();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass-panel border-b border-[#1B392F]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0B1914] rounded-[10px] flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                  Bijli<span className="text-emerald-400">Saathi</span>
                </span>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-medium px-2 py-0.5 rounded-full border border-amber-500/30">
                  ⚡ MVP
                </span>
              </div>
              <p className="text-[10px] text-emerald-400/80 tracking-wider uppercase font-semibold hidden sm:block">
                AI Energy Companion
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className="text-sm text-gray-300 hover:text-emerald-400 transition-colors font-medium"
            >
              {t.home}
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm text-gray-300 hover:text-emerald-400 transition-colors font-medium flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              {t.howItWorks}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm text-gray-300 hover:text-emerald-400 transition-colors font-medium flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              {t.features}
            </button>
            <button
              onClick={onTryDemoClick}
              className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-semibold flex items-center gap-1.5"
            >
              <PlayCircle className="w-4 h-4" />
              {t.tryDemo}
            </button>
          </nav>

          {/* Action Controls, Key Button & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowKeyModal(true)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                hasKey
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
              }`}
              title="Configure Gemini API Key and Model"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{hasKey ? 'Gemini Active ✓' : 'Add API Key'}</span>
            </button>

            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />

            <button
              onClick={onAnalyzeClick}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm hover:from-emerald-400 hover:to-emerald-500 transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              {t.analyzeBill}
            </button>
          </div>
        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#12261F] border-2 border-emerald-500/50 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B392F] mb-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Gemini API Key & Model Config
                </h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Configure your Google Gemini API Key and Model below or in <code className="bg-[#0B1914] px-1.5 py-0.5 rounded text-emerald-400">.env</code> (<code className="bg-[#0B1914] px-1.5 py-0.5 rounded text-emerald-400">VITE_GEMINI_API_KEY</code> & <code className="bg-[#0B1914] px-1.5 py-0.5 rounded text-emerald-400">VITE_GEMINI_MODEL</code>).
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-[#0B1914] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-mono"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Get a free key at <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">aistudio.google.com</a>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Multimodal Gemini Model</span>
                </label>
                <select
                  value={modelInput}
                  onChange={e => setModelInput(e.target.value)}
                  className="w-full bg-[#0B1914] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-mono"
                >
                  <option value="gemini-2.0-flash">gemini-2.0-flash (Recommended)</option>
                  <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                  <option value="gemini-1.5-flash-latest">gemini-1.5-flash-latest</option>
                  <option value="gemini-2.0-flash-lite">gemini-2.0-flash-lite</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1B392F]">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
