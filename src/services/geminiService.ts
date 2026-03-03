import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function explainAnswer(question: string, userAnswer: string, correctAnswer: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain why the correct answer to the following English exercise is "${correctAnswer}". 
      The user answered "${userAnswer}". 
      Question: ${question}
      Provide a clear, concise explanation in Vietnamese for a 9th-grade student preparing for the 10th-grade entrance exam.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Không thể lấy giải thích từ AI lúc này. Vui lòng thử lại sau.";
  }
}

export async function generateMoreExercises(type: string, count: number = 5) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate ${count} English exercises for 10th-grade entrance exam preparation in Vietnam. 
      Type: ${type}.
      Format: JSON array of objects with properties: id, type, question, options (if applicable), correctAnswer, explanation, category.
      Ensure the difficulty is appropriate for the entrance exam.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
