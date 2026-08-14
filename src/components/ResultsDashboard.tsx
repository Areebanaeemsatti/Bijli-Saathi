import React, { useState } from 'react';
import { DollarSign, Zap, History, TrendingUp, RefreshCw, FileText, CheckCircle2, ShieldCheck, Sparkles, Building2, Calendar, Hash, Edit3, AlertCircle, Eye, ShieldAlert } from 'lucide-react';
import { BillData, Language } from '../types/bill';
import { TRANSLATIONS } from '../i18n/translations';
import { MetricCard } from './MetricCard';
import { BillComparison } from './BillComparison';
import { IncreaseReason } from './IncreaseReason';
import { BillBreakdown } from './BillBreakdown';
import { ConsumptionChart } from './ConsumptionChart';
import { SavingsPlan } from './SavingsPlan';
import { SavingsCalculator } from './SavingsCalculator';
import { SimpleExplanation } from './SimpleExplanation';
import { EditBillModal } from './EditBillModal';

interface ResultsDashboardProps {
  bill: BillData;
  currentLang: Language;
  onReset: () => void;
  onUpdateBill?: (updated: BillData) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  bill,
  currentLang,
  onReset,
  onUpdateBill
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const t = TRANSLATIONS[currentLang].results;
  const fields = bill.extractedFields;

  const billChangePct = Math.round(
    ((bill.currentBill - bill.previousBill) / Math.max(1, bill.previousBill)) * 100
  );
  const unitChangePct = Math.round(
    ((bill.currentUnits - bill.previousUnits) / Math.max(1, bill.previousUnits)) * 100
  );

