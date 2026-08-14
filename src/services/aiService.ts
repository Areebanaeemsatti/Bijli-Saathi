import { BillData, BillExtractedFields } from '../types/bill';
import { DEMO_PRESETS } from '../data/demoBills';

/**
 * ============================================================
 * GEMINI CONFIGURATION
 * ============================================================
 *
 * IMPORTANT:
 * We intentionally hardcode the model temporarily.
 * This prevents old localStorage / .env values from overriding
 * the model during the hackathon.
 */
const GEMINI_MODEL = 'gemini-3.1-flash-lite';

export function getStoredApiKey(): string {
  return (
    localStorage.getItem('bijli_gemini_api_key') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    ''
  );
}

export function setStoredApiKey(key: string): void {
  if (key) {
    localStorage.setItem('bijli_gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('bijli_gemini_api_key');
  }
}

/**
 * Always return the current supported model.
 *
 * We intentionally DO NOT read:
 * - bijli_gemini_model
 * - VITE_GEMINI_MODEL
 *
 * This prevents an old cached model such as
 * gemini-2.5-flash-lite from being used.
 */
export function getGeminiModel(): string {
  return GEMINI_MODEL;
}

export function setGeminiModel(_model: string): void {
  // Kept for compatibility with the existing UI.
  // We intentionally don't store a model because the app
  // should use the known working model above.
  localStorage.removeItem('bijli_gemini_model');
}

/**
 * ============================================================
 * MAIN BILL ANALYSIS FUNCTION
 * ============================================================
 */
export async function analyzeBillFile(
  file: File | null,
  presetId?: string,
  onStepProgress?: (step: number) => void
): Promise<BillData> {
  const apiKey = getStoredApiKey();

  // ----------------------------------------------------------
  // Step 1: Initialize
  // ----------------------------------------------------------
  onStepProgress?.(1);
  await delay(500);

  // ----------------------------------------------------------
  // CASE 1: DEMO PRESET
  // ----------------------------------------------------------
  if (presetId) {
    console.log('=== DEMO MODE ACTIVATED === Preset ID:', presetId);

    const preset = DEMO_PRESETS.find((p) => p.id === presetId);

    if (preset) {
      onStepProgress?.(2);
      await delay(400);

      onStepProgress?.(3);
      await delay(400);

      onStepProgress?.(4);
      await delay(400);

      onStepProgress?.(5);
      await delay(300);

      return preset.data;
    }

    throw new Error(
      'Requested demo preset bill could not be found.'
    );
  }

  // ----------------------------------------------------------
  // CASE 2: REAL FILE UPLOAD
  // ----------------------------------------------------------
  console.log('=== REAL FILE UPLOAD DETECTED ===');

  if (!file) {
    console.error('Error: File parameter is null');

    throw new Error(
      'No bill file uploaded. Please upload a clear photo or PDF of your electricity bill.'
    );
  }

  console.log('File Details:', {
    name: file.name,
    type: file.type,
    sizeBytes: file.size,
    lastModified: new Date(file.lastModified).toISOString(),
  });

  // ----------------------------------------------------------
  // API KEY CHECK
  // ----------------------------------------------------------
  if (!apiKey) {
    console.warn('Gemini API Key missing');

    throw new Error(
      'A Gemini API Key is required to analyze your uploaded bill. Please click "Add API Key" in the top navigation bar to configure your key, or use "Try Demo Bill" to explore.'
    );
  }

  console.log(
    'Gemini API Key is present (Key length:',
    apiKey.length,
    ')'
  );

  // ----------------------------------------------------------
  // Step 2: Convert file
  // ----------------------------------------------------------
  onStepProgress?.(2);
  await delay(500);

  let base64: string;

  try {
    base64 = await fileToBase64(file);

    console.log(
      'Base64 Conversion Successful. Length:',
      base64.length,
      'chars'
    );
  } catch (err: any) {
    console.error('Base64 Conversion Error:', err);

    throw new Error(
      `Failed to read bill file: ${err?.message || String(err)}`
    );
  }

  // ----------------------------------------------------------
  // Step 3: Gemini Analysis
  // ----------------------------------------------------------
  onStepProgress?.(3);

  let rawAIResult:
    | (Partial<BillData> & {
        extractedFields?: BillExtractedFields;
      })
    | null = null;

  try {
    rawAIResult = await callGeminiInteractionsAPI(
      base64,
      file.type,
      apiKey
    );
  } catch (apiError: any) {
    console.error(
      '=== GEMINI AI ANALYSIS FAILED ===',
      apiError
    );

    // NEVER silently use demo data for a real uploaded file.
    throw new Error(
      apiError?.message || String(apiError)
    );
  }

  if (!rawAIResult) {
    console.error(
      'Gemini returned null AI result object'
    );

    throw new Error(
      'Gemini AI model returned an empty extraction result.'
    );
  }

  // ----------------------------------------------------------
  // Step 4: Validate extracted information
  // ----------------------------------------------------------
  onStepProgress?.(4);
  await delay(400);

  const validatedBill = validateExtractedBillData(
    rawAIResult,
    file.name
  );

  // ----------------------------------------------------------
  // Step 5: Complete
  // ----------------------------------------------------------
  onStepProgress?.(5);
  await delay(300);

  console.log(
    '=== ANALYSIS COMPLETE & VALIDATED === Bill ID:',
    validatedBill.id
  );

  return validatedBill;
}

/**
 * ============================================================
 * UTILITY
 * ============================================================
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Convert uploaded file to pure Base64.
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      const commaIndex = result.indexOf(',');

      if (commaIndex === -1) {
        reject(
          new Error('Invalid file data format.')
        );
        return;
      }

      const base64Data = result.substring(
        commaIndex + 1
      );

      if (base64Data) {
        resolve(base64Data);
      } else {
        reject(
          new Error('File content is empty.')
        );
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}

/**
 * ============================================================
 * GEMINI INTERACTIONS API
 * ============================================================
 */
async function callGeminiInteractionsAPI(
  base64Data: string,
  mimeType: string,
  apiKey: string
): Promise<
  Partial<BillData> & {
    extractedFields?: BillExtractedFields;
  }
> {
  /**
   * IMPORTANT:
   * Never read the model from localStorage or .env here.
   */
  const cleanModelName = GEMINI_MODEL;

  console.log(
    '🔥 FINAL MODEL BEING SENT:',
    cleanModelName
  );

  // ----------------------------------------------------------
  // Normalize MIME type
  // ----------------------------------------------------------
  let cleanMimeType = (
    mimeType || ''
  ).toLowerCase();

  if (cleanMimeType.includes('pdf')) {
    cleanMimeType = 'application/pdf';
  } else if (cleanMimeType.includes('png')) {
    cleanMimeType = 'image/png';
  } else if (cleanMimeType.includes('webp')) {
    cleanMimeType = 'image/webp';
  } else if (
    cleanMimeType.includes('jpeg') ||
    cleanMimeType.includes('jpg')
  ) {
    cleanMimeType = 'image/jpeg';
  } else {
    throw new Error(
      `Unsupported file type: ${mimeType}`
    );
  }

  // ----------------------------------------------------------
  // AI PROMPT
  // ----------------------------------------------------------
  const systemPrompt = `
You are a highly precise OCR and document parsing AI specifically engineered for Pakistani electricity bills.

Supported providers include:

- IESCO
- K-Electric
- LESCO
- FESCO
- MEPCO
- PESCO
- HESCO
- SEPCO
- GEPCO

IMPORTANT:
The uploaded electricity bill is your ONLY source of truth.

DO NOT guess.
DO NOT invent numbers.
DO NOT estimate missing numbers.
DO NOT use example numbers from this prompt.

Every numeric value must come directly from a clearly visible field on the uploaded bill.

============================================================
CRITICAL FIELD RULES
============================================================

1. CONSUMER NUMBER

A consumer/reference/account number is an identifier.

It is NEVER the bill amount.

Do not confuse long reference numbers with PKR amounts.

------------------------------------------------------------

2. ELECTRICITY UNITS

Units consumed must come from:

- Units Consumed
- Units
- Consumption
- or Present Reading minus Previous Reading

If both meter readings are clearly visible:

Units Consumed =
Present Reading - Previous Reading

Do not report the meter reading itself as units.

For example:

Present Reading = 45890
Previous Reading = 45745

Then:

Units Consumed = 145

------------------------------------------------------------

3. BILL AMOUNT

Prefer these labels:

- PAYABLE WITHIN DUE DATE
- NET AMOUNT PAYABLE
- CURRENT BILL
- AMOUNT PAYABLE

Do NOT confuse:

- Consumer number
- Meter number
- Reference number
- Tariff code
- Previous balance
- Arrears

with the current bill amount.

------------------------------------------------------------

4. ARREARS

Arrears or previous balance represent unpaid previous amounts.

Do not include arrears as current consumption charges.

------------------------------------------------------------

5. TAXES

Taxes may include:

- GST
- Electricity Duty
- TV Fee
- GST on electricity
- Other government taxes

Do not report the entire bill as taxes.

------------------------------------------------------------

6. ADJUSTMENTS

Look for:

- FPA
- FCA
- QTR adjustment
- Tariff adjustment
- Fuel adjustment
- Other adjustments

Only extract them if clearly visible.

------------------------------------------------------------

7. MISSING VALUES

If a field is not visible or cannot be read confidently:

"value": null

"sourceLabel": "Not found on bill"

"confidence": 0.0

NEVER INVENT A VALUE.

============================================================
RETURN ONLY VALID JSON
============================================================

Return exactly this structure:

{
  "extractedFields": {
    "provider": {
      "value": "IESCO",
      "sourceLabel": "COMPANY HEADER",
      "confidence": 0.95
    },
    "consumerNumber": {
      "value": "14 12345 6789012 U",
      "sourceLabel": "REFERENCE NO / CONSUMER NO",
      "confidence": 0.95
    },
    "billingMonth": {
      "value": "JUL 26",
      "sourceLabel": "BILLING MONTH",
      "confidence": 0.90
    },
    "currentBill": {
      "value": 3450,
      "currency": "PKR",
      "sourceLabel": "PAYABLE WITHIN DUE DATE",
      "confidence": 0.95
    },
    "amountPayable": {
      "value": 3450,
      "currency": "PKR",
      "sourceLabel": "NET AMOUNT PAYABLE",
      "confidence": 0.95
    },
    "currentUnits": {
      "value": 145,
      "sourceLabel": "UNITS CONSUMED",
      "confidence": 0.90
    },
    "previousUnits": {
      "value": null,
      "sourceLabel": "PREVIOUS UNITS",
      "confidence": 0.0
    },
    "currentReading": {
      "value": "45890",
      "sourceLabel": "PRESENT READING",
      "confidence": 0.90
    },
    "previousReading": {
      "value": "45745",
      "sourceLabel": "PREVIOUS READING",
      "confidence": 0.90
    },
    "dueDate": {
      "value": "22-Jul-2026",
      "sourceLabel": "DUE DATE",
      "confidence": 0.90
    },
    "arrears": {
      "value": 0,
      "currency": "PKR",
      "sourceLabel": "ARREARS / PREVIOUS BALANCE",
      "confidence": 0.90
    },
    "taxes": {
      "value": 520,
      "currency": "PKR",
      "sourceLabel": "TOTAL TAXES & DUTIES",
      "confidence": 0.85
    },
    "adjustments": {
      "value": 150,
      "currency": "PKR",
      "sourceLabel": "TARIFF ADJUSTMENT",
      "confidence": 0.80
    },
    "fuelAdjustment": {
      "value": 340,
      "currency": "PKR",
      "sourceLabel": "FPA / FUEL ADJUSTMENT",
      "confidence": 0.85
    }
  },

  "tariff": "A-1a Residential",

  "summary": {
    "en": "Short English summary based ONLY on the uploaded bill.",
    "ur": "صرف اپ لوڈ کیے گئے بل کی بنیاد پر اردو خلاصہ۔",
    "roman_ur": "Sirf uploaded bill ki bunyaad par Roman Urdu khulasa."
  }
}

IMPORTANT:
The example values above are ONLY examples of the structure.

DO NOT copy them.

Extract the actual values from the uploaded bill.

Return ONLY valid JSON.
Do not use markdown.
Do not wrap the JSON in triple backticks.
`;

  // ----------------------------------------------------------
  // INTERACTIONS API ENDPOINT
  // ----------------------------------------------------------
  const interactionsUrl =
    'https://generativelanguage.googleapis.com/v1beta/interactions';

  console.log(
    '[INTERACTIONS API REQUEST]',
    {
      endpoint: interactionsUrl,
      model: cleanModelName,
      mimeType: cleanMimeType
    }
  );

  console.log(
    '[API KEY VERIFIED] Authentication Header x-goog-api-key length:',
    apiKey.length
  );

  // ----------------------------------------------------------
  // CREATE FILE INPUT
  // ----------------------------------------------------------
  let fileInput:
    | {
        type: 'image';
        mime_type: string;
        data: string;
      }
    | {
        type: 'document';
        mime_type: 'application/pdf';
        data: string;
      };

  if (cleanMimeType.startsWith('image/')) {
    fileInput = {
      type: 'image',
      mime_type: cleanMimeType,
      data: base64Data
    };
  } else if (
    cleanMimeType === 'application/pdf'
  ) {
    fileInput = {
      type: 'document',
      mime_type: 'application/pdf',
      data: base64Data
    };
  } else {
    throw new Error(
      `Unsupported file type: ${cleanMimeType}`
    );
  }

  // ----------------------------------------------------------
  // REQUEST PAYLOAD
  // ----------------------------------------------------------
  const payload = {
    model: cleanModelName,

    input: [
      {
        type: 'text',
        text: systemPrompt
      },
      fileInput
    ],

    response_format: {
      type: 'text',
      mime_type: 'application/json'
    }
  };

  console.log(
    '🔥 FINAL MODEL BEING SENT:',
    payload.model
  );

  console.log(
    '🔥 FILE INPUT TYPE:',
    fileInput.type
  );

  // ----------------------------------------------------------
  // API REQUEST
  // ----------------------------------------------------------
  const response = await fetch(
    interactionsUrl,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },

      body: JSON.stringify(payload)
    }
  );

  console.log(
    '[INTERACTIONS API RESPONSE]',
    {
      model: cleanModelName,
      status: response.status,
      statusText: response.statusText
    }
  );

  // ----------------------------------------------------------
  // HANDLE API ERROR
  // ----------------------------------------------------------
  if (!response.ok) {
    const errorResponseBody =
      await response.text();

    console.error(
      '[INTERACTIONS API ERROR]',
      `HTTP ${response.status}:`,
      errorResponseBody
    );

    throw new Error(
      `Gemini Interactions API Error (HTTP ${response.status}): ${errorResponseBody}`
    );
  }

  // ----------------------------------------------------------
  // PARSE RESPONSE
  // ----------------------------------------------------------
  const jsonResponse =
    await response.json();

  console.log(
    '[INTERACTIONS API SUCCESS] Response:',
    jsonResponse
  );

  // ----------------------------------------------------------
  // EXTRACT MODEL TEXT
  // ----------------------------------------------------------
  const rawText =
    extractTextFromGeminiResponse(
      jsonResponse
    );

  if (!rawText) {
    console.error(
      '[INTERACTIONS API WARNING] Empty response text:',
      JSON.stringify(jsonResponse)
    );

    throw new Error(
      `Gemini model ${cleanModelName} returned an empty response.`
    );
  }

  console.log(
    '[INTERACTIONS API RAW TEXT]',
    rawText.substring(0, 500)
  );

  // ----------------------------------------------------------
  // CLEAN JSON
  // ----------------------------------------------------------
  const cleanedText =
    rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/gi, '')
      .trim();

  // ----------------------------------------------------------
  // PARSE JSON
  // ----------------------------------------------------------
  try {
    const parsed =
      JSON.parse(cleanedText);

    console.log(
      '[JSON PARSE SUCCESS] Extracted Fields Keys:',
      Object.keys(
        parsed.extractedFields || {}
      )
    );

    return parsed;
  } catch (jsonErr: any) {
    console.error(
      '[JSON PARSE ERROR]:',
      jsonErr.message
    );

    console.error(
      'Unparseable text:',
      cleanedText.substring(0, 1000)
    );

    throw new Error(
      `Failed to parse AI JSON response: ${jsonErr.message}`
    );
  }
}

