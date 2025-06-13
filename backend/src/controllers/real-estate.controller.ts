import { Request, Response, NextFunction } from 'express';
import { RealEstateRequest } from '../types/index.js';
import { generateVideoWithVeo } from '../services/gemini.service.js';

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

    const prompt = `Create a ${style} virtual tour video for the property at ${address} 
      priced at ${price}. It has ${bedrooms} bedrooms, ${bathrooms} bathrooms 
      and ${squareFootage} sq ft. Highlight these features: ${features}.`;

    const result = await generateVideoWithVeo(prompt);
    
    res.json({
      ...result,
      prompt,
    });
  } catch (error) {
    next(error);
  }
};
