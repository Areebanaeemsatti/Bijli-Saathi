// src/services/aiService.ts

export interface BillAnalysisResult {
  consumerNumber: string;
  billMonth: string;
  dueDate: string;
  issueDate: string;
  tariff: string;
  unitsConsumed: number;
  previousReading: number;
  currentReading: number;
  totalAmount: number;
  payableAmount: number;
  taxes: number;
  surcharges: number;
  fuelAdjustment: number;
  arrears: number;
  billStatus: string;
  meterNumber: string;
  consumerName: string;
  confidence: number;
  explanation: string;
  recommendations: string[];
  rawText?: string;
}

const DEFAULT_MODEL = "gemini-3.1-flash-lite";

export function getGeminiModel(): string {
  return localStorage.getItem("bijli_gemini_model") || DEFAULT_MODEL;
}

export function setGeminiModel(model: string): void {
  localStorage.setItem("bijli_gemini_model", model);
}

/**
 * Analyze an uploaded electricity bill.
 *
 * The Gemini API key is NOT used in the browser.
 * The frontend sends the bill to /api/analyze-bill,
 * and the Vercel backend handles Gemini authentication.
 */
export async function analyzeBillFile(
  file: File
): Promise<BillAnalysisResult> {
  console.log("=== REAL FILE UPLOAD DETECTED ===");

  console.log("File Details:", {
    name: file.name,
    type: file.type,
    sizeBytes: file.size
  });

  if (!file) {
    throw new Error("No bill file was provided.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Unsupported file type. Please upload a JPG, PNG, WEBP image or PDF."
    );
  }

  try {
    const base64 = await fileToBase64(file);

    console.log("[FILE CONVERSION SUCCESS]");

    const rawAIResult = await callGeminiInteractionsAPI(
      base64,
      file.type
    );

    console.log("[GEMINI ANALYSIS SUCCESS]");

    return rawAIResult;
  } catch (error) {
    console.error("=== GEMINI AI ANALYSIS FAILED ===", error);

    throw error instanceof Error
      ? error
      : new Error("Unable to analyze the electricity bill.");
  }
}

/**
 * Convert uploaded file to base64 without the data URL prefix.
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = reader.result;

        if (typeof result !== "string") {
          reject(new Error("Unable to read uploaded file."));
          return;
        }

        const base64 = result.includes(",")
          ? result.split(",")[1]
          : result;

        resolve(base64);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read uploaded file."));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Calls our Vercel backend.
 *
 * IMPORTANT:
 * No Gemini API key exists in this function.
 */
async function callGeminiInteractionsAPI(
  base64Data: string,
  mimeType: string
): Promise<BillAnalysisResult> {
  const cleanModelName = getGeminiModel().replace(/^models\//, "");

  const cleanMimeType = mimeType.toLowerCase();

  console.log("[BACKEND API REQUEST]", {
    endpoint: "/api/analyze-bill",
    model: cleanModelName,
    mimeType: cleanMimeType
  });

  const systemPrompt = `
You are Bijli Saathi, an AI assistant designed to understand Pakistani electricity bills.

Analyze the uploaded electricity bill carefully.

Extract information directly from the bill.
DO NOT invent values.
If a value is not visible or cannot be determined confidently, use null.

Pay special attention to:

- Consumer name
- Consumer number
- Reference number
- Meter number
- Bill month
- Issue date
- Due date
- Tariff
- Previous meter reading
- Current meter reading
- Units consumed
- Electricity charges
- Taxes
- GST
- TV fee
- Fuel price adjustment
- Quarterly tariff adjustment
- Surcharges
- Arrears
- Other charges
- Total bill amount
- Amount payable
- Bill status

Explain the bill in simple language that an ordinary Pakistani electricity consumer can understand.

Return ONLY valid JSON.

Use exactly this structure:

{
  "consumerNumber": "",
  "billMonth": "",
  "dueDate": "",
  "issueDate": "",
  "tariff": "",
  "unitsConsumed": 0,
  "previousReading": 0,
  "currentReading": 0,
  "totalAmount": 0,
  "payableAmount": 0,
  "taxes": 0,
  "surcharges": 0,
  "fuelAdjustment": 0,
  "arrears": 0,
  "billStatus": "",
  "meterNumber": "",
  "consumerName": "",
  "confidence": 0,
  "explanation": "",
  "recommendations": []
}

Rules:

1. Never fabricate numbers.
2. Preserve the exact bill values whenever possible.
3. Units consumed should represent the actual units used during the billing period.
4. PreviousReading and currentReading must come from the meter readings printed on the bill.
5. totalAmount should represent the total bill amount.
6. payableAmount should represent the amount actually payable according to the bill.
7. taxes should include identifiable taxes and government charges.
8. surcharges should include identifiable surcharges.
9. fuelAdjustment should represent fuel price adjustment if present.
10. arrears should represent previous outstanding amounts if present.
11. confidence should be a number from 0 to 1.
12. recommendations should contain short, useful suggestions for the consumer.
13. Return JSON only. Do not use markdown.
`;

  try {
    const response = await fetch("/api/analyze-bill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: cleanModelName,
        systemPrompt,
        base64Data,
        mimeType: cleanMimeType
      })
    });

    console.log("[BACKEND API RESPONSE]", {
      status: response.status,
      statusText: response.statusText
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "[BACKEND API ERROR]",
        errorText
      );

      throw new Error(
        `Bill analysis failed (HTTP ${response.status}): ${errorText}`
      );
    }

    const jsonResponse = await response.json();

    console.log("[BACKEND API SUCCESS]");

    const rawText = extractTextFromGeminiResponse(jsonResponse);

    if (!rawText) {
      throw new Error(
        "Gemini returned an empty analysis."
      );
    }

    console.log("[JSON RESPONSE RECEIVED]");

    const parsedResult = parseGeminiJSON(rawText);

    const validatedResult =
      validateBillAnalysis(parsedResult);

    return {
      ...validatedResult,
      rawText
    };
  } catch (error) {
    console.error(
      "[INTERACTIONS API ERROR]",
      error
    );

    throw error instanceof Error
      ? error
      : new Error(
          "Failed to analyze electricity bill."
        );
  }
}

