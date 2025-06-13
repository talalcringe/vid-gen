import { Request, Response, NextFunction } from 'express';
import { MarketingRequest } from '../types/index.js';
import { generateProductImage, generateVideoWithVeo } from '../services/gemini.service.js';

export const generateMarketingAssets = async (
  req: Request<{}, {}, MarketingRequest>,
  res: Response,
  next: NextFunction
) => {
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
    const imageUrl = imageResult.imageUrl;

    // 2) Generate marketing video
    const videoPrompt = `Create a ${tone} marketing video for ${productName} that highlights: ${features}. 
      The video should be in a ${style} style and target ${audience}. 
      Focus on showing the product in use and its benefits.`;
      
    const videoResult = await generateVideoWithVeo(videoPrompt);

    res.json({
      ...videoResult,
      imageUrl,
      prompt: videoPrompt,
    });
  } catch (error) {
    next(error);
  }
};