/**
 * ============================================================
 * RESPONSE TEXT EXTRACTION
 * ============================================================
 *
 * Handles the current Interactions API `steps` response.
 *
 * Also supports older response structures so the app remains
 * resilient.
 */
function extractTextFromGeminiResponse(
  data: any
): string | null {
  if (!data) {
    return null;
  }

  // ----------------------------------------------------------
  // CURRENT INTERACTIONS API
  // steps -> model_output -> content -> text
  // ----------------------------------------------------------
  if (Array.isArray(data.steps)) {
    const modelOutputSteps =
      data.steps.filter(
        (step: any) =>
          step?.type === 'model_output'
      );

    for (
      let i = modelOutputSteps.length - 1;
      i >= 0;
      i--
    ) {
      const step =
        modelOutputSteps[i];

      if (
        Array.isArray(step.content)
      ) {
        const textBlocks =
          step.content.filter(
            (item: any) =>
              item?.type === 'text' &&
              typeof item.text === 'string'
          );

        if (textBlocks.length > 0) {
          return textBlocks
            .map(
              (item: any) =>
                item.text
            )
            .join('');
        }
      }
    }
  }

  // ----------------------------------------------------------
  // CURRENT API - output_text style
  // ----------------------------------------------------------
  if (
    typeof data.output_text ===
    'string'
  ) {
    return data.output_text;
  }

  // ----------------------------------------------------------
  // LEGACY OUTPUTS FORMAT
  // ----------------------------------------------------------
  if (Array.isArray(data.outputs)) {
    for (
      let i = data.outputs.length - 1;
      i >= 0;
      i--
    ) {
      const output =
        data.outputs[i];

      if (
        output?.type === 'text' &&
        typeof output.text === 'string'
      ) {
        return output.text;
      }
    }

    const firstText =
      data.outputs.find(
        (output: any) =>
          typeof output?.text ===
          'string'
      );

    if (firstText) {
      return firstText.text;
    }
  }

  // ----------------------------------------------------------
  // LEGACY GEMINI GENERATE CONTENT FORMAT
  // ----------------------------------------------------------
  if (
    data.candidates?.[0]
      ?.content?.parts?.[0]
      ?.text
  ) {
    return data.candidates[0]
      .content.parts[0].text;
  }

  // ----------------------------------------------------------
  // OTHER POSSIBLE RESPONSE
  // ----------------------------------------------------------
  if (
    data.response?.candidates?.[0]
      ?.content?.parts?.[0]?.text
  ) {
    return data.response
      .candidates[0]
      .content.parts[0].text;
  }

  if (
    typeof data.text === 'string'
  ) {
    return data.text;
  }

  return null;
}

