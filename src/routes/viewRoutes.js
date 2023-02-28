import { Router } from 'express';
import { homePage, realtimeProducts } from '../controllers/viewControllers.js';

const router = Router();

router.get('/', homePage);

router.get('/realtimeproducts', realtimeProducts);

export default router;
