// carts.router.js
import express from 'express';
import * as cartsController from '../controllers/carts.controller.js';

const router = express.Router();

// Rutas de carritos
router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCartById);
router.post('/:cid/products/:pid', cartsController.addProductToCart);
router.delete('/:cid/products/:pid', cartsController.removeProductFromCart);
router.put('/:cid', cartsController.updateCart);
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);
router.delete('/:cid', cartsController.deleteCart);

export default router;
