import React from 'react';
import { FileText, Cpu, CheckCircle2, Lightbulb, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface HeroVisualProps {
  currentLang: Language;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].hero;

  const steps = [
    {
      num: '01',
      title: t.flowStep1,
      sub: 'IESCO / K-Electric / LESCO',
      icon: FileText,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
      badge: 'Rs. 25,430',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30'
    },
    {
      num: '02',
      title: t.flowStep2,
      sub: 'Gemini Multimodal OCR',
      icon: Cpu,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      badge: 'Parsing 385 units',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      num: '03',
      title: t.flowStep3,
      sub: 'Root Cause Identified',
      icon: CheckCircle2,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
      badge: '+20.3% AC Load',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      num: '04',
      title: t.flowStep4,
      sub: 'Actionable Advice',
      icon: Lightbulb,
      color: 'border-teal-500/40 bg-teal-500/10 text-teal-300',
      badge: 'Save Rs. 4,500+',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
    }
  ];

  return (
    <div className="w-full relative mt-8">
      {/* Background glow behind flow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/20 to-teal-500/10 blur-3xl rounded-3xl -z-10 pointer-events-none" />

      <div className="bg-[#12261F]/90 border border-[#1B392F] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B392F]">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-emerald-400 tracking-wide font-mono uppercase">
              {t.flowTitle}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#0B1914] px-3 py-1 rounded-full border border-[#1B392F]">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Energy Flow Engine</span>
          </div>
        </div>

        {/* 4 Steps Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="h-full bg-[#0B1914] border border-[#1B392F] hover:border-emerald-500/50 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl border ${step.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 font-bold">
                        STEP {step.num}
                      </span>
                    </div>

                    <h4 className="text-white font-bold text-base mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">
                      {step.sub}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1B392F]/60 flex items-center justify-between">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                    <Zap className="w-3.5 h-3.5 text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Arrow connector between steps for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#12261F] border border-[#1B392F] items-center justify-center text-emerald-400 shadow-md">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Sample Metric Snippet */}
        <div className="mt-6 pt-4 border-t border-[#1B392F]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-300 gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded font-mono font-bold">
              SAMPLE MATCH
            </span>
            <span className="text-gray-300">
              "Your bill increased mainly because consumption jumped from 320 to 385 units (+20.3%)."
            </span>
          </div>
          <span className="text-emerald-400 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
            Live Hackathon Demo Mode Ready ✓
          </span>
        </div>
      </div>
    </div>
  );
};
