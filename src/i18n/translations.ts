import { Language } from '../types/bill';

export interface Translations {
  nav: {
    brandName: string;
    home: string;
    howItWorks: string;
    features: string;
    tryDemo: string;
    analyzeBill: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    pitch: string;
    primaryCta: string;
    secondaryCta: string;
    supportingText: string;
    flowTitle: string;
    flowStep1: string;
    flowStep2: string;
    flowStep3: string;
    flowStep4: string;
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
  };
  howItWorks: {
    sectionTitle: string;
    sectionSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  uploader: {
    title: string;
    subtitle: string;
    dragDropText: string;
    supportedFormats: string;
    browseButton: string;
    tryDemoButton: string;
    selectPresetTitle: string;
    analyzeCta: string;
    removeFile: string;
    fileSelected: string;
  };
  loader: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    completed: string;
  };
  results: {
    snapshotTitle: string;
    currentBill: string;
    currentUsage: string;
    previousUsage: string;
    billChange: string;
    unitsLabel: string;
    rsLabel: string;
    monthVsMonthTitle: string;
    currentMonth: string;
    previousMonth: string;
    difference: string;
    whyIncreasedTitle: string;
    whyIncreasedSubtitle: string;
    moneyBreakdownTitle: string;
    trendTitle: string;
    lowerBillTitle: string;
    calculatorTitle: string;
    calculatorSubtitle: string;
    currentUsageLabel: string;
    targetReductionLabel: string;
    estimatedTargetLabel: string;
    calculatorNote: string;
    simpleWordsTitle: string;
    disclaimerTitle: string;
    disclaimerText: string;
    confidenceLabel: string;
    providerLabel: string;
    consumerNoLabel: string;
    billingMonthLabel: string;
    dueDateLabel: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      brandName: 'Bijli Saathi',
      home: 'Home',
      howItWorks: 'How It Works',
      features: 'Features',
      tryDemo: 'Try Demo',
      analyzeBill: 'Analyze Bill ⚡'
    },
    hero: {
      badge: 'Pakistan Electricity AI Intelligence',
      headline: 'Understand your bill. Control your electricity.',
      subheadline: 'Bijli Saathi ⚡',
      pitch: 'Upload your electricity bill and let AI explain where your money is going, why your bill changed, and how you can reduce your future consumption.',
      primaryCta: 'Analyze My Bill',
      secondaryCta: 'Try Demo',
      supportingText: 'Built for everyday electricity consumers in Pakistan.',
      flowTitle: 'How Bijli Saathi Works For You',
      flowStep1: 'Electricity Bill',
      flowStep2: 'Bijli Saathi AI',
      flowStep3: 'Bill Explained',
      flowStep4: 'Savings Plan'
    },
    features: {
      sectionTitle: 'Everything You Need To Master Your Energy Bill',
      sectionSubtitle: 'Turn confusing utility jargon into actionable clarity',
      f1Title: '⚡ Understand Your Bill',
      f1Desc: 'Turn complicated billing information into simple language.',
      f2Title: '📊 Track Consumption',
      f2Desc: 'Compare current and previous electricity usage.',
      f3Title: '🔍 Find Out Why',
      f3Desc: 'Identify the main reasons your bill increased.',
      f4Title: '💡 Save Smarter',
      f4Desc: 'Generate personalized suggestions for reducing consumption.'
    },
    howItWorks: {
      sectionTitle: '3 Simple Steps To Control Your Electricity',
      sectionSubtitle: 'No registration, accounts, or complex setup required',
      step1Title: '1. Upload',
      step1Desc: 'Upload a clear photo or PDF of your electricity bill.',
      step2Title: '2. Understand',
      step2Desc: 'AI extracts and explains your consumption, tariffs, and charges.',
      step3Title: '3. Save',
      step3Desc: 'Get personalized ways to reduce future electricity usage.'
    },
    uploader: {
      title: 'Upload your electricity bill',
      subtitle: 'Upload a clear photo or PDF of your electricity bill (IESCO, K-Electric, LESCO, FESCO, MEPCO, PESCO, etc.).',
      dragDropText: 'Drag & drop your bill here',
      supportedFormats: 'Supported: PDF, PNG, JPG, JPEG',
      browseButton: 'Browse File',
      tryDemoButton: 'Try Demo Bill 🚀',
      selectPresetTitle: 'Or choose a realistic Pakistani bill scenario:',
      analyzeCta: 'Analyze My Bill ⚡',
      removeFile: 'Remove File',
      fileSelected: 'File selected and ready for AI analysis'
    },
    loader: {
      title: 'AI Analysis In Progress',
      step1: 'Reading your electricity bill...',
      step2: 'Extracting consumption data...',
      step3: 'Comparing your previous usage...',
      step4: 'Understanding billing charges & tariffs...',
      step5: 'Finding opportunities to save...',
      completed: 'Your bill has been analyzed ✓'
    },
    results: {
      snapshotTitle: 'Your Electricity Snapshot',
      currentBill: 'Current Bill',
      currentUsage: 'Current Usage',
      previousUsage: 'Previous Usage',
      billChange: 'Bill Change',
      unitsLabel: 'units',
      rsLabel: 'Rs.',
      monthVsMonthTitle: 'This Month vs Previous Month',
      currentMonth: 'Current Month',
      previousMonth: 'Previous Month',
      difference: 'Difference',
      whyIncreasedTitle: 'Why did my bill increase?',
      whyIncreasedSubtitle: 'AI root-cause breakdown of your electricity cost increase',
      moneyBreakdownTitle: 'Where is my money going?',
      trendTitle: 'Your consumption trend',
      lowerBillTitle: 'How can I lower my next bill?',
      calculatorTitle: 'What if I use fewer units?',
      calculatorSubtitle: 'Calculate your target unit goal and projected savings',
      currentUsageLabel: 'Current usage',
      targetReductionLabel: 'Target reduction',
      estimatedTargetLabel: 'Estimated target',
      calculatorNote: 'Estimated only. Actual bill savings depend on tariff structure, taxes, adjustments, and other charges.',
      simpleWordsTitle: 'Your bill in simple words',
      disclaimerTitle: 'Safety & Transparency Disclaimer',
      disclaimerText: 'Bijli Saathi provides AI-powered estimates and explanations based on the uploaded bill. Actual electricity charges depend on your electricity provider, tariff structure, taxes, adjustments, and other billing factors. Always verify important billing information with your electricity provider.',
      confidenceLabel: 'AI Confidence Level',
      providerLabel: 'Provider',
      consumerNoLabel: 'Consumer #',
      billingMonthLabel: 'Billing Month',
      dueDateLabel: 'Due Date'
    }
  },
  ur: {
    nav: {
      brandName: 'بجلی ساتھی',
      home: 'ہوم',
      howItWorks: 'طریقہ کار',
      features: 'خصوصیات',
      tryDemo: 'ڈیمو دیکھیں',
      analyzeBill: 'بل کا تجزیہ کریں ⚡'
    },
    hero: {
      badge: 'پاکستان الیکٹرسٹی اے آئی انٹیلی جنس',
      headline: 'اپنا بل سمجھیں۔ اپنی بجلی کنٹرول کریں۔',
      subheadline: 'بجلی ساتھی ⚡',
      pitch: 'اپنا بجلی کا بل اپ لوڈ کریں اور AI سے سمجھیں کہ آپ کی رقم کہاں جا رہی ہے، بل کیوں بڑھا اور آئندہ کیسے بچت کی جا سکتی ہے۔',
      primaryCta: 'میرا بل سمجھائیں',
      secondaryCta: 'ڈیمو بل آزمائیں',
      supportingText: 'پاکستان کے عام بجلی صارفین کے لیے بنایا گیا۔',
      flowTitle: 'بجلی ساتھی کیسے کام کرتا ہے',
      flowStep1: 'بجلی کا بل',
      flowStep2: 'بجلی ساتھی اے آئی',
      flowStep3: 'بل کی وضاحت',
      flowStep4: 'بچت کا منصوبہ'
    },
    features: {
      sectionTitle: 'بجلی کے بل کو سمجھنے کے لیے تمام سہولیات',
      sectionSubtitle: 'مشکل الفاظ کو آسان زبان میں سمجھیں',
      f1Title: '⚡ اپنا بل سمجھیں',
      f1Desc: 'مشکل معلومات کو آسان اور عام فہم زبان میں دیکھیں۔',
      f2Title: '📊 کھپت کا موازنہ',
      f2Desc: 'موجودہ اور پچھلے مہینے کے یونٹس کا موازنہ کریں۔',
      f3Title: '🔍 وجہ معلوم کریں',
      f3Desc: 'جانیں کہ آپ کا بل کس وجہ سے زیادہ آیا۔',
      f4Title: '💡 بچت کے طریقے',
      f4Desc: 'بل کم کرنے کے لیے عملی اور ذاتی مشورے حاصل کریں۔'
    },
    howItWorks: {
      sectionTitle: '3 آسان مراحل میں اپنی بجلی کنٹرول کریں',
      sectionSubtitle: 'کسی اکاؤنٹ یا پاسورڈ کی ضرورت نہیں',
      step1Title: '1. اپ لوڈ کریں',
      step1Desc: 'اپنے بجلی کے بل کی تصویر یا PDF اپ لوڈ کریں۔',
      step2Title: '2. سمجھیں',
      step2Desc: 'اے آئی آپ کے یونٹس اور چارجز کی وضاحت کرتا ہے۔',
      step3Title: '3. بچت کریں',
      step3Desc: 'آئندہ کے لیے بل کم کرنے کا منصوبہ حاصل کریں۔'
    },
    uploader: {
      title: 'اپنا بجلی کا بل اپ لوڈ کریں',
      subtitle: 'اپنے بل کی صاف تصویر یا PDF فائل اپ لوڈ کریں (IESCO, K-Electric, LESCO, FESCO, MEPCO وغیرہ)',
      dragDropText: 'یہاں بل کی فائل ڈریگ اینڈ ڈراپ کریں',
      supportedFormats: 'سپورٹ شدہ فارمیٹ: PDF, PNG, JPG, JPEG',
      browseButton: 'فائل منتخب کریں',
      tryDemoButton: 'ڈیمو بل آزمائیں 🚀',
      selectPresetTitle: 'یا کوئی بھی پیکیج ڈیمو منتخب کریں:',
      analyzeCta: 'بل کا تجزیہ کریں ⚡',
      removeFile: 'فائل ختم کریں',
      fileSelected: 'فائل منتخب ہو گئی، تجزیہ کے لیے تیار ہے'
    },
    loader: {
      title: 'اے آئی بل کا تجزیہ کر رہا ہے',
      step1: 'بل پڑھا جا رہا ہے...',
      step2: 'یونٹس کی تفصیل نکالی جا رہی ہے...',
      step3: 'پچھلے استعمال کے ساتھ موازنہ ہو رہا ہے...',
      step4: 'ٹیکس اور اضافی چارجز کی جانچ ہو رہی ہے...',
      step5: 'بچت کے مواقع تلاش کیے جا رہے ہیں...',
      completed: 'آپ کے بل کا تجزیہ مکمل ہو گیا ہے ✓'
    },
    results: {
      snapshotTitle: 'آپ کی بجلی کی موجودہ صورتحال',
      currentBill: 'موجودہ بل',
      currentUsage: 'موجودہ استعمال',
      previousUsage: 'پچھلا استعمال',
      billChange: 'بل میں تبدیلی',
      unitsLabel: 'یونٹس',
      rsLabel: 'روپے',
      monthVsMonthTitle: 'اس مہینے بمقابلہ پچھلا مہینہ',
      currentMonth: 'موجودہ مہینہ',
      previousMonth: 'پچھلا مہینہ',
      difference: 'فرق',
      whyIncreasedTitle: 'میرا بل کیوں بڑھا؟',
      whyIncreasedSubtitle: 'بل میں اضافے کی بنیادی وجوہات کی تفصیلی وضاحت',
      moneyBreakdownTitle: 'میرا پیسہ کہاں جا رہا ہے؟',
      trendTitle: 'یونٹس کے استعمال کا رجحان',
      lowerBillTitle: 'اگلا بل کیسے کم کیا جائے؟',
      calculatorTitle: 'اگر کم یونٹ استعمال کریں تو کیا ہوگا؟',
      calculatorSubtitle: 'اپنا ہدف مقرر کریں اور متوقع بچت دیکھیں',
      currentUsageLabel: 'موجودہ استعمال',
      targetReductionLabel: 'بچت کا ہدف',
      estimatedTargetLabel: 'نیا یونٹ ہدف',
      calculatorNote: 'یہ اندازہ صرف تخمینہ ہے۔ اصل بچت ٹیکس اور ٹیرف پر منحصر ہے۔',
      simpleWordsTitle: 'آسان الفاظ میں بل کی کہانی',
      disclaimerTitle: 'وضاحت اور ڈس کلیمر',
      disclaimerText: 'بجلی ساتھی اے آئی پر مبنی تخمینہ فراہم کرتا ہے۔ اصل چارجز بجلی کمپنی اور حکومت کی پالیسی پر منحصر ہوتے ہیں۔ اہم معلومات اپنے بلنگ آفس سے تصدیق کریں۔',
      confidenceLabel: 'قابل اعتمادی کا معیار',
      providerLabel: 'کمپنی',
      consumerNoLabel: 'کنزیومر نمبر',
      billingMonthLabel: 'بلنگ کا مہینہ',
      dueDateLabel: 'آخری تاریخ'
    }
  },
  roman_ur: {
    nav: {
      brandName: 'Bijli Saathi',
      home: 'Home',
      howItWorks: 'Kaise Kaam Karta Hai',
      features: 'Features',
      tryDemo: 'Demo Dekhein',
      analyzeBill: 'Bill Analyze Karein ⚡'
    },
    hero: {
      badge: 'Pakistan Electricity AI Intelligence',
      headline: 'Apna bill samjhein. Apni bijli control karein.',
      subheadline: 'Bijli Saathi ⚡',
      pitch: 'Apna electricity bill upload karein aur AI se samjhein ke paisay kahan ja rahay hain, bill kyun barha aur future mein bachat kaise ho sakti hai.',
      primaryCta: 'Mera Bill Samjhayein',
      secondaryCta: 'Demo Bill Try Karein',
      supportingText: 'Pakistan ke aam bijli consumers ke liye banaya gaya.',
      flowTitle: 'Bijli Saathi Kaise Kaam Karta Hai',
      flowStep1: 'Bijli Ka Bill',
      flowStep2: 'Bijli Saathi AI',
      flowStep3: 'Bill Ki Wazahat',
      flowStep4: 'Bachat Ka Plan'
    },
    features: {
      sectionTitle: 'Bijli Ke Bill Ko Samjhane Ke Liye Sab Kuch',
      sectionSubtitle: 'Mushkil terms ko aasan zubaan mein samjhein',
      f1Title: '⚡ Apna Bill Samjhein',
      f1Desc: 'Mushkil billing details ko aasan zubaan mein dekhein.',
      f2Title: '📊 Consumption Compare Karein',
      f2Desc: 'Iss mahine aur pichlay mahine ke units ka muqabla karein.',
      f3Title: '🔍 Wajah Maloom Karein',
      f3Desc: 'Janiye ke aap ka bill kis wajah se ziada aaya.',
      f4Title: '💡 Bachat Ke Tarike',
      f4Desc: 'Bill kam karne ke liye practical aur personal tips haasil karein.'
    },
    howItWorks: {
      sectionTitle: '3 Aasan Steps Mein Apni Bijli Control Karein',
      sectionSubtitle: 'Kisi account ya password ki zaroorat nahi',
      step1Title: '1. Upload Karein',
      step1Desc: 'Apne bijli ke bill ki photo ya PDF upload karein.',
      step2Title: '2. Samjhein',
      step2Desc: 'AI aap ke units aur charges ki wazahat karta hai.',
      step3Title: '3. Save Karein',
      step3Desc: 'Future billing kam karne ka personalized plan haasil karein.'
    },
    uploader: {
      title: 'Apna electricity bill upload karein',
      subtitle: 'Apne bill ki clear photo ya PDF file upload karein (IESCO, K-Electric, LESCO, FESCO, MEPCO etc.)',
      dragDropText: 'Yahan bill file drag & drop karein',
      supportedFormats: 'Supported: PDF, PNG, JPG, JPEG',
      browseButton: 'Browse File',
      tryDemoButton: 'Try Demo Bill 🚀',
      selectPresetTitle: 'Ya koi bhi sample Pakistani scenario select karein:',
      analyzeCta: 'Analyze My Bill ⚡',
      removeFile: 'Remove File',
      fileSelected: 'File select ho gayi hai, analysis ke liye tayyar hai'
    },
    loader: {
      title: 'AI Analysis Jaari Hai',
      step1: 'Bill read kiya ja raha hai...',
      step2: 'Consumption units extract ho rahay hain...',
      step3: 'Pichlay mahine ke sath comparison ho raha hai...',
      step4: 'Taxes aur FPA charges check ho rahay hain...',
      step5: 'Bachat ke mawaqay dhoonde ja rahay hain...',
      completed: 'Aap ka bill successfully analyze ho gaya ✓'
    },
    results: {
      snapshotTitle: 'Aap Ki Bijli Ki Snapshot',
      currentBill: 'Current Bill',
      currentUsage: 'Current Usage',
      previousUsage: 'Previous Usage',
      billChange: 'Bill Change',
      unitsLabel: 'units',
      rsLabel: 'Rs.',
      monthVsMonthTitle: 'Iss Month Vs Pichla Month',
      currentMonth: 'Current Month',
      previousMonth: 'Pichla Month',
      difference: 'Difference',
      whyIncreasedTitle: 'Mera bill kyun barha?',
      whyIncreasedSubtitle: 'AI root-cause breakdown of your electricity cost increase',
      moneyBreakdownTitle: 'Mera paisa kahan ja raha hai?',
      trendTitle: 'Aap ki consumption ka trend',
      lowerBillTitle: 'Agla bill kaise kam kiya jaye?',
      calculatorTitle: 'Agar kam units istemal karein toh kya hoga?',
      calculatorSubtitle: 'Apna target unit goal set karein aur bachat dekhein',
      currentUsageLabel: 'Current usage',
      targetReductionLabel: 'Target reduction',
      estimatedTargetLabel: 'New target units',
      calculatorNote: 'Yeh sirf andaaza (estimate) hai. Actual bill bachat tariff aur taxes par depend karti hai.',
      simpleWordsTitle: 'Aasan alfaz mein bill ki kahani',
      disclaimerTitle: 'Disclaimer & Transparency',
      disclaimerText: 'Bijli Saathi AI-powered estimates aur explanations deta hai. Actual electricity charges aap ki company, tariff slab aur govt taxes par depend karte hain.',
      confidenceLabel: 'AI Confidence Level',
      providerLabel: 'Provider',
      consumerNoLabel: 'Consumer #',
      billingMonthLabel: 'Billing Month',
      dueDateLabel: 'Due Date'
    }
  }
};
