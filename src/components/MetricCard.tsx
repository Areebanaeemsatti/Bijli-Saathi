import React from 'react';
import { LucideIcon, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { ExtractedField } from '../types/bill';

interface MetricCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
  field?: ExtractedField<any>;
  trend?: {
    value: string;
    isUp: boolean;
    isGood?: boolean;
  };
  accentColor?: string;
  highlight?: boolean;
  onEditClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  field,
  trend,
  highlight = false,
  onEditClick
}) => {
  const confidence = field?.confidence ?? 1.0;
  const isUncertain = field?.isUncertain || confidence < 0.45 || value.includes('Could not');
  const sourceLabel = field?.sourceLabel;

  return (
    <div
      className={`rounded-3xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        highlight
          ? 'bg-gradient-to-br from-[#16352A] to-[#12261F] border-2 border-emerald-500/50 shadow-xl shadow-emerald-500/10'
          : isUncertain
          ? 'bg-amber-500/5 border-2 border-amber-500/40 shadow-lg'
          : 'bg-[#12261F] border border-[#1B392F] hover:border-emerald-500/30 shadow-lg'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            {title}
          </span>
          <div className="flex items-center gap-2">
            {/* Extraction Confidence Badge */}
            {field && (
              <div
                className={`flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  confidence >= 0.8
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : confidence >= 0.45
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                }`}
                title={`Extraction confidence: Math.round(confidence * 100)%`}
              >
                {confidence >= 0.8 ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
                <span>{Math.round(confidence * 100)}% Match</span>
              </div>
            )}
            <div className="p-2 rounded-2xl bg-[#0B1914] border border-[#1B392F] text-emerald-400">
              <Icon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Display value or "Could not confidently read this value" */}
        {isUncertain ? (
          <div className="my-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Could not confidently read this value</span>
            </div>
            {onEditClick && (
              <button
                onClick={onEditClick}
                className="mt-1 text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1"
              >
                ✏️ Click to enter exact value from bill
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
              {value}
            </h3>
          </div>
        )}

        {subtext && !isUncertain && (
          <p className="text-xs text-gray-400 mt-1 font-medium">
            {subtext}
          </p>
        )}

        {/* Evidence Source Label */}
        {sourceLabel && (
          <div className="mt-2 text-[10px] text-gray-400 font-mono flex items-center gap-1 bg-[#0B1914]/80 px-2 py-1 rounded border border-[#1B392F]">
            <Info className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Label: "{sourceLabel}"</span>
          </div>
        )}
      </div>

      {trend && !isUncertain && (
        <div className="mt-4 pt-3 border-t border-[#1B392F]/60 flex items-center justify-between">
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              trend.isUp
                ? trend.isGood
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}
          >
            {trend.value}
          </span>
          <span className="text-[11px] text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
};
