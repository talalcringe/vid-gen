import { Request, Response, NextFunction } from "express";
import { generateVideoWithVeo } from "../services/gemini.service.js";
import { generateRealEstateVideoPrompt } from "../utils/prompts.js";

export const generateRealEstateTour = async (
  req: Request<{}, {}, { style?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Per the assignment, we must use the exact property listing from the PDF.
    // We only allow the 'style' to be customized via the request body.
    const { style } = req.body;

    // The prompt function uses the hardcoded Beverly Hills property details by default.
    // We pass the optional 'style' from the request to allow for customization.
    const prompt = generateRealEstateVideoPrompt({ style });

    const result = await generateVideoWithVeo(prompt);

    res.json({
      ...result,
      prompt,
    });
  } catch (error) {
    next(error);
  }
};
