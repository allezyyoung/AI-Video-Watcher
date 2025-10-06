
import { GoogleGenAI } from "@google/genai";
import { AnalysisType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptForAnalysisType = (url: string, type: AnalysisType): string => {
  const basePrompt = `As an expert video analyst, you have just 'watched' the YouTube video located at the following URL: ${url}. Based on its content, please perform the following task:`;

  switch (type) {
    case AnalysisType.SUMMARY:
      return `${basePrompt}\n\nProvide a concise, easy-to-read summary of the video. Capture the main points and the overall message. Use bullet points for key takeaways.`;
    case AnalysisType.KEY_TOPICS:
      return `${basePrompt}\n\nIdentify and list the main topics or concepts discussed in the video. For each topic, provide a brief one-sentence explanation.`;
    case AnalysisType.CHAPTERS:
       return `${basePrompt}\n\nGenerate a list of potential video chapters with timestamps. Each chapter should have a title. The format should be 'MM:SS - Chapter Title'. This is a creative task, so infer the structure and timing based on the likely flow of the video's content.`;
    default:
      throw new Error('Unknown analysis type');
  }
};

export const analyzeVideoContent = async (url: string, type: AnalysisType): Promise<string> => {
  try {
    const prompt = getPromptForAnalysisType(url, type);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get analysis from AI. Please check the console for more details.');
  }
};
