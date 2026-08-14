import React from 'react';
import { BarChart2, TrendingUp, Zap } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';

interface ConsumptionChartProps {
  bill: BillData;
  currentLang: Language;
}

export const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ bill, currentLang }) => {
  const t = TRANSLATIONS[currentLang].results;
  const history = bill.history || [];
  const maxUnits = Math.max(...history.map(h => h.units), bill.currentUnits, 1);

  return (
    <div className="bg-[#12261F] border border-[#1B392F] rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1B392F]">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
            <span>{t.trendTitle}</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            5-month electricity unit trajectory
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-[#0B1914] px-3 py-1 rounded-full border border-[#1B392F]">
          <Zap className="w-3.5 h-3.5 fill-emerald-400" />
          <span>Current: {bill.currentUnits} units</span>
        </div>
      </div>

      {/* Bar Graph Visual */}
      <div className="pt-4 pb-2">
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-6">
          {history.map((pt, idx) => {
            const isCurrent = idx === history.length - 1;
            const heightPct = Math.round((pt.units / maxUnits) * 100);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Tooltip value */}
                <div className={`text-[11px] font-mono font-bold transition-all ${
                  isCurrent ? 'text-emerald-300 scale-110' : 'text-gray-400 group-hover:text-white'
                }`}>
                  {pt.units}u
                </div>

                {/* Vertical Bar */}
                <div className="w-full bg-[#0B1914] rounded-t-xl h-full flex items-end p-1 border border-[#1B392F] max-w-[50px]">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 relative group-hover:opacity-90 ${
                      isCurrent
                        ? 'bg-gradient-to-t from-emerald-600 via-emerald-400 to-teal-300 shadow-lg shadow-emerald-500/30'
                        : 'bg-gradient-to-t from-emerald-950 to-emerald-800/80'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  >
                    {isCurrent && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                    )}
                  </div>
                </div>

                {/* Month label */}
                <span className={`text-[10px] sm:text-xs font-semibold font-mono tracking-wider truncate max-w-full ${
                  isCurrent ? 'text-emerald-400 font-bold' : 'text-gray-400'
                }`}>
                  {pt.month.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom insights bar */}
      <div className="mt-6 pt-4 border-t border-[#1B392F]/60 flex items-center justify-between text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>
            Unit change: <strong className="text-white font-mono">{bill.previousUnits} → {bill.currentUnits} units</strong> ({bill.currentUnits - bill.previousUnits >= 0 ? '+' : ''}{bill.currentUnits - bill.previousUnits} units)
          </span>
        </div>
        <span className="text-emerald-400 font-mono text-[11px] hidden sm:block">
          Slab Bracket: {bill.tariff || 'Residential'}
        </span>
      </div>
    </div>
  );
};
