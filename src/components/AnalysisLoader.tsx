import React from 'react';
import { CheckCircle2, Loader2, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface AnalysisLoaderProps {
  currentLang: Language;
  currentStep: number;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({
  currentLang,
  currentStep
}) => {
  const t = TRANSLATIONS[currentLang].loader;

  const steps = [
    { num: 1, text: t.step1 },
    { num: 2, text: t.step2 },
    { num: 3, text: t.step3 },
    { num: 4, text: t.step4 },
    { num: 5, text: t.step5 }
  ];

  const progressPercentage = Math.min(100, (currentStep / 5) * 100);

  return (
    <div className="py-16 md:py-24 max-w-2xl mx-auto px-4 sm:px-6">
      <div className="bg-[#12261F] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden text-center">
        {/* Animated Glow Halo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        {/* Top Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-2xl shadow-emerald-500/30 mb-6 flex items-center justify-center">
          <div className="w-full h-full bg-[#0B1914] rounded-[22px] flex items-center justify-center relative overflow-hidden">
            <Cpu className="w-10 h-10 text-emerald-400 animate-pulse" />
            <Zap className="w-4 h-4 text-amber-400 absolute top-2 right-2 fill-amber-400" />
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          {t.title}
        </h3>
        <p className="text-xs text-gray-400 mb-8 font-mono">
          Pakistani Bill OCR • Gemini Intelligence • Tariffs & FPA Analyzer
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-[#0B1914] h-3 rounded-full overflow-hidden mb-8 border border-[#1B392F] p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full transition-all duration-500 shadow-md shadow-emerald-500/50"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step-by-Step Sequence */}
        <div className="space-y-3 text-left max-w-md mx-auto bg-[#0B1914]/80 p-5 rounded-2xl border border-[#1B392F]">
          {steps.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <div
                key={step.num}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-semibold'
                    : isCompleted
                    ? 'text-gray-300 opacity-80'
                    : 'text-gray-600 opacity-40'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-emerald-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center text-[10px] font-mono text-gray-500 shrink-0">
                    {step.num}
                  </div>
                )}
                <span className="text-sm">{step.text}</span>
              </div>
            );
          })}
        </div>

        {currentStep >= 5 && (
          <div className="mt-6 text-emerald-400 font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
            <ShieldCheck className="w-5 h-5" />
            <span>{t.completed}</span>
          </div>
        )}
      </div>
    </div>
  );
};
