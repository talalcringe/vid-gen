import { GoogleGenAI } from "@google/genai";
import { VideoGenerationResponse, ImageGenerationResponse } from "../types/index.js";

// Initialize Google GenAI client
const ai = process.env.GOOGLE_GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY })
  : null;

export const generateVideoWithVeo = async (prompt: string): Promise<VideoGenerationResponse> => {
  if (!ai) {
    return {
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      message: "Mock video generated successfully (no API key configured)",
    };
  }

  try {
    let operation = await ai.models.generateVideos({
      model: "veo-2.0-generate-001",
      prompt: prompt,
      config: {
        personGeneration: "dont_allow",
        aspectRatio: "16:9",
      },
    });

    // Poll operation until completion (every 5 seconds)
    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({
        operation: operation,
      });
    }

    // Get the first generated video URL
    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    
    if (!videoUri) {
      throw new Error("No video URL returned from the API");
    }

    // Append API key to the video URI for access
    return {
      videoUrl: `${videoUri}&key=${process.env.GOOGLE_GEMINI_API_KEY}`,
      message: "Video generated successfully",
    };
  } catch (error) {
    console.error("Error generating video:", error);
    throw new Error("Failed to generate video: " + (error instanceof Error ? error.message : String(error)));
  }
};

export const generateProductImage = async (prompt: string): Promise<ImageGenerationResponse> => {
  if (!ai) {
    return {
      imageUrl: "https://picsum.photos/seed/suplimax/512",
      message: "Mock image generated successfully (no API key configured)",
    };
  }

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    const generatedImage = response.generatedImages?.[0];
    
    if (!generatedImage?.image?.imageBytes) {
      throw new Error("No image data returned from the API");
    }

    // Convert base64 to data URL
    const imageBytes = generatedImage.image.imageBytes;
    const base64Image = Buffer.from(imageBytes, 'base64').toString('base64');
    
    return {
      imageUrl: `data:image/png;base64,${base64Image}`,
      message: "Image generated successfully",
    };
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image: " + (error instanceof Error ? error.message : String(error)));
  }
};
