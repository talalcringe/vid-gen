import { Request, Response, NextFunction } from 'express';
import { RealEstateRequest } from '../types/index.js';
import { generateVideoWithVeo } from '../services/gemini.service.js';
import { generateRealEstateVideoPrompt } from '../utils/prompts.js';

export const generateRealEstateTour = async (
  req: Request<{}, {}, RealEstateRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      address,
      price,
      bedrooms = '3',
      bathrooms = '2',
      squareFootage = '2000',
      features = 'spacious living area',
      style = 'modern'
    } = req.body;

    if (!address || !price) {
      res.status(400).json({ error: "Missing required fields: address and price are required" });
      return;
    }

    const prompt = generateRealEstateVideoPrompt({
      address,
      price,
      bedrooms,
      bathrooms,
      squareFootage,
      features,
      style
    });

    const result = await generateVideoWithVeo(prompt);
    
    res.json({
      ...result,
      prompt,
    });
  } catch (error) {
    next(error);
  }
};
