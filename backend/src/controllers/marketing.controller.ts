import { Request, Response, NextFunction } from 'express';
import { MarketingRequest } from '../types/index.js';
import { generateProductImage, generateVideoWithVeo } from '../services/gemini.service.js';
import { 
  generateMarketingImagePrompt, 
  generateMarketingVideoPrompt 
} from '../utils/prompts.js';

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

    // 1) Generate product image for "Suplimax"
    const imagePrompt = generateMarketingImagePrompt();
    const imageResult = await generateProductImage(imagePrompt);
    const imageUrl = imageResult.imageUrl;

    // 2) Generate marketing video
    const videoPrompt = generateMarketingVideoPrompt({
      features,
      tone,
      audience,
      style
    });
      
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
