import { Router } from 'express';
import { generateMarketingAssets } from '../controllers/marketing.controller.js';

const router = Router();

/**
 * @route   POST /api/marketing
 * @desc    Generate marketing video and product image
 * @access  Public
 * @body    { productName: string, features: string, tone?: string, audience?: string, style?: string }
 */
router.post('/', generateMarketingAssets);

export default router;
