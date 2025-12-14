import { GoogleGenAI } from "@google/genai";
import { Project, Experience, Technology, Language } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize carefully to avoid crashes if env is missing in some environments,
// though we expect it to be present.
const ai = new GoogleGenAI({ apiKey });

export const chatWithPortfolio = async (
  history: { role: string; parts: { text: string }[] }[],
  userMessage: string,
  contextData: { projects: Project[], experience: Experience[], skills: Technology[] },
  lang: Language
): Promise<string> => {
  if (!apiKey) return lang === 'zh' ? "錯誤：缺少 API 金鑰。" : "Error: API Key is missing. I cannot process your request.";

  const langContext = lang === 'zh' 
    ? "You must reply in Traditional Chinese (Taiwan standard)." 
    : "You must reply in English.";

  const systemInstruction = `
    You are the AI Digital Twin of Alex Dev, a Senior Software Engineer.
    You are embedded in their portfolio website.
    ${langContext}
    
    Context about Alex:
    Skills: ${contextData.skills.map(s => s.name).join(', ')}
    Experience: ${JSON.stringify(contextData.experience)}
    Projects: ${JSON.stringify(contextData.projects)}

    Your Goal: Answer questions about Alex's experience, coding style, and projects clearly and professionally.
    Tone: Technical, confident, concise, slightly informal (engineer-to-engineer).
    
    Rules:
    - Keep answers under 100 words unless asked for detail.
    - Use technical terminology where appropriate.
    - If asked about something not in the context, say "I don't have that info in my logs, but Alex is always learning." (translate this to Chinese if lang is zh).
  `;

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
      history: history // Pass existing history
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || (lang === 'zh' ? "無回應。" : "No response generated.");
  } catch (error) {
    console.error("Gemini Chat Failed:", error);
    return lang === 'zh' ? "連線錯誤。我的神經連結暫時中斷。" : "Connection error. My neural link is temporarily down.";
  }
};