/**
 * ============================================================
 * VALIDATION
 * ============================================================
 */
function validateExtractedBillData(
  rawAI: Partial<BillData> & {
    extractedFields?: BillExtractedFields;
  },
  fileName: string
): BillData {
  const fields =
    rawAI.extractedFields ||
    createDefaultExtractedFields();

  // ----------------------------------------------------------
  // 1. Calculate units from meter readings
  // ----------------------------------------------------------
  let currentUnitsVal =
    fields.currentUnits?.value ?? null;

  let currentUnitsConf =
    fields.currentUnits?.confidence ?? 0;

  let currentUnitsLabel =
    fields.currentUnits?.sourceLabel ||
    'UNITS CONSUMED';

  const presReadingNum =
    parseInt(
      fields.currentReading?.value || '',
      10
    );

  const prevReadingNum =
    parseInt(
      fields.previousReading?.value || '',
      10
    );

  if (
    !isNaN(presReadingNum) &&
    !isNaN(prevReadingNum) &&
    presReadingNum > prevReadingNum
  ) {
    const readingDiffUnits =
      presReadingNum -
      prevReadingNum;

    if (
      readingDiffUnits > 0 &&
      readingDiffUnits < 5000
    ) {
      /**
       * If the model's extracted units disagree
       * significantly with the meter calculation,
       * use the mathematically verifiable value.
       */
      if (
        currentUnitsVal === null ||
        Math.abs(
          currentUnitsVal -
            readingDiffUnits
        ) > 5
      ) {
        currentUnitsVal =
          readingDiffUnits;

        currentUnitsConf = 0.95;

        currentUnitsLabel =
          `Calculated: Present Reading (${presReadingNum}) - Previous Reading (${prevReadingNum})`;
      } else {
        currentUnitsConf = 1.0;
      }
    }
  }

  // ----------------------------------------------------------
  // 2. Reject obviously invalid unit values
  // ----------------------------------------------------------
  if (
    currentUnitsVal !== null &&
    (
      currentUnitsVal > 10000 ||
      currentUnitsVal < 0
    )
  ) {
    currentUnitsVal = null;
    currentUnitsConf = 0;

    currentUnitsLabel =
      'Uncertain: Invalid extracted unit value';
  }

  // ----------------------------------------------------------
  // 3. Current bill validation
  // ----------------------------------------------------------
  let currentBillVal =
    fields.currentBill?.value ??
    fields.amountPayable?.value ??
    null;

  let currentBillConf =
    fields.currentBill?.confidence ??
    fields.amountPayable?.confidence ??
    0;

  let currentBillLabel =
    fields.currentBill?.sourceLabel ||
    fields.amountPayable?.sourceLabel ||
    'PAYABLE WITHIN DUE DATE';

  if (
    currentBillVal !== null &&
    (
      currentBillVal < 0 ||
      currentBillVal > 5000000
    )
  ) {
    currentBillVal = null;
    currentBillConf = 0;

    currentBillLabel =
      'Uncertain: Invalid bill amount';
  }

  // ----------------------------------------------------------
  // Validated fields
  // ----------------------------------------------------------
  const validatedFields: BillExtractedFields =
    {
      provider:
        fields.provider ||
        {
          value:
            'Electricity Provider',
          sourceLabel:
            'COMPANY LOGO',
          confidence: 0.5
        },

      consumerNumber:
        fields.consumerNumber ||
        {
          value:
            'Not found',
          sourceLabel:
            'REFERENCE NO',
          confidence: 0.5
        },

      billingMonth:
        fields.billingMonth ||
        {
          value:
            'Current Month',
          sourceLabel:
            'BILLING MONTH',
          confidence: 0.8
        },

      currentBill: {
        value:
          currentBillVal !== null
            ? currentBillVal
            : null,

        currency: 'PKR',

        sourceLabel:
          currentBillLabel,

        confidence:
          currentBillConf,

        isUncertain:
          currentBillConf < 0.45 ||
          currentBillVal === null
      },

      amountPayable: {
        value:
          fields.amountPayable?.value ??
          currentBillVal ??
          null,

        currency: 'PKR',

        sourceLabel:
          fields.amountPayable
            ?.sourceLabel ||
          currentBillLabel,

        confidence:
          fields.amountPayable
            ?.confidence ??
          currentBillConf,

        isUncertain:
          currentBillConf < 0.45
      },

      currentUnits: {
        value:
          currentUnitsVal !== null &&
          currentUnitsVal > 0
            ? currentUnitsVal
            : null,

        sourceLabel:
          currentUnitsLabel,

        confidence:
          currentUnitsConf,

        isUncertain:
          currentUnitsConf < 0.45 ||
          currentUnitsVal === null
      },

      previousUnits:
        fields.previousUnits ||
        {
          value: null,
          sourceLabel:
            'PREVIOUS UNITS',
          confidence: 0
        },

      currentReading:
        fields.currentReading ||
        {
          value: 'Not found',
          sourceLabel:
            'PRESENT READING',
          confidence: 0
        },

      previousReading:
        fields.previousReading ||
        {
          value: 'Not found',
          sourceLabel:
            'PREVIOUS READING',
          confidence: 0
        },

      dueDate:
        fields.dueDate ||
        {
          value:
            'As per bill',
          sourceLabel:
            'DUE DATE',
          confidence: 0.5
        },

      arrears:
        fields.arrears ||
        {
          value: 0,
          currency: 'PKR',
          sourceLabel:
            'ARREARS',
          confidence: 0.5
        },

      taxes:
        fields.taxes ||
        {
          value: 0,
          currency: 'PKR',
          sourceLabel:
            'TOTAL TAXES',
          confidence: 0.5
        },

      adjustments:
        fields.adjustments ||
        {
          value: 0,
          currency: 'PKR',
          sourceLabel:
            'ADJUSTMENTS',
          confidence: 0.5
        },

      fuelAdjustment:
        fields.fuelAdjustment ||
        {
          value: 0,
          currency: 'PKR',
          sourceLabel:
            'FPA SURCHARGE',
          confidence: 0.5
        }
    };

  // ----------------------------------------------------------
  // Use actual extracted values.
  // DO NOT invent previous units/bill amounts.
  // ----------------------------------------------------------
  const currentUnitsNum =
    validatedFields.currentUnits
      .value || 0;

  const previousUnitsNum =
    validatedFields.previousUnits
      .value || 0;

  const currentBillNum =
    validatedFields.currentBill
      .value || 0;

  const previousBillNum =
    0;

  const unitDiff =
    currentUnitsNum -
    previousUnitsNum;

  // ----------------------------------------------------------
  // Confidence
  // ----------------------------------------------------------
  const confidenceValues = [
    currentBillConf,
    currentUnitsConf
  ].filter(
    (value) =>
      typeof value === 'number'
  );

  const avgConfidence =
    confidenceValues.length > 0
      ? confidenceValues.reduce(
          (sum, value) =>
            sum + value,
          0
        ) /
        confidenceValues.length
      : 0;

  const overallConfidenceLevel:
    | 'High'
    | 'Medium'
    | 'Estimated' =
    avgConfidence >= 0.8
      ? 'High'
      : avgConfidence >= 0.45
      ? 'Medium'
      : 'Estimated';

  const providerName =
    validatedFields.provider
      .value ||
    'Electricity Provider';

  const monthName =
    validatedFields.billingMonth
      .value ||
    'Billing Month';

  // ----------------------------------------------------------
  // Calculate real breakdown percentages
  // ----------------------------------------------------------
  const taxesAmount =
    validatedFields.taxes
      .value || 0;

  const fuelAmount =
    validatedFields.fuelAdjustment
      .value || 0;

  const energyAmount =
    Math.max(
      0,
      currentBillNum -
        taxesAmount -
        fuelAmount
    );

  const breakdownTotal =
    energyAmount +
    taxesAmount +
    fuelAmount;

  const energyPercentage =
    breakdownTotal > 0
      ? Math.round(
          (energyAmount /
            breakdownTotal) *
            100
        )
      : 0;

  const taxesPercentage =
    breakdownTotal > 0
      ? Math.round(
          (taxesAmount /
            breakdownTotal) *
            100
        )
      : 0;

  const fuelPercentage =
    breakdownTotal > 0
      ? Math.max(
          0,
          100 -
            energyPercentage -
            taxesPercentage
        )
      : 0;

  // ----------------------------------------------------------
  // Return final BillData
  // ----------------------------------------------------------
  return {
    id:
      'uploaded-real-' +
      Date.now(),

    provider:
      providerName,

    consumerNumber:
      validatedFields
        .consumerNumber
        .value ||
      'Not available on uploaded bill',

    billingMonth:
      monthName,

    billDate:
      'As per bill',

    dueDate:
      validatedFields.dueDate
        .value ||
      'As per bill',

    currentUnits:
      currentUnitsNum,

    previousUnits:
      previousUnitsNum,

    currentReading:
      validatedFields
        .currentReading
        .value ||
      'Not available',

    previousReading:
      validatedFields
        .previousReading
        .value ||
      'Not available',

    currentBill:
      currentBillNum,

    previousBill:
      previousBillNum,

    arrears:
      validatedFields
        .arrears
        .value || 0,

    taxes:
      taxesAmount,

    adjustments:
      validatedFields
        .adjustments
        .value || 0,

    fuelAdjustment:
      fuelAmount,

    otherCharges: [
      {
        label:
          'Sales Tax (GST)',
        amount:
          taxesAmount
      }
    ],

    tariff:
      rawAI.tariff ||
      'Residential Tariff',

    summary: {
      en:
        `Extracted ${providerName} bill for ${monthName}: Current bill is Rs. ${
          currentBillNum > 0
            ? currentBillNum.toLocaleString()
            : 'Not found'
        }. ${
          currentUnitsNum > 0
            ? `Consumption is ${currentUnitsNum} units.`
            : 'Units could not be verified.'
        } File: ${fileName}.`,

      ur:
        `${providerName} کا بل: موجودہ بل ${
          currentBillNum > 0
            ? currentBillNum.toLocaleString()
            : 'دستیاب نہیں'
        } روپے۔ ${
          currentUnitsNum > 0
            ? `بجلی کی کھپت ${currentUnitsNum} یونٹس ہے۔`
            : 'یونٹس کی تصدیق نہیں ہو سکی۔'
        }`,

      roman_ur:
        `${providerName} bill: Current bill Rs. ${
          currentBillNum > 0
            ? currentBillNum.toLocaleString()
            : 'not found'
        }. ${
          currentUnitsNum > 0
            ? `Consumption ${currentUnitsNum} units hai.`
            : 'Units verify nahi ho sakay.'
        }`
    },

    increaseReasons:
      currentUnitsNum > 0
        ? [
            {
              title: {
                en:
                  `Consumption (${currentUnitsNum} Units)`,

                ur:
                  `کھپت (${currentUnitsNum} یونٹس)`,

                roman_ur:
                  `Consumption (${currentUnitsNum} Units)`
              },

              category:
                'consumption',

              percentageImpact:
                previousUnitsNum > 0
                  ? Math.round(
                      (unitDiff /
                        previousUnitsNum) *
                        100
                    )
                  : 0,

              amountImpact:
                previousUnitsNum > 0
                  ? Math.abs(
                      Math.round(
                        unitDiff * 28
                      )
                    )
                  : 0,

              description: {
                en:
                  `Extracted directly from ${fileName}: ${currentUnitsNum} units (${validatedFields.currentUnits.sourceLabel}).`,

                ur:
                  `بل کی فائل سے نکلے یونٹس: ${currentUnitsNum} یونٹس۔`,

                roman_ur:
                  `Units extracted from file: ${currentUnitsNum} units.`
              },

              severity:
                'medium'
            }
          ]
        : [],

    savingsSuggestions: [
      {
        title: {
          en:
            'Monitor Appliance Usage & AC Load',

          ur:
            'ای سی اور بجلی کا بوجھ کنٹرول کریں',

          roman_ur:
            'AC load aur appliances monitor karein'
        },

        applianceOrHabit: {
          en:
            'Heavy Household Appliances',

          ur:
            'بجلی کے آلات',

          roman_ur:
            'Heavy appliances'
        },

        actionableStep: {
          en:
            'Optimize appliance run-time and avoid unnecessary usage during peak hours.',

          ur:
            'بھاری بجلی کے آلات کا غیر ضروری استعمال کم کریں۔',

          roman_ur:
            'Heavy appliances ka unnecessary use kam karein.'
        },

        potentialUnitSavings:
          currentUnitsNum > 0
            ? Math.round(
                currentUnitsNum *
                  0.15
              )
            : 0,

        difficulty:
          'easy'
      }
    ],

    breakdown: [
      {
        name:
          'Energy Charges',

        amount:
          energyAmount,

        percentage:
          energyPercentage,

        description:
          'Base electricity charges',

        color:
          '#10B981'
      },

      {
        name:
          'Taxes & Levies',

        amount:
          taxesAmount,

        percentage:
          taxesPercentage,

        description:
          'GST & Electricity Duty',

        color:
          '#F59E0B'
      },

      {
        name:
          'Fuel Adjustment (FPA)',

        amount:
          fuelAmount,

        percentage:
          fuelPercentage,

        description:
          'Fuel Adjustment',

        color:
          '#EF4444'
      }
    ],

    history: [
      {
        month:
          monthName,

        units:
          currentUnitsNum,

        billAmount:
          currentBillNum
      }
    ],

    confidence:
      overallConfidenceLevel,

    extractedFields:
      validatedFields,

    isDemo:
      false
  };
}

