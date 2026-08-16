import type {
  VercelRequest,
  VercelResponse
} from "@vercel/node";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/interactions";

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

    let fileInput;

    if (
      cleanMimeType.startsWith(
        "image/"
      )
    ) {
      fileInput = {
        type: "image",
        mime_type: cleanMimeType,
        data: base64Data
      };
    } else if (
      cleanMimeType ===
      "application/pdf"
    ) {
      fileInput = {
        type: "document",
        mime_type:
          "application/pdf",
        data: base64Data
      };
    } else {
      return res.status(400).json({
        error:
          `Unsupported file type: ${cleanMimeType}`
      });
    }

    const payload = {
      model: cleanModel,

      input: [
        {
          type: "text",
          text: systemPrompt
        },
        fileInput
      ],

      response_format: {
        type: "text",
        mime_type:
          "application/json"
      }
    };

    console.log(
      "[SERVER] Calling Gemini:",
      cleanModel
    );

    const response =
      await fetch(GEMINI_URL, {
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