import React, { useState } from 'react';
import { Calculator, Zap, AlertCircle, Sparkles, TrendingDown } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface SavingsCalculatorProps {
  bill: BillData;
  currentLang: Language;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ bill, currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;
  const [reductionPct, setReductionPct] = useState<number>(15);

  const currentUnits = bill.currentUnits || 385;
  const targetUnits = Math.round(currentUnits * (1 - reductionPct / 100));
  const unitsSaved = currentUnits - targetUnits;

  // Approximate PKR per unit average based on current bill
  const avgCostPerUnit = bill.currentBill && currentUnits > 0 ? bill.currentBill / currentUnits : 60;
  const estimatedMonetarySavings = Math.round(unitsSaved * avgCostPerUnit);

  return (
    <section className="bg-[#12261F] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1B392F]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#0B1914] rounded-[14px] flex items-center justify-center text-emerald-400">
              <Calculator className="w-7 h-7" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                KILLER FEATURE #2
              </span>
              <span className="text-xs text-gray-400">Interactive What-If Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {t.calculatorTitle}
            </h2>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-xs text-gray-400">Target Savings Goal</span>
          <div className="text-lg font-black text-emerald-400">
            -{reductionPct}% Units ({unitsSaved}u)
          </div>
        </div>
      </div>

      {/* Main Interactive Controls & Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
        {/* Left Column: Slider Controls */}
        <div className="bg-[#0B1914] border border-[#1B392F] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-200">
              {t.targetReductionLabel}
            </label>
            <span className="text-xl font-black text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
              {reductionPct}%
            </span>
          </div>

          {/* Custom Styled Range Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="5"
              max="35"
              step="5"
              value={reductionPct}
              onChange={(e) => setReductionPct(Number(e.target.value))}
              className="w-full h-3 bg-[#12261F] rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-[#1B392F]"
            />
            <div className="flex justify-between text-[11px] font-mono text-gray-500 font-bold px-1">
              <span>5% (Conservative)</span>
              <span>15% (Recommended)</span>
              <span>35% (Aggressive)</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-[#1B392F]/60">
            <span>{t.currentUsageLabel}: <strong className="text-white font-mono">{currentUnits} units</strong></span>
            <span>Units Saved: <strong className="text-emerald-400 font-mono">{unitsSaved} units</strong></span>
          </div>
        </div>

        {/* Right Column: Calculated Target Card */}
        <div className="bg-gradient-to-br from-[#16352A] to-[#0B1914] border-2 border-emerald-500/50 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {t.estimatedTargetLabel}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                PROJECTION
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight my-2">
              {targetUnits} <span className="text-xl font-normal text-emerald-400">{t.unitsLabel}</span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              If you reduce your consumption by approximately <strong>{reductionPct}%</strong>, your monthly target would be around <strong>{targetUnits} units</strong>.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="text-xs text-gray-300 flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              Est. Monthly Bill Cut:
            </span>
            <span className="text-lg font-black text-emerald-300 font-mono">
              ~Rs. {estimatedMonetarySavings.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Safety Disclaimer Warning Box */}
      <div className="bg-[#0B1914] border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-300/90 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Disclaimer:</strong> {t.calculatorNote}
        </p>
      </div>
    </section>
  );
};
