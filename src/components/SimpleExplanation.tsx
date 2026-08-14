import React from 'react';
import { MessageSquareQuote, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface SimpleExplanationProps {
  bill: BillData;
  currentLang: Language;
}

export const SimpleExplanation: React.FC<SimpleExplanationProps> = ({ bill, currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;
  const summaryText = bill.summary[currentLang] || bill.summary.en;

  return (
    <div className="bg-[#12261F] border border-[#1B392F] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1B392F]">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-extrabold text-white">
            {t.simpleWordsTitle}
          </h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
          Household Friendly
        </span>
      </div>

      <div className="bg-[#0B1914] border border-[#1B392F] rounded-2xl p-6 relative">
        <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium">
          "{summaryText}"
        </p>

        <div className="mt-6 pt-4 border-t border-[#1B392F]/60 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>Designed for everyday Pakistani families</span>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <span>Provider: <strong className="text-white">{bill.provider}</strong></span>
            <span>Ref #: <strong className="text-white">{bill.consumerNumber}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
