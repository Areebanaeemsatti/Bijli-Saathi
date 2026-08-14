import React from 'react';
import { PieChart, DollarSign, Info } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface BillBreakdownProps {
  bill: BillData;
  currentLang: Language;
}

export const BillBreakdown: React.FC<BillBreakdownProps> = ({ bill, currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;
  const breakdown = bill.breakdown || [];
  const total = bill.currentBill || 1;

  return (
    <div className="bg-[#12261F] border border-[#1B392F] rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B392F]">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-400" />
            <span>{t.moneyBreakdownTitle}</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Detailed categorization of energy vs taxes vs adjustments
          </p>
        </div>

        <div className="bg-[#0B1914] px-3 py-1 rounded-full border border-[#1B392F] text-xs font-mono text-emerald-400 font-bold">
          Total: Rs. {total.toLocaleString()}
        </div>
      </div>

      {/* Visual Stacked Progress Bar */}
      <div className="w-full bg-[#0B1914] h-4 rounded-full overflow-hidden flex mb-8 p-0.5 border border-[#1B392F]">
        {breakdown.map((item, idx) => (
          <div
            key={idx}
            className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
            style={{
              width: `${(item.amount / total) * 100}%`,
              backgroundColor: item.color || '#10B981'
            }}
            title={`${item.name}: Rs. ${item.amount.toLocaleString()} (${Math.round((item.amount / total) * 100)}%)`}
          />
        ))}
      </div>

      {/* Detailed Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {breakdown.map((item, idx) => {
          const pct = Math.round((item.amount / total) * 100);
          return (
            <div
              key={idx}
              className="bg-[#0B1914] border border-[#1B392F] hover:border-emerald-500/40 rounded-2xl p-4 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color || '#10B981' }}
                  />
                  <span className="text-sm font-bold text-white">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {pct}%
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-lg font-black text-gray-200 font-mono">
                  Rs. {item.amount.toLocaleString()}
                </span>
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Info className="w-3 h-3 text-gray-500" />
                  {item.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
