import { Router } from 'express';
import {
  addCart,
  getCartProducts,
  addProductsToCart,
} from '../controllers/cartControllers.js';

const router = Router();

router.post('/api/carts', addCart);

router.get('/api/carts/:cid', getCartProducts);

router.post('/:cid/product/:pid', addProductsToCart);

export default router;
