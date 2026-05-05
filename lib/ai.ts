import { GoogleGenAI } from "@google/genai";
export async function generateWithAI(prompt: string) {
 if (process.env.GEMINI_API_KEY) { const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); const res = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt }); return res.text ?? ""; }
 if (process.env.OPENAI_API_KEY) { const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-4.1-mini", input: prompt }) }); const data = await response.json(); return data.output_text ?? ""; }
 throw new Error("No AI provider configured");
}
