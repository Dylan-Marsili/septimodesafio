// products.router.js
import express from 'express';
import * as productsController from '../controllers/productsController.js';

const router = express.Router();

// Rutas de productos
router.get('/', productsController.getAllProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:pid', productsController.updateProduct);
router.delete('/:pid', productsController.deleteProduct);

export default router;
