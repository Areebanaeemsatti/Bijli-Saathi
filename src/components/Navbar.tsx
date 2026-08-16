import React from 'react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Zap,
  PlayCircle,
  BarChart3,
  HelpCircle
} from 'lucide-react';

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

  const scrollToSection = (id: string) => {
    onNavigateHome();

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
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

              <span className="text-xs bg-amber-500/20 text-amber-300 font-medium px-2 py-0.5 rounded-full">
                AI
              </span>
            </div>

            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
              Electricity Bill Assistant
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">

          <button
            onClick={onNavigateHome}
            className="text-sm text-gray-300 hover:text-emerald-400 transition-colors font-medium flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-emerald-500" />
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

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Language Switcher */}
          <LanguageSwitcher
            currentLang={currentLang}
            onLanguageChange={onLanguageChange}
          />

          {/* Analyze Bill */}
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
  );
};