import React from 'react';
import { ArrowUpRight, TrendingUp, Zap } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface BillComparisonProps {
  bill: BillData;
  currentLang: Language;
}

export const BillComparison: React.FC<BillComparisonProps> = ({ bill, currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;
  const billDiff = bill.currentBill - bill.previousBill;
  const unitDiff = bill.currentUnits - bill.previousUnits;
  const maxUnits = Math.max(bill.currentUnits, bill.previousUnits, 1);
  const maxBill = Math.max(bill.currentBill, bill.previousBill, 1);

  return (
    <div className="bg-[#12261F] border border-[#1B392F] rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B392F]">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>{t.monthVsMonthTitle}</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Unit & Rupee expenditure comparison
          </p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-amber-400" />
          <span>{unitDiff >= 0 ? `+${unitDiff}` : unitDiff} {t.unitsLabel}</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Previous Month Card */}
        <div className="bg-[#0B1914] border border-[#1B392F] rounded-2xl p-5">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            {t.previousMonth}
          </span>
          <div className="text-2xl font-black text-gray-300 font-mono mt-1">
            Rs. {bill.previousBill.toLocaleString()}
          </div>
          <div className="text-xs font-mono text-emerald-400/80 mt-1 flex items-center gap-1">
            <span>{bill.previousUnits} {t.unitsLabel}</span>
          </div>

          <div className="mt-4 w-full bg-[#12261F] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gray-500 h-full rounded-full"
              style={{ width: `${(bill.previousBill / maxBill) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Month Card */}
        <div className="bg-[#0B1914] border-2 border-emerald-500/40 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
            LATEST
          </div>
          <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
            {t.currentMonth}
          </span>
          <div className="text-3xl font-black text-white font-mono mt-1">
            Rs. {bill.currentBill.toLocaleString()}
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-1 font-bold">
            {bill.currentUnits} {t.unitsLabel}
          </div>

          <div className="mt-4 w-full bg-[#12261F] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
              style={{ width: `${(bill.currentBill / maxBill) * 100}%` }}
            />
          </div>
        </div>

        {/* Net Difference Card */}
        <div className={`border rounded-2xl p-5 flex flex-col justify-between ${
          billDiff >= 0 
            ? 'bg-red-500/10 border-red-500/30' 
            : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <div>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              {t.difference}
            </span>
            <div className={`text-2xl font-black font-mono mt-1 ${billDiff >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {billDiff >= 0 ? '+' : ''}Rs. {billDiff.toLocaleString()}
            </div>
            <p className="text-xs text-gray-300 mt-1">
              {unitDiff >= 0 ? `+${unitDiff}` : unitDiff} units ({Math.round((unitDiff / Math.max(1, bill.previousUnits)) * 100)}% change)
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1B392F]/60 flex items-center justify-between text-xs font-bold text-gray-300">
            <span>Unit Shift</span>
            <span className="font-mono text-emerald-400">{bill.previousUnits}u → {bill.currentUnits}u</span>
          </div>
        </div>
      </div>
    </div>
  );
};
