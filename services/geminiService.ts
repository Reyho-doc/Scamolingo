
import { GoogleGenAI } from "@google/genai";

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

export const isApiKeyAvailable = (): boolean => {
  return ai !== null;
};

export const analyzeTextForScam = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return "Please enter some text to analyze.";
  }

  if (!ai) {
    return "AI analysis is not available. The administrator needs to configure the API key to enable scam detection features.";
  }

  try {
    const prompt = `
      You are a cybersecurity expert specializing in scam detection.
      Analyze the following text and determine if it is likely a scam.
      Your response should be in Markdown format.
      Start with a clear verdict in bold: **Likely a Scam**, **Potentially a Scam**, or **Likely Legitimate**.
      Then, provide a concise, bulleted list explaining the specific red flags or positive indicators you found in the text.
      Do not add any preamble or conclusion outside of this structure.

      Text to analyze:
      ---
      ${text}
      ---
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing text with Gemini API:", error);
    return "Sorry, an error occurred while analyzing the text. Please check your connection and API key, then try again.";
  }
};

export const analyzeUrlForScam = async (url: string): Promise<string> => {
  if (!url.trim()) {
    return "Please enter a URL to analyze.";
  }

  if (!ai) {
    return "AI analysis is not available. The administrator needs to configure the API key to enable scam detection features.";
  }

  try {
    new URL(url);
  } catch (_) {
    return "Please enter a valid URL (e.g., https://example.com).";
  }

  try {
    const prompt = `
      You are a cybersecurity expert specializing in scam and phishing detection.
      Analyze the following URL and determine if the website it points to is likely a scam or malicious.
      Your response should be in Markdown format.
      Start with a clear verdict in bold: **Likely a Scam**, **Potentially a Scam**, or **Likely Legitimate**.
      Then, provide a concise, bulleted list explaining the specific red flags or positive indicators you found in the URL structure.
      Consider the domain, subdomains, TLD, path, and any query parameters. Look for signs of impersonation, urgency, or obfuscation.
      Do not add any preamble or conclusion outside of this structure.

      URL to analyze:
      ---
      ${url}
      ---
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing URL with Gemini API:", error);
    return "Sorry, an error occurred while analyzing the URL. Please check your connection and API key, then try again.";
  }
};
