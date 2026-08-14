import React from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Zap, Receipt, ShieldAlert } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface IncreaseReasonProps {
  bill: BillData;
  currentLang: Language;
}

export const IncreaseReason: React.FC<IncreaseReasonProps> = ({ bill, currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;
  const summaryText = bill.summary[currentLang] || bill.summary.en;

  const categoryIcons = {
    consumption: TrendingUp,
    fpa: Zap,
    tariff: AlertTriangle,
    taxes: Receipt,
    arrears: DollarSign
  };

  const categoryBadgeColors = {
    high: 'bg-red-500/20 text-red-300 border-red-500/30',
    medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  };

  return (
    <section className="bg-[#12261F] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient background glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1B392F]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                KILLER FEATURE #1
              </span>
              <span className="text-xs text-gray-400">AI Root Cause Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.whyIncreasedTitle}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 font-mono">Bill Surge</span>
          <div className="text-lg font-black text-amber-400 font-mono">
            +{Math.round(((bill.currentBill - bill.previousBill) / Math.max(1, bill.previousBill)) * 100)}% PKR
          </div>
        </div>
      </div>

      {/* Plain Language Summary Callout */}
      <div className="bg-[#0B1914] border border-amber-500/30 rounded-2xl p-5 mb-8 shadow-inner">
        <p className="text-base text-gray-200 leading-relaxed font-medium">
          💡 "{summaryText}"
        </p>
      </div>

      {/* Contributing Factors Breakdown */}
      {bill.increaseReasons && bill.increaseReasons.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
            Primary Contributing Factors Detected:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bill.increaseReasons.map((reason, idx) => {
              const Icon = categoryIcons[reason.category] || AlertTriangle;
              const titleText = reason.title[currentLang] || reason.title.en;
              const descText = reason.description[currentLang] || reason.description.en;
              const badgeClass = categoryBadgeColors[reason.severity] || categoryBadgeColors.medium;

              return (
                <div
                  key={idx}
                  className="bg-[#0B1914] border border-[#1B392F] hover:border-amber-500/40 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-white">
                          {titleText}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${badgeClass}`}>
                        {reason.severity}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {descText}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1B392F]/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Cost Impact</span>
                    <span className="text-amber-400 font-bold">
                      {reason.amountImpact ? `+Rs. ${reason.amountImpact.toLocaleString()}` : reason.percentageImpact ? `+${reason.percentageImpact}%` : 'Detected'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-[#0B1914] border border-gray-700 rounded-2xl p-6 text-center text-gray-400 text-sm flex flex-col items-center justify-center gap-2">
          <ShieldAlert className="w-8 h-8 text-amber-400" />
          <p>
            We found a bill increase, but the uploaded bill does not contain enough information to confidently identify the exact cause.
          </p>
        </div>
      )}
    </section>
  );
};
