
import { GoogleGenAI } from "@google/genai";
import { CV_DATA } from "./constants";

// Correctly initialize with a named parameter and direct process.env.API_KEY usage
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askKevinAI = async (query: string) => {
  const context = `
    Eres el asistente virtual de Kevin Valcárcel Estévez. Tu objetivo es responder preguntas sobre su trayectoria profesional basándote únicamente en su currículum:
    Nombre: ${CV_DATA.name}
    Resumen: ${CV_DATA.summary}
    Contacto: ${CV_DATA.email}, ${CV_DATA.phone}, ${CV_DATA.location}
    Idiomas: ${CV_DATA.languages.map(l => `${l.name} (${l.level})`).join(', ')}
    Trayectoria en Fisioterapia: ${CV_DATA.experience.filter(e => e.category === 'Fisioterapia').map(e => `${e.role} en ${e.company} (${e.period})`).join('; ')}
    Trayectoria en Educación: ${CV_DATA.experience.filter(e => e.category === 'Profesorado').map(e => `${e.role} en ${e.company} (${e.period})`).join('; ')}
    Otras actividades: ${CV_DATA.experience.filter(e => e.category === 'Otros').map(e => `${e.role} en ${e.company} (${e.period})`).join('; ')}
    Habilidades Blandas: ${CV_DATA.softSkills.join(', ')}
    Habilidades Técnicas: ${CV_DATA.techSkills.map(s => s.name).join(', ')}
    Estilo Didáctico: ${CV_DATA.teachingStyles.map(s => s.name).join(', ')}

    Responde de forma amable, profesional y breve (máximo 3 frases). Si te preguntan algo fuera de este contexto, di que solo puedes hablar sobre la carrera profesional de Kevin.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: context,
        temperature: 0.7,
        // When setting maxOutputTokens, a thinkingBudget must be provided for Gemini 3 models
        maxOutputTokens: 250,
        thinkingConfig: { thinkingBudget: 100 }
      }
    });

    // Directly access .text property from GenerateContentResponse
    return response.text || "Lo siento, no pude procesar tu pregunta.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con el asistente de IA.";
  }
};
