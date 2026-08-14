import { DemoPreset } from '../types/bill';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'iesco-summer',
    name: 'IESCO Summer Spike',
    provider: 'IESCO (Islamabad/Rawalpindi)',
    badge: 'AC Load & Slab Jump',
    description: '385 units vs 320 units last month (+20.3% consumption increase)',
    data: {
      id: 'demo-iesco-1',
      provider: 'IESCO',
      consumerNumber: '14 12345 6789012 U',
      billingMonth: 'July 2026',
      billDate: '10-Jul-2026',
      dueDate: '22-Jul-2026',
      currentUnits: 385,
      previousUnits: 320,
      currentReading: '45890',
      previousReading: '45505',
      currentBill: 25430,
      previousBill: 19820,
      arrears: 0,
      taxes: 4210,
      adjustments: 1450,
      fuelAdjustment: 1850,
      otherCharges: [
        { label: 'Electricity Duty (ED)', amount: 320 },
        { label: 'TV Fee', amount: 35 },
        { label: 'Sales Tax (GST)', amount: 3855 },
      ],
      tariff: 'A-1a Single Phase Residential (Unprotected)',
      summary: {
        en: 'Your bill increased mainly because your electricity consumption increased from 320 units to 385 units, an increase of approximately 20.3%. Cooling appliances during peak summer drove most of this change, pushing your usage into a higher tariff slab.',
        ur: 'آپ کا بل بنیادی طور پر اس لیے بڑھا کیونکہ آپ کی بجلی کی کھپت 320 یونٹس سے بڑھ کر 385 یونٹس ہو گئی، جو کہ تقریباً 20.3 فیصد اضافہ ہے۔ گرمیوں میں AC کے زیادہ استعمال نے آپ کے بل کو اوپر والے ٹیرف سلیب میں دھکیل دیا۔',
        roman_ur: 'Aap ka bill bunyadi taur par is liye barha kyun ke aap ki electricity consumption 320 units se barh kar 385 units ho gayi, jo ke taqreeban 20.3% izafa hai. Garmiyon mein AC ke ziada istemal ne aap ko ooper walay tariff slab mein bhej dia.'
      },
      increaseReasons: [
        {
          title: {
            en: 'Higher Consumption (+65 Units)',
            ur: 'زیادہ کھپت (+65 یونٹس)',
            roman_ur: 'Ziada Khapat (+65 Units)'
          },
          category: 'consumption',
          percentageImpact: 20.3,
          amountImpact: 3450,
          description: {
            en: 'Usage jumped from 320 to 385 units (+20.3%). Extra compressor run-time on ACs during hot afternoons contributed to ~65 extra units.',
            ur: 'استعمال 320 سے بڑھ کر 385 یونٹ ہو گیا۔ گرم دوپہر کے وقت AC کے زیادہ چلنے سے 65 اضافی یونٹ خرچ ہوئے۔',
            roman_ur: 'Istemal 320 se barh kar 385 units ho gaya. Garam dopahar mein AC ziada chalne se ~65 extra units kharch hue.'
          },
          severity: 'high'
        },
        {
          title: {
            en: 'Higher Tariff Slab Rate',
            ur: 'اعلیٰ ٹیرف سلیب ریٹ',
            roman_ur: 'Ooper Wala Tariff Slab Rate'
          },
          category: 'tariff',
          percentageImpact: 8.5,
          amountImpact: 1160,
          description: {
            en: 'Crossing 300 units shifted your per-unit energy rate from Rs. 27.50/unit to Rs. 32.10/unit for the upper bracket.',
            ur: '300 یونٹ کی حد پار کرنے پر فی یونٹ ریٹ 27.50 روپے سے بڑھ کر 32.10 روپے ہو گیا۔',
            roman_ur: '300 units ki limit cross karne par per-unit rate Rs. 27.50 se barh kar Rs. 32.10 ho gaya.'
          },
          severity: 'medium'
        },
        {
          title: {
            en: 'Fuel Price Adjustment (FPA)',
            ur: 'فیول پرائس ایڈجسٹمنٹ (FPA)',
            roman_ur: 'Fuel Price Adjustment (FPA)'
          },
          category: 'fpa',
          percentageImpact: 5.2,
          amountImpact: 1850,
          description: {
            en: 'NEPRA fuel adjustment surcharge of Rs. 4.80/unit applied on previous billing month.',
            ur: 'پچھلے مہینے پر نیپرا کی طرف سے 4.80 روپے فی یونٹ کا فیول چارج نافذ ہوا۔',
            roman_ur: 'Pichlay mahine par NEPRA ki taraf se Rs. 4.80 per unit ka fuel charge lagaya gaya.'
          },
          severity: 'low'
        }
      ],
      savingsSuggestions: [
        {
          title: {
            en: 'Optimize AC Temperature to 26°C',
            ur: 'ای سی کا درجہ حرارت 26C پر رکھیں',
            roman_ur: 'AC Ka Temperature 26°C Par Rakhein'
          },
          applianceOrHabit: {
            en: 'Air Conditioner',
            ur: 'ایئر کنڈیشنر',
            roman_ur: 'Air Conditioner'
          },
          actionableStep: {
            en: 'Setting your AC to 26°C instead of 18°C-22°C reduces compressor power consumption by up to 24% while staying comfortable.',
            ur: 'ای سی کو 18-22 کے بجائے 26 ڈگری پر سیٹ کرنے سے کمپریسر کی بجلی میں 24 فیصد تک بچت ہوتی ہے۔',
            roman_ur: 'AC ko 18°C-22°C ke bajaye 26°C par rakhne se compressor power load 24% kam ho jata hai.'
          },
          potentialUnitSavings: 45,
          difficulty: 'easy'
        },
        {
          title: {
            en: 'Shift Heavy Washing & Ironing Outside Peak Hours',
            ur: 'پیک اورز کے علاوہ استری اور واشنگ کریں',
            roman_ur: 'Peak Hours Ke Baad Iron Aur Washing Karein'
          },
          applianceOrHabit: {
            en: 'Iron & Water Pump',
            ur: 'استری اور واٹر پمپ',
            roman_ur: 'Istri Aur Water Pump'
          },
          actionableStep: {
            en: 'Avoid running water motor pumps, heavy laundry, and electric irons during peak hours (6 PM – 10 PM).',
            ur: 'شام 6 سے رات 10 بجے کے پیک اورز میں واٹر پمپ، کپڑے دھونا اور استری کرنے سے گریز کریں۔',
            roman_ur: 'Shaam 6 PM se 10 PM ke peak hours mein water motor, laundry aur heavy iron chalane se bachein.'
          },
          potentialUnitSavings: 25,
          difficulty: 'easy'
        },
        {
          title: {
            en: 'Stay Below the 300-Unit Threshold',
            ur: '300 یونٹ کی حد سے نیچے رہیں',
            roman_ur: '300 Unit Ki Boundary Se Niche Rahein'
          },
          applianceOrHabit: {
            en: 'Overall Household Energy Management',
            ur: 'گھریلو بجلی کا انتظام',
            roman_ur: 'Gharelu Bijli Ka Intezam'
          },
          actionableStep: {
            en: 'By saving just 35 units total across the month, you drop back into the lower slab bracket, saving over Rs. 3,500 on energy rates & taxes combined.',
            ur: 'مہینے میں صرف 35 یونٹ بچانے سے آپ کا سلیب کم ہو جائے گا اور ٹیکس سمیت 3,500 روپے سے زائد بچیں گے۔',
            roman_ur: 'Mahine mein sirf 35 units bachane se aap ka tariff slab kam ho jayega aur Rs. 3,500+ ki bachat hogi.'
          },
          potentialUnitSavings: 35,
          difficulty: 'moderate'
        }
      ],
      breakdown: [
        { name: 'Energy Charges', amount: 17920, percentage: 70.5, description: 'Base electricity unit charges', color: '#10B981' },
        { name: 'Government Taxes & Duties', amount: 4210, percentage: 16.5, description: 'GST (18%), ED, and TV Fee', color: '#F59E0B' },
        { name: 'Fuel Price Adjustment (FPA)', amount: 1850, percentage: 7.3, description: 'NEPRA Monthly Fuel Surcharge', color: '#EF4444' },
        { name: 'Quarterly Tariff Adjustments', amount: 1450, percentage: 5.7, description: 'QTR Surcharges', color: '#8B5CF6' }
      ],
      history: [
        { month: 'Mar 2026', units: 240, billAmount: 12500 },
        { month: 'Apr 2026', units: 280, billAmount: 15800 },
        { month: 'May 2026', units: 310, billAmount: 18200 },
        { month: 'Jun 2026', units: 320, billAmount: 19820 },
        { month: 'Jul 2026', units: 385, billAmount: 25430 }
      ],
      confidence: 'High',
      isDemo: true
    }
  },
  {
    id: 'kelectric-fpa',
    name: 'K-Electric High FPA',
    provider: 'K-Electric (Karachi)',
    badge: 'Fuel Surcharge & Peak Hours',
    description: '435 units vs 410 units (+6.1% usage, but bill jumped from Rs. 28,500 to Rs. 38,900)',
    data: {
      id: 'demo-kelectric-2',
      provider: 'K-Electric',
      consumerNumber: '0400012345678',
      billingMonth: 'August 2026',
      billDate: '05-Aug-2026',
      dueDate: '17-Aug-2026',
      currentUnits: 435,
      previousUnits: 410,
      currentReading: '89120',
      previousReading: '88685',
      currentBill: 38900,
      previousBill: 28500,
      arrears: 0,
      taxes: 6850,
      adjustments: 3260,
      fuelAdjustment: 4820,
      otherCharges: [
        { label: 'K-Electric Peak Tariff Differential', amount: 1450 },
        { label: 'Sales Tax (GST 18%)', amount: 5930 },
        { label: 'KMC Utility Tax', amount: 120 }
      ],
      tariff: 'Residential Un-Protected A-1',
      summary: {
        en: 'Although your electricity consumption only increased slightly (+6.1%), your bill jumped significantly due to a heavy Fuel Price Adjustment (FPA) surcharge of Rs. 4,820 alongside K-Electric peak time differential rates.',
        ur: 'اگرچہ آپ کی بجلی کی کھپت میں صرف معمولی اضافہ (+6.1%) ہوا، لیکن فیول پرائس ایڈجسٹمنٹ (FPA) کا بھاری سرچارج 4,820 روپے اور کے الیکٹرک کے پیک ٹائم ریٹ کی وجہ سے بل میں نمایاں اضافہ ہوا۔',
        roman_ur: 'Halanke aap ki consumption sirf thori si (+6.1%) barhi, lekin heavy Fuel Price Adjustment (FPA) surcharge Rs. 4,820 aur K-Electric peak rates ki wajah se bill kafi barh gaya.'
      },
      increaseReasons: [
        {
          title: {
            en: 'Heavy Fuel Price Adjustment (FPA)',
            ur: 'بھاری فیول پرائس ایڈجسٹمنٹ',
            roman_ur: 'Heavy Fuel Price Adjustment (FPA)'
          },
          category: 'fpa',
          percentageImpact: 46.3,
          amountImpact: 4820,
          description: {
            en: 'NEPRA approved FPA surcharge of ~Rs. 11.08 per unit applied for generation cost variation.',
            ur: 'نیپرا کی جانب سے منظور شدہ فیول ایڈجسٹمنٹ 11.08 روپے فی یونٹ کے حساب سے شامل کی گئی۔',
            roman_ur: 'NEPRA FPA surcharge ~Rs. 11.08 per unit fuel generation cost ki wajah se lagaya gaya.'
          },
          severity: 'high'
        },
        {
          title: {
            en: 'Peak Time Usage Rates',
            ur: 'پیک ٹائم استعمال کے زیادہ ریٹس',
            roman_ur: 'Peak Hours Usage Differential'
          },
          category: 'tariff',
          percentageImpact: 22.0,
          amountImpact: 2290,
          description: {
            en: 'Peak hour units (6 PM - 10 PM) are billed at Rs. 41.50/unit vs off-peak rate of Rs. 33.20/unit.',
            ur: 'پیک اورز (شام 6 سے رات 10) کے یونٹس 41.50 روپے فی یونٹ پر بل کیے گئے جبکہ عام ریٹ 33.20 روپے ہے۔',
            roman_ur: 'Peak hours (6 PM - 10 PM) units Rs. 41.50/unit par charge hue jabke normal rate Rs. 33.20 hai.'
          },
          severity: 'medium'
        },
        {
          title: {
            en: 'Proportional GST Increase',
            ur: 'جی ایس ٹی میں متناسب اضافہ',
            roman_ur: 'Proportional GST Taxes'
          },
          category: 'taxes',
          percentageImpact: 18.2,
          amountImpact: 1900,
          description: {
            en: 'GST tax (18%) is applied on total charges including FPA, inflating overall tax paid.',
            ur: '18 فیصد جی ایس ٹی ایف پی اے سمیت کل رقم پر لاگو ہوتا ہے، جس سے ٹیکس بڑھ گیا۔',
            roman_ur: '18% GST tax total amount (including FPA) par lagta hai, jis se tax barh jata hai.'
          },
          severity: 'medium'
        }
      ],
      savingsSuggestions: [
        {
          title: {
            en: 'Shift Heavy Load Away From 6 PM - 10 PM',
            ur: 'شام 6 سے 10 بجے کے درمیان ہیوی لوڈ بند رکھیں',
            roman_ur: 'Shaam 6 PM se 10 PM Heavy Load Shift Karein'
          },
          applianceOrHabit: {
            en: 'Water Pumps & Electric Water Heaters',
            ur: 'واٹر پمپ اور گیزر',
            roman_ur: 'Water Motor & Heavy Appliances'
          },
          actionableStep: {
            en: 'Run water pump motors and heavy appliances before 6:00 PM or after 10:00 PM to take advantage of lower off-peak rates.',
            ur: 'پانی کی موٹر اور بھاری اشیاء شام 6 بجے سے پہلے یا رات 10 بجے کے بعد چلائیں۔',
            roman_ur: 'Water motor aur heavy appliances 6 PM se pehle ya 10 PM ke baad chalayein taake peak surcharge se bach sakein.'
          },
          potentialUnitSavings: 30,
          difficulty: 'easy'
        },
        {
          title: {
            en: 'Replace Standard Bulbs & Fans with Inverter/LED',
            ur: 'ایل ای ڈی اور انورٹر پنکھے استعمال کریں',
            roman_ur: 'LED Bulbs Aur Inverter Fans Lagayein'
          },
          applianceOrHabit: {
            en: 'Lighting & Ceiling Fans',
            ur: 'پنکھے اور لائٹس',
            roman_ur: 'Fans & Lights'
          },
          actionableStep: {
            en: 'BLDC Inverter ceiling fans use only 30W compared to conventional 80W fans, saving ~50 units monthly across 4 fans.',
            ur: 'انورٹر پنکھے صرف 30 واٹ بجلی لیتے ہیں جبکہ عام پنکھے 80 واٹ لیتے ہیں، جس سے 50 یونٹ بچ سکتے ہیں۔',
            roman_ur: 'BLDC Inverter fans sirf 30W lete hain jab ke purane fans 80W lete hain, jis se ~50 units bach sakte hain.'
          },
          potentialUnitSavings: 50,
          difficulty: 'moderate'
        }
      ],
      breakdown: [
        { name: 'Base Energy Charges', amount: 23970, percentage: 61.6, description: 'Units billed at tariff rates', color: '#10B981' },
        { name: 'Sales Tax & Government Taxes', amount: 6850, percentage: 17.6, description: '18% GST and local levies', color: '#F59E0B' },
        { name: 'Fuel Price Adjustment (FPA)', amount: 4820, percentage: 12.4, description: 'Monthly NEPRA fuel variation', color: '#EF4444' },
        { name: 'Surcharges & Duty', amount: 3260, percentage: 8.4, description: 'Peak tariff and duty surcharges', color: '#8B5CF6' }
      ],
      history: [
        { month: 'Apr 2026', units: 360, billAmount: 23400 },
        { month: 'May 2026', units: 390, billAmount: 26100 },
        { month: 'Jun 2026', units: 400, billAmount: 27200 },
        { month: 'Jul 2026', units: 410, billAmount: 28500 },
        { month: 'Aug 2026', units: 435, billAmount: 38900 }
      ],
      confidence: 'High',
      isDemo: true
    }
  },
  {
    id: 'lesco-protected-slab',
    name: 'LESCO Slab Boundary Breach',
    provider: 'LESCO (Lahore)',
    badge: 'Protected Slab Penalty',
    description: '195 units ➔ 215 units (+20 units caused bill to double from Rs. 4,800 to Rs. 9,450!)',
    data: {
      id: 'demo-lesco-3',
      provider: 'LESCO',
      consumerNumber: '08 11223 4567890 U',
      billingMonth: 'June 2026',
      billDate: '12-Jun-2026',
      dueDate: '24-Jun-2026',
      currentUnits: 215,
      previousUnits: 195,
      currentReading: '12415',
      previousReading: '12200',
      currentBill: 9450,
      previousBill: 4800,
      arrears: 0,
      taxes: 1820,
      adjustments: 750,
      fuelAdjustment: 680,
      otherCharges: [
        { label: 'Electricity Duty', amount: 110 },
        { label: 'GST (18%)', amount: 1675 },
        { label: 'TV Fee', amount: 35 }
      ],
      tariff: 'A-1a Single Phase Residential (Unprotected)',
      summary: {
        en: 'A minor increase of just 20 units pushed your total consumption past the 200-unit mark. This permanently stripped your "Protected Category" subsidy status for 6 months, almost doubling your electricity bill!',
        ur: 'صرف 20 یونٹ کے معمولی اضافے نے آپ کے کل استعمال کو 200 یونٹ کی حد سے آگے بڑھا دیا۔ اس سے آپ کا "پروٹیکٹڈ" کیٹیگری کا سبسڈی سٹیٹس ختم ہو گیا اور بل تقریباً دوگنا ہو گیا۔',
        roman_ur: 'Sirf 20 units ke izafe ne aap ki total consumption 200 units se cross karadi. Is se aap ka "Protected Category" status khatam ho gaya aur bill taqreeban double ho gaya!'
      },
      increaseReasons: [
        {
          title: {
            en: 'Loss of Protected Category Subsidy (Breached 200 Units)',
            ur: 'پروٹیکٹڈ سلیب کا خاتمہ (200 یونٹ حد پار)',
            roman_ur: 'Protected Category Status Lost (>200 Units)'
          },
          category: 'tariff',
          percentageImpact: 78.5,
          amountImpact: 3650,
          description: {
            en: 'Staying under 200 units gives you a subsidized rate of ~Rs. 13.50/unit. Crossing 200 units bumps all units to Unprotected rate of Rs. 27.50/unit!',
            ur: '200 یونٹ سے کم رہنے پر 13.50 روپے کا رعایتی ریٹ ملتا ہے۔ 200 سے اوپر جاتے ہی ریٹ 27.50 روپے فی یونٹ ہو جاتا ہے۔',
            roman_ur: '200 units se kam rehne par subsidized rate Rs. 13.50 rehta hai. 200 cross hote hi poora rate Rs. 27.50/unit ho jata hai!'
          },
          severity: 'high'
        },
        {
          title: {
            en: 'Base Consumption Increase (+20 Units)',
            ur: 'بنیادی کھپت میں اضافہ (+20 یونٹس)',
            roman_ur: 'Base Consumption Increase (+20 Units)'
          },
          category: 'consumption',
          percentageImpact: 12.0,
          amountImpact: 550,
          description: {
            en: '20 additional units used during the month.',
            ur: 'مہینے کے دوران 20 اضافی یونٹ استعمال ہوئے۔',
            roman_ur: 'Mahine ke dauran 20 extra units kharch hue.'
          },
          severity: 'medium'
        }
      ],
      savingsSuggestions: [
        {
          title: {
            en: 'CRITICAL: Keep Monthly Consumption Below 200 Units',
            ur: 'اہم: ماہانہ کھپت 200 یونٹ سے کم رکھیں',
            roman_ur: 'CRITICAL: Monthly Consumption 200 Units Se Niche Rakhein'
          },
          applianceOrHabit: {
            en: 'Slab Control Management',
            ur: 'سلیب کنٹرول',
            roman_ur: 'Slab Boundary Control'
          },
          actionableStep: {
            en: 'If you reduce just 16 units next month (staying under 200 units), your bill will drop from Rs. 9,450 down to ~Rs. 4,900, saving you nearly Rs. 4,500!',
            ur: 'اگر آپ پچھلے مہینے کی طرح صرف 16 یونٹ کم کریں گے تو آپ کا بل 9,450 کے بجائے 4,900 ہو جائے گا۔',
            roman_ur: 'Agar aap sirf 16 units kam karein (200 units se kam), toh bill Rs. 9,450 se gir kar Rs. 4,900 ho jayega!'
          },
          potentialUnitSavings: 20,
          difficulty: 'easy'
        },
        {
          title: {
            en: 'Unplug Standby Chargers & Appliances at Night',
            ur: 'رات کو غیر ضروری پلگ نکال دیں',
            roman_ur: 'Raat Ko Unused Plugs Unplug Karein'
          },
          applianceOrHabit: {
            en: 'Vampire Electronics & Chargers',
            ur: 'چارجرز اور ٹی وی سٹیٹس',
            roman_ur: 'Standby Power Load'
          },
          actionableStep: {
            en: 'TV set-top boxes, microwave displays, and plugged-in chargers consume 5-15 watts continuously, adding 8-12 units per month silently.',
            ur: 'ٹی وی باکس، مائیکروویو اور چارجر مسلسل 5-15 واٹ لیتے ہیں جو مہینے میں 8-12 یونٹ بنتے ہیں۔',
            roman_ur: 'TV set-top box aur plugged-in chargers mahine mein 8-12 units silently consume karte hain.'
          },
          potentialUnitSavings: 10,
          difficulty: 'easy'
        }
      ],
      breakdown: [
        { name: 'Base Energy Charges', amount: 6200, percentage: 65.6, description: 'Unprotected tariff rates for 215 units', color: '#10B981' },
        { name: 'Government Taxes & GST', amount: 1820, percentage: 19.3, description: 'Sales tax and duty', color: '#F59E0B' },
        { name: 'Fuel & Tariff Adjustments', amount: 1430, percentage: 15.1, description: 'FPA & QTR adjustments', color: '#EF4444' }
      ],
      history: [
        { month: 'Feb 2026', units: 170, billAmount: 3900 },
        { month: 'Mar 2026', units: 180, billAmount: 4200 },
        { month: 'Apr 2026', units: 185, billAmount: 4400 },
        { month: 'May 2026', units: 195, billAmount: 4800 },
        { month: 'Jun 2026', units: 215, billAmount: 9450 }
      ],
      confidence: 'High',
      isDemo: true
    }
  }
];