  const handleSaveCorrection = (updatedBill: BillData) => {
    if (onUpdateBill) {
      onUpdateBill(updatedBill);
    }
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Correction Modal */}
      <EditBillModal
        bill={bill}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveCorrection}
      />

      {/* Accuracy & Confidence Verification Banner */}
      <div className="bg-[#12261F] border-2 border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Multimodal Source Verification: {bill.provider}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${
                bill.confidence === 'High'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : bill.confidence === 'Medium'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              }`}>
                AI Confidence: {bill.confidence}
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Source labels are extracted directly from your bill image. If any number requires manual adjustment, click <strong className="text-emerald-300 font-semibold">Correct Values</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs hover:from-emerald-400 hover:to-teal-400 transition-all shadow-lg shadow-emerald-500/20 shrink-0 active:scale-95"
        >
          <Edit3 className="w-4 h-4" />
          <span>Correct / Verify Values ✏️</span>
        </button>
      </div>

      {/* Top Banner Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12261F] border border-[#1B392F] rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {bill.provider} Bill Analysis Complete
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30">
                {t.confidenceLabel}: {bill.confidence}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Consumer #: <span className="font-mono text-gray-200">{bill.consumerNumber}</span> • Month: <span className="font-mono text-gray-200">{bill.billingMonth}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#0B1914] text-amber-400 border border-amber-500/30 hover:bg-amber-950/30 px-3.5 py-2 rounded-xl font-bold text-xs transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Data</span>
          </button>

          <button
            onClick={onReset}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0B1914] text-emerald-300 border border-[#1B392F] hover:bg-emerald-950/40 hover:border-emerald-500/40 px-4 py-2 rounded-xl font-bold text-xs transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Analyze Another Bill</span>
          </button>
        </div>
      </div>

      {/* 1. TOP SECTION: Your Electricity Snapshot (4 Large Metric Cards with Confidence & Source Labels) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.snapshotTitle}
          </h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {bill.billingMonth} Snapshot
          </span>
        </div>

        {/* 4 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title={t.currentBill}
            value={bill.currentBill > 0 ? `Rs. ${bill.currentBill.toLocaleString()}` : 'Could not confidently read this value'}
            subtext={`Due Date: ${bill.dueDate}`}
            icon={DollarSign}
            field={fields?.currentBill}
            highlight={true}
            onEditClick={() => setIsEditModalOpen(true)}
            trend={bill.currentBill > 0 ? {
              value: `${billChangePct >= 0 ? '+' : ''}${billChangePct}%`,
              isUp: billChangePct >= 0,
              isGood: billChangePct < 0
            } : undefined}
          />

          <MetricCard
            title={t.currentUsage}
            value={bill.currentUnits > 0 ? `${bill.currentUnits}` : 'Could not confidently read this value'}
            subtext={`${t.unitsLabel} consumed`}
            icon={Zap}
            field={fields?.currentUnits}
            onEditClick={() => setIsEditModalOpen(true)}
            trend={bill.currentUnits > 0 ? {
              value: `${unitChangePct >= 0 ? '+' : ''}${unitChangePct}%`,
              isUp: unitChangePct >= 0,
              isGood: unitChangePct < 0
            } : undefined}
          />

          <MetricCard
            title={t.previousUsage}
            value={bill.previousUnits > 0 ? `${bill.previousUnits}` : 'Not available'}
            subtext={`${t.unitsLabel} last month`}
            field={fields?.previousUnits}
            icon={History}
          />

          <MetricCard
            title={t.billChange}
            value={bill.currentBill > 0 ? `${billChangePct >= 0 ? '+' : ''}${billChangePct}%` : 'N/A'}
            subtext={billChangePct >= 0 ? 'Surge in cost' : 'Reduction in cost'}
            icon={TrendingUp}
            trend={bill.currentBill > 0 ? {
              value: `Rs. ${Math.abs(bill.currentBill - bill.previousBill).toLocaleString()}`,
              isUp: billChangePct >= 0,
              isGood: billChangePct < 0
            } : undefined}
          />
        </div>

        {/* Extracted Labels & Source Evidence Table Pill */}
        <div className="bg-[#12261F] border border-[#1B392F] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1B392F] pb-2">
            <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Label Evidence Inspection (Source Document Verification)</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">
              Source: Uploaded Bill File
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-300 font-mono">
            <div className="bg-[#0B1914] p-2.5 rounded-xl border border-[#1B392F]">
              <span className="text-gray-500 block text-[10px] uppercase">Current Bill Field</span>
              <span className="text-white font-bold block mt-0.5">Rs. {bill.currentBill > 0 ? bill.currentBill.toLocaleString() : 'N/A'}</span>
              <span className="text-[10px] text-emerald-400 block truncate">Label: "{fields?.currentBill?.sourceLabel || 'PAYABLE WITHIN DUE DATE'}"</span>
            </div>

            <div className="bg-[#0B1914] p-2.5 rounded-xl border border-[#1B392F]">
              <span className="text-gray-500 block text-[10px] uppercase">Units Consumed Field</span>
              <span className="text-white font-bold block mt-0.5">{bill.currentUnits > 0 ? `${bill.currentUnits} units` : 'N/A'}</span>
              <span className="text-[10px] text-emerald-400 block truncate">Label: "{fields?.currentUnits?.sourceLabel || 'UNITS CONSUMED'}"</span>
            </div>

            <div className="bg-[#0B1914] p-2.5 rounded-xl border border-[#1B392F]">
              <span className="text-gray-500 block text-[10px] uppercase">Present Meter Reading</span>
              <span className="text-white font-bold block mt-0.5">{bill.currentReading || 'N/A'}</span>
              <span className="text-[10px] text-emerald-400 block truncate">Label: "{fields?.currentReading?.sourceLabel || 'PRESENT READING'}"</span>
            </div>

            <div className="bg-[#0B1914] p-2.5 rounded-xl border border-[#1B392F]">
              <span className="text-gray-500 block text-[10px] uppercase">Previous Meter Reading</span>
              <span className="text-white font-bold block mt-0.5">{bill.previousReading || 'N/A'}</span>
              <span className="text-[10px] text-emerald-400 block truncate">Label: "{fields?.previousReading?.sourceLabel || 'PREVIOUS READING'}"</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BILL COMPARISON: This Month vs Previous Month */}
      <BillComparison bill={bill} currentLang={currentLang} />

      {/* 3. 🔥 KILLER FEATURE #1: Why did my bill increase? */}
      <IncreaseReason bill={bill} currentLang={currentLang} />

      {/* 4. BILL BREAKDOWN: Where is my money going? */}
      <BillBreakdown bill={bill} currentLang={currentLang} />

      {/* 5. CONSUMPTION INSIGHT: Your consumption trend */}
      <ConsumptionChart bill={bill} currentLang={currentLang} />

      {/* 6. 💡 PERSONALIZED SAVINGS PLAN: How can I lower my next bill? */}
      <SavingsPlan bill={bill} currentLang={currentLang} />

      {/* 7. 🔥 KILLER FEATURE #2: What if I use fewer units? (Calculator) */}
      <SavingsCalculator bill={bill} currentLang={currentLang} />

      {/* 8. SIMPLE EXPLANATION: Your bill in simple words */}
      <SimpleExplanation bill={bill} currentLang={currentLang} />

      {/* 9. Bottom Action Bar */}
      <div className="pt-6 border-t border-[#1B392F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <span>Bijli Saathi AI Energy Intelligence Engine v1.0</span>
        <button
          onClick={onReset}
          className="bg-emerald-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl hover:bg-emerald-400 transition-all text-xs flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Analyze Another Electricity Bill</span>
        </button>
      </div>
    </div>
  );
};
