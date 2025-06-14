import { Router } from 'express';
import { generateRealEstateTour } from '../controllers/real-estate.controller.js';

const router = Router();

/**
 * @route   POST /api/real-estate
 * @desc    Generate real estate virtual tour video
 * @access  Public
 * @body    { 
 *   address: string, 
 *   price: string, 
 *   bedrooms?: string, 
 *   bathrooms?: string, 
 *   squareFootage?: string, 
 *   features?: string, 
 *   style?: string 
 * }
 */
router.post('/', generateRealEstateTour);

export default router;
