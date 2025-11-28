import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Try different model names - use latest stable models first
const MODELS_TO_TRY = [
  "gemini-2.5-flash", // Latest stable, fast model
  "gemini-2.0-flash", // Stable alternative
  "gemini-pro", // Classic stable model
  "gemini-1.5-pro", // Older but still supported
];

export async function generateText(prompt: string): Promise<string> {
  let lastError: Error | null = null;

  // Try each model until one works
  for (const modelName of MODELS_TO_TRY) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (text) {
        return text;
      }
    } catch (error: any) {
      lastError = error;
      console.warn(`Model ${modelName} failed:`, error.message);
      // Continue to next model
      continue;
    }
  }

  // If all models failed, throw the last error
  throw new Error(
    lastError?.message ||
      "All Gemini models failed. Please check your API key and model availability."
  );
}

// Helper function to list available models (for debugging)
export async function listAvailableModels(): Promise<string[]> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await response.json();
    return data.models?.map((m: any) => m.name) || [];
  } catch (error) {
    console.error("Failed to list models:", error);
    return [];
  }
}

