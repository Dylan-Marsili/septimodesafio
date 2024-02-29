// carts.controller.js
import CartModel from '../models/Cart.js';
import ProductModel from '../models/Product.js';

export const createCart = async (req, res, next) => {
  try {
    const newCart = new CartModel();
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const cart = await CartModel.findById(cartId).populate('products.product');
    
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    cart.products.push({ product, quantity: 1 });
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    cart.products = cart.products.filter(item => item.product != productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;

    const cart = await CartModel.findByIdAndUpdate(cartId, req.body, { new: true });

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    const productIndex = cart.products.findIndex(item => item.product == productId);

    if (productIndex === -1) {
      return res.status(404).send('Product not found in cart');
    }

    cart.products[productIndex].quantity = newQuantity;
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid;
    const deletedCart = await CartModel.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).send('Cart not found');
    }

    res.send('Cart deleted successfully');
  } catch (error) {
    next(error);
  }
};
