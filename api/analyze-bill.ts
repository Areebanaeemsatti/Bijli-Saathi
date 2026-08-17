import type {
  VercelRequest,
  VercelResponse
} from "@vercel/node";

const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error(
        "GEMINI_API_KEY is missing"
      );

      return res.status(500).json({
        error:
          "Gemini API key is not configured on the server."
      });
    }

    const {
      model,
      systemPrompt,
      base64Data,
      mimeType
    } = req.body;

    if (
      !model ||
      !systemPrompt ||
      !base64Data ||
      !mimeType
    ) {
      return res.status(400).json({
        error:
          "Missing required bill analysis data."
      });
    }

    const cleanMimeType =
      String(mimeType).toLowerCase();

    const cleanModel =
      String(model).replace(
        /^models\//,
        ""
      );

    if (
      !cleanMimeType.startsWith(
        "image/"
      ) &&
      cleanMimeType !==
        "application/pdf"
    ) {
      return res.status(400).json({
        error:
          `Unsupported file type: ${cleanMimeType}`
      });
    }

    // Gemini generateContent request shape:
    // contents -> parts (text + inline_data with base64)
    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: systemPrompt
            },
            {
              inline_data: {
                mime_type:
                  cleanMimeType,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType:
          "application/json"
      }
    };

    const geminiUrl =
      `${GEMINI_BASE_URL}/${cleanModel}:generateContent`;

    console.log(
      "[SERVER] Calling Gemini:",
      cleanModel
    );

    const response =
      await fetch(geminiUrl, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
          "x-goog-api-key":
            apiKey
        },

        body: JSON.stringify(
          payload
        )
      });

    const responseText =
      await response.text();

    if (!response.ok) {
      console.error(
        "[GEMINI ERROR]",
        responseText
      );

      return res.status(
        response.status
      ).json({
        error: responseText
      });
    }

    let data;

    try {
      data =
        JSON.parse(responseText);
    } catch {
      return res.status(500).json({
        error:
          "Gemini returned invalid JSON."
      });
    }

    return res.status(200).json(
      data
    );
  } catch (error) {
    console.error(
      "[SERVER ERROR]",
      error
    );

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Unexpected server error."
    });
  }
}