/**
 * Extract model text from the Gemini generateContent response.
 *
 * Response shape:
 * {
 *   candidates: [
 *     { content: { parts: [ { text: "..." } ] } }
 *   ]
 * }
 */
function extractTextFromGeminiResponse(
  response: any
): string {
  if (!response) {
    return "";
  }

  // Standard generateContent format
  if (Array.isArray(response.candidates)) {
    for (const candidate of response.candidates) {
      const parts = candidate?.content?.parts;

      if (Array.isArray(parts)) {
        const combined = parts
          .map((part: any) =>
            typeof part?.text === "string"
              ? part.text
              : ""
          )
          .join("");

        if (combined) {
          return combined;
        }
      }
    }
  }

  return "";
}

/**
 * Parse JSON even if Gemini accidentally wraps it in markdown.
 */
function parseGeminiJSON(
  rawText: string
): any {
  let cleaned = rawText.trim();

  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (
      firstBrace !== -1 &&
      lastBrace !== -1 &&
      lastBrace > firstBrace
    ) {
      const possibleJSON = cleaned.slice(
        firstBrace,
        lastBrace + 1
      );

      try {
        return JSON.parse(possibleJSON);
      } catch {
        // Continue to error below
      }
    }

    throw new Error(
      "Gemini returned invalid JSON."
    );
  }
}

/**
 * Validate and normalize bill analysis.
 */
function validateBillAnalysis(
  data: any
): BillAnalysisResult {
  if (!data || typeof data !== "object") {
    throw new Error(
      "Invalid bill analysis returned by AI."
    );
  }

  const numberOrZero = (value: any): number => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return 0;
    }

    const number = Number(value);

    return Number.isFinite(number)
      ? number
      : 0;
  };

  const stringOrEmpty = (value: any): string => {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value);
  };

  const recommendations = Array.isArray(
    data.recommendations
  )
    ? data.recommendations.map((item: any) =>
        String(item)
      )
    : [];

  return {
    consumerNumber:
      stringOrEmpty(data.consumerNumber),

    billMonth:
      stringOrEmpty(data.billMonth),

    dueDate:
      stringOrEmpty(data.dueDate),

    issueDate:
      stringOrEmpty(data.issueDate),

    tariff:
      stringOrEmpty(data.tariff),

    unitsConsumed:
      numberOrZero(data.unitsConsumed),

    previousReading:
      numberOrZero(data.previousReading),

    currentReading:
      numberOrZero(data.currentReading),

    totalAmount:
      numberOrZero(data.totalAmount),

    payableAmount:
      numberOrZero(data.payableAmount),

    taxes:
      numberOrZero(data.taxes),

    surcharges:
      numberOrZero(data.surcharges),

    fuelAdjustment:
      numberOrZero(data.fuelAdjustment),

    arrears:
      numberOrZero(data.arrears),

    billStatus:
      stringOrEmpty(data.billStatus),

    meterNumber:
      stringOrEmpty(data.meterNumber),

    consumerName:
      stringOrEmpty(data.consumerName),

    confidence:
      Math.min(
        1,
        Math.max(
          0,
          numberOrZero(data.confidence)
        )
      ),

    explanation:
      stringOrEmpty(data.explanation),

    recommendations
  };
}
