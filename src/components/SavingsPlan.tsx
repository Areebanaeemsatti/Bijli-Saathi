import React from 'react';
import { Lightbulb, CheckCircle2, Sparkles, Flame, Shield, ArrowRight } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface SavingsPlanProps {
  bill: BillData;
  currentLang: Language;
}

export const SavingsPlan: React.FC<SavingsPlanProps> = ({ bill, currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;
  const suggestions = bill.savingsSuggestions || [];

  const difficultyColors = {
    easy: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    moderate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    advanced: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  };

  return (
    <section className="bg-[#12261F] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1B392F]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#0B1914] rounded-[14px] flex items-center justify-center text-emerald-400">
              <Lightbulb className="w-7 h-7" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                ACTION PLAN
              </span>
              <span className="text-xs text-gray-400">Personalized AI Suggestions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.lowerBillTitle}
            </h2>
          </div>
        </div>

        <div className="bg-[#0B1914] px-4 py-2 rounded-2xl border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Potential: ~{suggestions.reduce((acc, s) => acc + s.potentialUnitSavings, 0)} Units Reduction</span>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((item, idx) => {
          const titleText = item.title[currentLang] || item.title.en;
          const applianceText = item.applianceOrHabit[currentLang] || item.applianceOrHabit.en;
          const stepText = item.actionableStep[currentLang] || item.actionableStep.en;
          const badgeClass = difficultyColors[item.difficulty] || difficultyColors.easy;

          return (
            <div
              key={idx}
              className="bg-[#0B1914] border border-[#1B392F] hover:border-emerald-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    #{idx + 1} {applianceText}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${badgeClass}`}>
                    {item.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {titleText}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {stepText}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1B392F]/60 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">Target Savings</span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ~{item.potentialUnitSavings} units/mo
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
