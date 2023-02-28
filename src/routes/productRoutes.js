import { Router } from 'express';
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:pid', getSingleProduct);

router.route('/api/products').get(getAllProducts).post(addProduct);

router
  .route('/api/products/:pid')
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
