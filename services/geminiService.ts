import { GoogleGenAI, Type } from "@google/genai";
import { Language, MedicineInfo, DosageInfo } from '../types';
import { fileToBase64 } from "../utils/fileUtils";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const medicineInfoSchema = {
  type: Type.OBJECT,
  properties: {
    composition: {
      type: Type.STRING,
      description: "The major active ingredient(s) of the medicine.",
    },
    uses: {
      type: Type.STRING,
      description: "The common medical uses and conditions the medicine treats.",
    },
    sideEffects: {
      type: Type.STRING,
      description: "Important but simple side effects people should be aware of.",
    },
    timeToTake: {
      type: Type.STRING,
      description: "General guidance on when to take the medicine (e.g., morning, after meals).",
    },
    disclaimer: {
        type: Type.STRING,
        description: "The exact disclaimer text: 'Educational use only. Always consult a doctor before use.'",
    },
    safetyInCondition: {
        type: Type.STRING,
        description: "Information regarding the medicine's safety for the specified condition. This field should only be included if a condition is provided in the prompt."
    }
  },
  required: ["composition", "uses", "sideEffects", "timeToTake", "disclaimer"],
};

const dosageInfoSchema = {
    type: Type.OBJECT,
    properties: {
        dosageSuggestion: {
            type: Type.STRING,
            description: "The calculated dosage suggestion (e.g., '5ml every 6 hours'). If a safe dosage cannot be determined, state that clearly and advise consulting a doctor."
        },
        reasoning: {
            type: Type.STRING,
            description: "A brief, simple explanation of the standard guideline used for the calculation (e.g., 'Based on a standard of 15mg per kg of body weight for children.')."
        },
        importantNotes: {
            type: Type.STRING,
            description: "Crucial safety notes, such as the maximum daily dose or other important warnings (e.g., 'Do not exceed 4 doses in 24 hours.')."
        },
        disclaimer: {
            type: Type.STRING,
            description: "The exact disclaimer text: 'IMPORTANT: This is an AI-generated estimate and NOT a medical prescription. Dosage can vary based on individual health conditions. ALWAYS consult a qualified doctor or pharmacist before administering any medication.'"
        }
    },
    required: ["dosageSuggestion", "reasoning", "importantNotes", "disclaimer"],
};

const languageMap: Record<Language, string> = {
    [Language.ENGLISH]: 'English',
    [Language.HINDI]: 'Hindi',
    [Language.URDU]: 'Urdu',
};

export async function getMedicineNameFromImage(imageFile: File): Promise<string> {
  const base64Image = await fileToBase64(imageFile);
  const imagePart = {
    inlineData: {
      mimeType: imageFile.type,
      data: base64Image,
    },
  };
  const textPart = {
    text: "Identify the medicine in this image. Return only its brand name or generic name as a single, clean line of plain text. Do not add any extra formatting or explanation.",
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text.trim();
}

export async function getMedicineInfo(
  query: string,
  language: Language,
  imageFile: File | null,
  condition: string
): Promise<MedicineInfo> {
  const langName = languageMap[language];
  let prompt = '';
  const parts: any[] = [];
  const hasCondition = condition && condition.trim().length > 0;
  
  if (language === Language.HINDI) {
      prompt += "Translate the content into simple, common, and easily understandable Hindi, avoiding complex medical terms. ";
  }

  if (imageFile) {
    const base64Image = await fileToBase64(imageFile);
    parts.push({
      inlineData: {
        mimeType: imageFile.type,
        data: base64Image,
      },
    });
    prompt += `Identify the medicine in this image (likely "${query}") and provide a professional, simple, and easy-to-understand explanation in ${langName}.`;
  } else {
    prompt += `Provide a professional, simple, and easy-to-understand explanation for the medicine "${query}" in ${langName}.`;
  }
  
  if (hasCondition) {
      prompt += ` Also, specifically address its safety for someone with this condition: "${condition}".`;
  }

  parts.push({ text: prompt });

  const systemInstruction = `You are an AI medical guide. Your response must be structured as a JSON object adhering to the provided schema. Always include these sections: 'Composition', 'Uses', 'Major Side Effects', 'Recommended Time to Take'. The 'Disclaimer' section must contain this exact text: "Educational use only. Always consult a doctor before use." If a specific medical condition is mentioned by the user, you must also provide information in the 'safetyInCondition' field. If responding in Hindi or Urdu, translate this disclaimer and all other content as well.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: parts },
    config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: medicineInfoSchema
    }
  });

  try {
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as MedicineInfo;
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:", response.text);
    throw new Error("The AI returned an invalid response format.");
  }
}

export async function getDosageInfo(
  medicineName: string,
  age: number,
  weight: number
): Promise<DosageInfo> {
  const prompt = `Calculate the recommended dosage for the medicine "${medicineName}" for a person who is ${age} years old and weighs ${weight} kg. Provide the information based on standard, publicly available medical guidelines. If the medicine is not appropriate for the age/weight, or if a safe dosage cannot be confidently determined, state this clearly in the dosageSuggestion field.`;

  const systemInstruction = `You are an AI medical assistant providing dosage estimations. Your response must be structured as a JSON object adhering to the provided schema. Prioritize safety above all. The 'disclaimer' field must contain the exact, verbatim text provided in the schema. Do not invent dosages; if standard guidelines are not available for the specific query, explicitly state that the information cannot be provided and a doctor must be consulted.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: prompt }] },
    config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: dosageInfoSchema
    }
  });

  try {
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as DosageInfo;
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON for dosage:", response.text);
    throw new Error("The AI returned an invalid response format for the dosage calculation.");
  }
}
