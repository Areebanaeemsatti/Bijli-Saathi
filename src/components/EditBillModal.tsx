import React, { useState } from 'react';
import { X, Check, Edit3, Zap, DollarSign, Calculator, AlertCircle } from 'lucide-react';
import { BillData, Language } from '../types/bill';

interface EditBillModalProps {
  bill: BillData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBill: BillData) => void;
}

export const EditBillModal: React.FC<EditBillModalProps> = ({
  bill,
  isOpen,
  onClose,
  onSave
}) => {
  const [provider, setProvider] = useState(bill.provider);
  const [billingMonth, setBillingMonth] = useState(bill.billingMonth);
  const [currentBill, setCurrentBill] = useState(bill.currentBill);
  const [previousBill, setPreviousBill] = useState(bill.previousBill);
  const [currentUnits, setCurrentUnits] = useState(bill.currentUnits);
  const [previousUnits, setPreviousUnits] = useState(bill.previousUnits);
  const [fuelAdjustment, setFuelAdjustment] = useState(bill.fuelAdjustment);
  const [taxes, setTaxes] = useState(bill.taxes);
  const [tariff, setTariff] = useState(bill.tariff);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const unitDiff = currentUnits - previousUnits;
    const billDiff = currentBill - previousBill;
    const pctSurge = previousBill > 0 ? Math.round((billDiff / previousBill) * 100) : 0;
    const unitPctSurge = previousUnits > 0 ? Math.round((unitDiff / previousUnits) * 100) : 0;

    // Recalculate dynamic summaries and reasons
    const updatedBill: BillData = {
      ...bill,
      provider,
      billingMonth,
      currentBill: Number(currentBill),
      previousBill: Number(previousBill),
      currentUnits: Number(currentUnits),
      previousUnits: Number(previousUnits),
      fuelAdjustment: Number(fuelAdjustment),
      taxes: Number(taxes),
      tariff,
      confidence: 'High', // User confirmed
      summary: {
        en: `Your ${provider} bill for ${billingMonth} is Rs. ${Number(currentBill).toLocaleString()} (${currentUnits} units) compared to Rs. ${Number(previousBill).toLocaleString()} (${previousUnits} units) last month. Consumption changed by ${unitDiff >= 0 ? '+' : ''}${unitDiff} units (${unitPctSurge >= 0 ? '+' : ''}${unitPctSurge}%).`,
        ur: `آپ کا ${provider} کا ${billingMonth} کا بل ${Number(currentBill).toLocaleString()} روپے (${currentUnits} یونٹس) ہے جبکہ پچھلے مہینے ${Number(previousBill).toLocaleString()} روپے (${previousUnits} یونٹس) تھا۔`,
        roman_ur: `Aap ka ${provider} bill ${billingMonth} ke liye Rs. ${Number(currentBill).toLocaleString()} (${currentUnits} units) hai jabke pichlay month Rs. ${Number(previousBill).toLocaleString()} (${previousUnits} units) tha.`
      },
      increaseReasons: [
        {
          title: {
            en: `Consumption Change (${unitDiff >= 0 ? '+' : ''}${unitDiff} Units)`,
            ur: `کھپت میں تبدیلی (${unitDiff >= 0 ? '+' : ''}${unitDiff} یونٹس)`,
            roman_ur: `Consumption Change (${unitDiff >= 0 ? '+' : ''}${unitDiff} Units)`
          },
          category: 'consumption',
          percentageImpact: unitPctSurge,
          amountImpact: Math.abs(Math.round(unitDiff * 30)),
          description: {
            en: `Usage went from ${previousUnits} to ${currentUnits} units (${unitPctSurge >= 0 ? '+' : ''}${unitPctSurge}% difference).`,
            ur: `استعمال ${previousUnits} سے بدل کر ${currentUnits} یونٹ ہو گیا۔`,
            roman_ur: `Istemal ${previousUnits} se badal kar ${currentUnits} units ho gaya.`
          },
          severity: unitPctSurge > 15 ? 'high' : unitPctSurge > 5 ? 'medium' : 'low'
        },
        ...(fuelAdjustment > 0
          ? [
              {
                title: {
                  en: `Fuel Price Adjustment (FPA: Rs. ${fuelAdjustment})`,
                  ur: `فیول پرائس ایڈجسٹمنٹ (${fuelAdjustment} روپے)`,
                  roman_ur: `Fuel Price Adjustment (FPA: Rs. ${fuelAdjustment})`
                },
                category: 'fpa' as const,
                amountImpact: fuelAdjustment,
                description: {
                  en: `NEPRA fuel variation charges applied on your billing cycle.`,
                  ur: `نیپرا کی طرف سے فیول ایڈجسٹمنٹ کی رقم شامل کی گئی۔`,
                  roman_ur: `NEPRA fuel variation surcharge shamil kiya gaya.`
                },
                severity: 'medium' as const
              }
            ]
          : [])
      ],
      breakdown: [
        {
          name: 'Base Energy Charges',
          amount: Math.max(0, currentBill - taxes - fuelAdjustment),
          percentage: Math.round((Math.max(0, currentBill - taxes - fuelAdjustment) / currentBill) * 100),
          description: 'Calculated electricity unit charges',
          color: '#10B981'
        },
        {
          name: 'Government Taxes & Duties',
          amount: Number(taxes),
          percentage: Math.round((taxes / currentBill) * 100),
          description: 'Sales Tax (GST 18%) & levies',
          color: '#F59E0B'
        },
        ...(fuelAdjustment > 0
          ? [
              {
                name: 'Fuel Price Adjustment (FPA)',
                amount: Number(fuelAdjustment),
                percentage: Math.round((fuelAdjustment / currentBill) * 100),
                description: 'NEPRA Monthly Fuel Surcharge',
                color: '#EF4444'
              }
            ]
          : [])
      ],
      history: [
        ...(bill.history?.slice(0, 4) || []),
        { month: billingMonth, units: Number(currentUnits), billAmount: Number(currentBill) }
      ]
    };

    onSave(updatedBill);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12261F] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1B392F] mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Correct Bill Extraction Data
              </h3>
              <p className="text-xs text-gray-400">
                Adjust values below to instantly recalculate your complete bill breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Electricity Provider
              </label>
              <select
                value={provider}
                onChange={e => setProvider(e.target.value)}
                className="w-full bg-[#0B1914] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-semibold"
              >
                <option value="IESCO">IESCO (Islamabad/Rawalpindi)</option>
                <option value="K-Electric">K-Electric (Karachi)</option>
                <option value="LESCO">LESCO (Lahore)</option>
                <option value="FESCO">FESCO (Faisalabad)</option>
                <option value="MEPCO">MEPCO (Multan)</option>
                <option value="PESCO">PESCO (Peshawar)</option>
                <option value="HESCO">HESCO (Hyderabad)</option>
                <option value="GEBCO">GEBCO (Gilgit)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Billing Month
              </label>
              <input
                type="text"
                value={billingMonth}
                onChange={e => setBillingMonth(e.target.value)}
                className="w-full bg-[#0B1914] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-semibold"
                placeholder="e.g. August 2026"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B1914] p-4 rounded-2xl border border-[#1B392F]">
            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-1">
                Current Bill Amount (Rs.)
              </label>
              <input
                type="number"
                value={currentBill}
                onChange={e => setCurrentBill(Number(e.target.value))}
                className="w-full bg-[#12261F] border border-emerald-500/40 focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-base font-black font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-1">
                Current Usage (Units)
              </label>
              <input
                type="number"
                value={currentUnits}
                onChange={e => setCurrentUnits(Number(e.target.value))}
                className="w-full bg-[#12261F] border border-emerald-500/40 focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-base font-black font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B1914] p-4 rounded-2xl border border-[#1B392F]">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Previous Bill Amount (Rs.)
              </label>
              <input
                type="number"
                value={previousBill}
                onChange={e => setPreviousBill(Number(e.target.value))}
                className="w-full bg-[#12261F] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-bold font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Previous Usage (Units)
              </label>
              <input
                type="number"
                value={previousUnits}
                onChange={e => setPreviousUnits(Number(e.target.value))}
                className="w-full bg-[#12261F] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-bold font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Fuel Price Adjustment (FPA Rs.)
              </label>
              <input
                type="number"
                value={fuelAdjustment}
                onChange={e => setFuelAdjustment(Number(e.target.value))}
                className="w-full bg-[#0B1914] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-semibold font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Total Taxes & GST (Rs.)
              </label>
              <input
                type="number"
                value={taxes}
                onChange={e => setTaxes(Number(e.target.value))}
                className="w-full bg-[#0B1914] border border-[#1B392F] focus:border-emerald-400 text-white rounded-xl px-3 py-2 text-sm font-semibold font-mono"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#1B392F] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-gray-300 text-xs font-bold hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save & Recalculate Dashboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
