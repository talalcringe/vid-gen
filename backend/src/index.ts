import express, { Request, Response, NextFunction, Application, RequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";

// Types
interface VideoGenerationResponse {
  videoUrl: string;
  message: string;
}

interface ImageGenerationResponse {
  imageUrl: string;
  message: string;
}

interface MarketingRequest {
  productName: string;
  features: string;
  tone?: string;
  audience?: string;
  style?: string;
}

interface RealEstateRequest {
  address: string;
  price: string;
  bedrooms?: string;
  bathrooms?: string;
  squareFootage?: string;
  features?: string;
  style?: string;
}

interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}

// Load environment variables from .env file if present
dotenv.config();

const PORT = process.env.PORT || 4000;
const GOOGLE_API_KEY = process.env.GOOGLE_GEMINI_API_KEY || "";

if (!GOOGLE_API_KEY) {
  console.warn(
    "[Backend] GOOGLE_GEMINI_API_KEY not set. The server will respond with mock video URLs."
  );
}



const app: Application = express();
app.use(cors());
app.use(express.json());

// Initialize Google GenAI client if API key is available
const ai = GOOGLE_API_KEY ? new GoogleGenAI({ apiKey: GOOGLE_API_KEY }) : null;

// ========================================================================= //
// Helper – Generate marketing video using Gemini Veo 2.0
// ========================================================================= //
async function generateVideoWithVeo(prompt: string): Promise<VideoGenerationResponse> {
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
        operation: operation as any, // Type assertion needed due to SDK types
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
    throw new Error(`Video generation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// ========================================================================= //
// Helper – Generate product image using Gemini Flash
// ========================================================================= //
async function generateProductImage(prompt: string): Promise<ImageGenerationResponse> {
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
    if (!candidate || !candidate.content?.parts) {
      throw new Error("No candidate or content in response");
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
    throw new Error(`Image generation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
};

// ========================================================================= //
// Routes
// ========================================================================= //

/**
 * POST /api/marketing
 * Body: { productName, features, tone, audience, style }
 */
const marketingHandler = async (
  req: Request<{}, {}, MarketingRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productName, features, tone = 'professional', audience = 'general', style = 'modern' } = req.body;

    if (!productName || !features) {
      res.status(400).json({ error: "Missing required fields: productName and features are required" });
      return;
    }

    // 1) Generate product image
    const imagePrompt = `High-resolution studio product shot of a sleek energy-drink can. 
                       Label reads '${productName}' in bold modern font. 
                       Vibrant colors, white background.`;

    const imageResult = await generateProductImage(imagePrompt);

    // 2) Generate video using Veo 2.0
    const videoPrompt = `Create a ${tone} marketing video in ${style} style for ${productName}. 
                          Target audience: ${audience}. 
                          Highlight these features: ${features}. 
                          Show the product with "${productName}" clearly visible.`;

    const videoResult = await generateVideoWithVeo(videoPrompt);

    res.json({
      ...videoResult,
      imageUrl: imageResult.imageUrl,
      prompt: videoPrompt,
    });
  } catch (err) {
    next(err);
  }
};

app.post("/api/marketing", (req, res, next) => marketingHandler(req, res, next));

/**
 * POST /api/real-estate
 * Body: { address, price, bedrooms, bathrooms, squareFootage, features, style }
 */
const realEstateHandler = async (
  req: Request<{}, {}, RealEstateRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      address,
      price,
      bedrooms = 'N/A',
      bathrooms = 'N/A',
      squareFootage = 'N/A',
      features = 'N/A',
      style = 'professional'
    } = req.body;

    if (!address || !price) {
      res.status(400).json({ error: "Missing required fields: address and price are required" });
      return;
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
    next(err);
  }
};

app.post("/api/real-estate", (req, res, next) => realEstateHandler(req, res, next));

// Simple health-check endpoint
app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

// Error handling middleware
app.use(errorHandler);

// ========================================================================= //
// Start server
// ========================================================================= //
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
