import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";

// Load environment variables from .env file if present
dotenv.config();

const PORT = process.env.PORT || 4000;
const GOOGLE_API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

if (!GOOGLE_API_KEY) {
  console.warn(
    "[Backend] GOOGLE_GEMINI_API_KEY not set. The server will respond with mock video URLs."
  );
}

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google GenAI client if API key is available
const ai = GOOGLE_API_KEY ? new GoogleGenAI({ apiKey: GOOGLE_API_KEY }) : null;

// ========================================================================= //
// Helper – Generate marketing video using Gemini Veo 2.0
// ========================================================================= //
async function generateVideoWithVeo(prompt) {
  if (!ai) {
    return {
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      message: "Mock video generated successfully (no API key configured)",
    };
  }

  try {
    // Start video generation operation
    let operation = await ai.models.generateVideos({
      model: "veo-2.0-generate-001",
      prompt,
      config: {
        aspectRatio: "16:9",
        personGeneration: "dont_allow",
      },
    });

    // Poll operation until completion (every 10 seconds)
    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({
        operation: operation,
      });
    }

    // Get the first generated video URL
    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!videoUri) {
      throw new Error("No video generated");
    }

    // Append API key to the video URI for access
    return {
      videoUrl: `${videoUri}&key=${GOOGLE_API_KEY}`,
      message: "Video generated successfully",
    };
  } catch (error) {
    console.error("[Veo Error]", error);
    throw new Error("Video generation failed: " + error.message);
  }
}

// ========================================================================= //
// Helper – Generate product image using Gemini Flash
// ========================================================================= //
async function generateProductImage(prompt) {
  if (!ai) {
    return {
      imageUrl: "https://picsum.photos/seed/suplimax/512",
      message: "Mock image generated successfully (no API key configured)",
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract image from response
    const candidate = response.candidates?.[0];
    if (!candidate) {
      throw new Error("No candidate in response");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        // Create data URL for direct embedding
        return {
          imageUrl: `data:image/png;base64,${part.inlineData.data}`,
          message: "Image generated successfully",
        };
      }
    }

    throw new Error("No image found in response");
  } catch (error) {
    console.error("[Image Gen Error]", error);
    throw new Error("Image generation failed: " + error.message);
  }
}

// ========================================================================= //
// Routes
// ========================================================================= //

/**
 * POST /api/marketing
 * Body: { productName, features, tone, audience, style }
 */
app.post("/api/marketing", async (req, res) => {
  try {
    const { productName, features, tone, audience, style } = req.body;

    if (!productName || !features) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1) Generate product image
    const imagePrompt = `High-resolution studio product shot of a sleek energy-drink can. 
                         Label reads '${productName}' in bold modern font. 
                         Vibrant colors, white background.`;

    const { imageUrl } = await generateProductImage(imagePrompt);

    // 2) Generate video using Veo 2.0
    const videoPrompt = `Create a ${tone} marketing video in ${style} style for ${productName}. 
                         Target audience: ${audience}. 
                         Highlight these features: ${features}. 
                         Show the product with "${productName}" clearly visible.`;

    const videoResult = await generateVideoWithVeo(videoPrompt);

    res.json({
      ...videoResult,
      imageUrl,
      prompt: videoPrompt,
    });
  } catch (err) {
    console.error("[Marketing Error]", err.message);
    res.status(500).json({
      error: "Failed to generate marketing content",
      details: err.message,
    });
  }
});

/**
 * POST /api/real-estate
 * Body: { address, price, bedrooms, bathrooms, squareFootage, features, style }
 */
app.post("/api/real-estate", async (req, res) => {
  try {
    const {
      address,
      price,
      bedrooms,
      bathrooms,
      squareFootage,
      features,
      style,
    } = req.body;

    if (!address || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `Create a ${style} virtual tour video for the property at ${address} 
                    priced at ${price}. It has ${bedrooms} bedrooms, ${bathrooms} bathrooms 
                    and ${squareFootage} sq ft. Highlight these features: ${features}.`;

    const result = await generateVideoWithVeo(prompt);

    res.json({
      ...result,
      prompt,
    });
  } catch (err) {
    console.error("[Real Estate Error]", err.message);
    res.status(500).json({
      error: "Failed to generate real estate video",
      details: err.message,
    });
  }
});

// Simple health-check endpoint
app.get("/ping", (_req, res) => res.send("pong"));

// ========================================================================= //
// Start server
// ========================================================================= //
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
