import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@env";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function askGemini(prompt) {
  try {
    // ✅ this model works with v1 API
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text;
  } catch (error) {
    console.error("Gemini error:", error);
    if (error.message?.includes("404")) {
      return "⚠️ Model not found. Please check your API key or update to the latest Gemini SDK.";
    }
    if (error.message?.includes("API key")) {
      return "⚠️ Invalid or missing API key. Please verify your .env setup.";
    }
    return "Sorry, I couldn’t connect to Gemini right now.";
  }
}
