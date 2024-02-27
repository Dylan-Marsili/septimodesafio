// views.router.js
import express from 'express';
import * as viewsController from '../controllers/viewsController.js';

const router = express.Router();

// Rutas de vistas
router.get('/products', viewsController.renderProductList);
router.get('/products/:pid', viewsController.renderProductDetails);
router.get('/carts/:cid', viewsController.renderCartDetails);

export default router;
