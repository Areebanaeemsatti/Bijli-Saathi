export type Language = 'en' | 'ur' | 'roman_ur';

export interface BreakdownCategory {
  name: string;
  amount: number;
  percentage: number;
  description: string;
  color?: string;
}

export interface IncreaseReason {
  id: string;
  title: string;
  category: 'consumption' | 'fpa' | 'tariff' | 'taxes' | 'arrears';
  percentageImpact?: number;
  amountImpact?: number;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface SavingsSuggestion {
  id: string;
  title: string;
  applianceOrHabit: string;
  actionableStep: string;
  potentialUnitSavings: number;
  difficulty: 'easy' | 'moderate' | 'advanced';
  iconName?: string;
}

export interface MonthlyHistoryPoint {
  month: string;
  units: number;
  billAmount: number;
}

export interface ExtractedField<T> {
  value: T | null;
  currency?: string;
  sourceLabel: string;
  confidence: number; // 0.0 to 1.0
  isUncertain?: boolean;
}

export interface BillExtractedFields {
  provider: ExtractedField<string>;
  consumerNumber: ExtractedField<string>;
  billingMonth: ExtractedField<string>;
  currentBill: ExtractedField<number>;
  amountPayable: ExtractedField<number>;
  currentUnits: ExtractedField<number>;
  previousUnits: ExtractedField<number>;
  currentReading: ExtractedField<string>;
  previousReading: ExtractedField<string>;
  dueDate: ExtractedField<string>;
  arrears: ExtractedField<number>;
  taxes: ExtractedField<number>;
  adjustments: ExtractedField<number>;
  fuelAdjustment: ExtractedField<number>;
}

export interface BillData {
  id: string;
  provider: string; // e.g. "IESCO", "K-Electric", "LESCO", "FESCO", "MEPCO"
  consumerNumber: string;
  billingMonth: string;
  billDate: string;
  dueDate: string;
  currentUnits: number;
  previousUnits: number;
  currentReading: string;
  previousReading: string;
  currentBill: number;
  previousBill: number;
  arrears: number;
  taxes: number;
  adjustments: number;
  fuelAdjustment: number; // FPA
  otherCharges: { label: string; amount: number }[];
  tariff: string;
  summary: {
    en: string;
    ur: string;
    roman_ur: string;
  };
  increaseReasons: {
    title: { en: string; ur: string; roman_ur: string };
    category: 'consumption' | 'fpa' | 'tariff' | 'taxes' | 'arrears';
    percentageImpact?: number;
    amountImpact?: number;
    description: { en: string; ur: string; roman_ur: string };
    severity: 'high' | 'medium' | 'low';
  }[];
  savingsSuggestions: {
    title: { en: string; ur: string; roman_ur: string };
    applianceOrHabit: { en: string; ur: string; roman_ur: string };
    actionableStep: { en: string; ur: string; roman_ur: string };
    potentialUnitSavings: number;
    difficulty: 'easy' | 'moderate' | 'advanced';
  }[];
  breakdown: BreakdownCategory[];
  history: MonthlyHistoryPoint[];
  confidence: 'High' | 'Medium' | 'Estimated';
  extractedFields?: BillExtractedFields;
  isDemo?: boolean;
  rawTextFound?: string;
}

export interface DemoPreset {
  id: string;
  name: string;
  provider: string;
  badge: string;
  description: string;
  data: BillData;
}
