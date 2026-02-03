
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

export const generateWallpaper = async (
  prompt: string,
  aspectRatio: AspectRatio,
  referenceImageBase64: string | null = null
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents: any = {
    parts: [
      { text: prompt }
    ]
  };

  if (referenceImageBase64) {
    // For editing/remixing, provide the image as the first part
    contents.parts.unshift({
      inlineData: {
        data: referenceImageBase64.split(',')[1] || referenceImageBase64,
        mimeType: 'image/png'
      }
    });
    contents.parts.push({ text: "Use this image as a style and composition reference for the new generation." });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents,
    config: {
      imageConfig: {
        aspectRatio
      }
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data returned from API");
};
