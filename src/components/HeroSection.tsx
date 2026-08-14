import React from 'react';
import { Zap, Play, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  currentLang: Language;
  onAnalyzeClick: () => void;
  onTryDemoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onAnalyzeClick,
  onTryDemoClick
}) => {
  const t = TRANSLATIONS[currentLang].hero;

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle Background Radial Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Pakistan Energy AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12261F] border border-[#1B392F] shadow-inner text-xs font-semibold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.badge}</span>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold font-mono">
              v1.0 Hackathon MVP
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
            {t.subheadline}
            <span className="block mt-2 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
              {t.headline}
            </span>
          </h1>

          {/* Supporting Pitch Text */}
          <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.pitch}
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onAnalyzeClick}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-base hover:from-emerald-400 hover:to-teal-500 transition-all duration-200 shadow-xl shadow-emerald-500/25 active:scale-95 group"
            >
              <Zap className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
              <span>{t.primaryCta}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onTryDemoClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#12261F] text-emerald-300 font-bold px-7 py-4 rounded-2xl text-base border border-[#1B392F] hover:bg-emerald-950/40 hover:border-emerald-500/50 hover:text-white transition-all duration-200 active:scale-95"
            >
              <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>{t.secondaryCta}</span>
            </button>
          </div>

          {/* Small Supporting Text */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t.supportingText}</span>
          </div>
        </div>

        {/* Hero Visual Flow */}
        <HeroVisual currentLang={currentLang} />
      </div>
    </section>
  );
};
