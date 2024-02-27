// cartDAO.js
import CartModel from '../models/Cart.js';

const CartDAO = {
  async createCart(products) {
    const newCart = new CartModel({ products });
    await newCart.save();
    return newCart;
  },

  async getCartById(cartId) {
    const cart = await CartModel.findById(cartId);
    return cart;
  },

  async updateCart(cartId, updatedProducts) {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { products: updatedProducts },
      { new: true }
    );
    return cart;
  },

  async deleteCart(cartId) {
    const cart = await CartModel.findByIdAndDelete(cartId);
    return cart;
  },
};

export default CartDAO;
