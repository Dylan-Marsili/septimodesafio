// views.router.js
import { Router } from 'express';
import viewsControllerr from '../controllers/views.controller.js';

const viewsRouter = Router();

const viewsController = new viewsControllerr()

viewsRouter.get('/products', viewsController.renderProducts);
viewsRouter.get('/products/:pid', viewsController.renderProductDetails);
viewsRouter.get('/cart/:cid', viewsController.renderCart);

export default viewsRouter;
