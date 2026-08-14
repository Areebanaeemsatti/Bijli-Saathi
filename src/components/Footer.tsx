import React from 'react';
import { Zap, Heart, ShieldAlert } from 'lucide-react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;

  return (
    <footer className="bg-[#081410] border-t border-[#1B392F] py-12 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1B392F]/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              ⚡
            </div>
            <div>
              <span className="text-base font-extrabold text-white font-mono">
                Bijli<span className="text-emerald-400">Saathi</span>
              </span>
              <p className="text-[11px] text-gray-400">
                Understand your bill. Control your electricity.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="bg-[#12261F] px-3 py-1 rounded-full border border-[#1B392F] text-emerald-400">
              React + TS + Vite
            </span>
            <span className="bg-[#12261F] px-3 py-1 rounded-full border border-[#1B392F] text-emerald-400">
              Tailwind CSS
            </span>
            <span className="bg-[#12261F] px-3 py-1 rounded-full border border-[#1B392F] text-emerald-400">
              Gemini Vision AI
            </span>
            <span className="bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/20">
              2-Hour Hackathon MVP
            </span>
          </div>
        </div>

        {/* Disclaimer Statement */}
        <div className="bg-[#12261F]/60 border border-[#1B392F] rounded-2xl p-5 text-gray-400 text-xs leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-gray-200 block mb-1">{t.disclaimerTitle}</strong>
            <p>{t.disclaimerText}</p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
          <p>© 2026 Bijli Saathi. Built for everyday electricity consumers in Pakistan.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> for Pakistan Energy Tech Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
};
