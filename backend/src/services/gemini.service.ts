import { GoogleGenAI } from "@google/genai";
import {
  VideoGenerationResponse,
  ImageGenerationResponse,
} from "../types/index.js";
import dotenv from "dotenv";

// 1. Load environment
dotenv.config();

// 2. Debug output
console.log("Environment Variables:");
console.log(
  "- GOOGLE_GEMINI_API_KEY exists:",
  "GOOGLE_GEMINI_API_KEY" in process.env
);
console.log("- Value length:", process.env.GOOGLE_GEMINI_API_KEY?.length || 0);
console.log(
  "- Value startsWith:",
  (process.env.GOOGLE_GEMINI_API_KEY || "").slice(0, 6)
);

// 3. Initialize
const apiKey = (process.env.GOOGLE_GEMINI_API_KEY || "").trim();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

console.log("AI Client:", ai ? "✅ Initialized" : "❌ Null");

export const generateVideoWithVeo = async (
  prompt: string
): Promise<VideoGenerationResponse> => {
  if (!ai) {
    console.log("passed through here", process.env.GOOGLE_GEMINI_API_KEY, ai);
    return {
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      message: "Mock video generated successfully (no API key configured)",
    };
  }

  try {
    let operation = await ai.models.generateVideos({
      model: "veo-2.0-generate-001",
      // model: "veo-3.0-generate-preview",
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

    // Check if the error is due to billing not enabled
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (
      errorMessage.includes("billing") ||
      errorMessage.includes("FAILED_PRECONDITION")
    ) {
      console.log("Falling back to mock video due to billing error");
      return {
        videoUrl:
          "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        message:
          "Mock video generated (billing not enabled on Google Cloud account)",
      };
    }

    throw new Error("Failed to generate video: " + errorMessage);
  }
};

export const generateProductImage = async (
  prompt: string
): Promise<ImageGenerationResponse> => {
  if (!ai) {
    return {
      imageUrl: "https://picsum.photos/seed/suplimax/512",
      message: "Mock image generated successfully (no API key configured)",
    };
  }

  try {
    const response = await ai.models.generateImages({
      model: "imagen-3.0-generate-002",
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
    const base64Image = Buffer.from(imageBytes, "base64").toString("base64");

    return {
      imageUrl: `data:image/png;base64,${base64Image}`,
      message: "Image generated successfully",
    };
  } catch (error) {
    console.error("Error generating image:", error);

    // Check if the error is due to billing not enabled
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (
      errorMessage.includes("billing") ||
      errorMessage.includes("INVALID_ARGUMENT")
    ) {
      console.log("Falling back to mock image due to billing error");
      return {
        imageUrl: "https://picsum.photos/seed/suplimax/512",
        message:
          "Mock image generated (billing not enabled on Google Cloud account)",
      };
    }

    throw new Error("Failed to generate image: " + errorMessage);
  }
};
