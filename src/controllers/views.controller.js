// viewsController.js
import ProductModel from '../models/Product.js';
import CartModel from '../models/Cart.js';

export default class ViewsController {
  async renderProducts(req, res, next) {
    try {
      const products = await ProductModel.find();
      res.render('products', { products });
    } catch (error) {
      next(error);
    }
  }

  async renderProductDetails(req, res, next) {
    try {
      const productId = req.params.pid;
      const product = await ProductModel.findById(productId);

      if (!product) {
        return res.status(404).send('Product not found');
      }

      res.render('productDetails', { product });
    } catch (error) {
      next(error);
    }
  }

  async renderCart(req, res, next) {
    try {
      const cartId = req.params.cid;
      const cart = await CartModel.findById(cartId).populate('products.product');

      if (!cart) {
        return res.status(404).send('Cart not found');
      }

      res.render('cart', { cart });
    } catch (error) {
      next(error);
    }
  }
}
