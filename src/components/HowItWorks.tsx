import React from 'react';
import { UploadCloud, Cpu, Sparkles } from 'lucide-react';
import { Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface HowItWorksProps {
  currentLang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].howItWorks;

  const steps = [
    {
      icon: UploadCloud,
      num: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      icon: Cpu,
      num: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    },
    {
      icon: Sparkles,
      num: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#081410] border-t border-[#1B392F]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.sectionTitle}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="bg-[#12261F] border border-[#1B392F] hover:border-emerald-500/50 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute top-4 right-6 text-5xl font-black text-white/5 font-mono select-none">
                    {step.num}
                  </div>

                  <div>
                    <div className={`w-14 h-14 rounded-2xl border ${step.bg} flex items-center justify-center mb-6 shadow-inner`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#1B392F]/60 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span>STEP {step.num} COMPLETE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