/**
 * ============================================================
 * DEFAULT EMPTY EXTRACTION
 * ============================================================
 */
function createDefaultExtractedFields(): BillExtractedFields {
  return {
    provider: {
      value:
        'Pakistani DISCO',

      sourceLabel:
        'HEADER LOGO',

      confidence:
        0.5
    },

    consumerNumber: {
      value:
        'Not available',

      sourceLabel:
        'REFERENCE NO',

      confidence:
        0.5
    },

    billingMonth: {
      value:
        'Current Month',

      sourceLabel:
        'BILLING MONTH',

      confidence:
        0.5
    },

    currentBill: {
      value:
        null,

      currency:
        'PKR',

      sourceLabel:
        'PAYABLE WITHIN DUE DATE',

      confidence:
        0,

      isUncertain:
        true
    },

    amountPayable: {
      value:
        null,

      currency:
        'PKR',

      sourceLabel:
        'AMOUNT PAYABLE',

      confidence:
        0,

      isUncertain:
        true
    },

    currentUnits: {
      value:
        null,

      sourceLabel:
        'UNITS CONSUMED',

      confidence:
        0,

      isUncertain:
        true
    },

    previousUnits: {
      value:
        null,

      sourceLabel:
        'PREVIOUS UNITS',

      confidence:
        0
    },

    currentReading: {
      value:
        'Not found',

      sourceLabel:
        'PRESENT READING',

      confidence:
        0
    },

    previousReading: {
      value:
        'Not found',

      sourceLabel:
        'PREVIOUS READING',

      confidence:
        0
    },

    dueDate: {
      value:
        'As per bill',

      sourceLabel:
        'DUE DATE',

      confidence:
        0.5
    },

    arrears: {
      value:
        0,

      currency:
        'PKR',

      sourceLabel:
        'ARREARS',

      confidence:
        0.5
    },

    taxes: {
      value:
        0,

      currency:
        'PKR',

      sourceLabel:
        'TOTAL TAXES',

      confidence:
        0.5
    },

    adjustments: {
      value:
        0,

      currency:
        'PKR',

      sourceLabel:
        'ADJUSTMENTS',

      confidence:
        0.5
    },

    fuelAdjustment: {
      value:
        0,

      currency:
        'PKR',

      sourceLabel:
        'FPA SURCHARGE',

      confidence:
        0.5
    }
  };
}