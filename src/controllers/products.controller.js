// productsController.js
import Product from '../models/Product.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await Product.findById(productId);

    if (product) {
      res.render('productDetails', { product });
    } else {
      res.status(404).render('error', { message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.render('productDetails', { product: newProduct, message: 'Product created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (updatedProduct) {
      res.render('product-details', { product: updatedProduct, message: 'Product updated successfully' });
    } else {
      res.status(404).render('error', { message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.render('products', { message: 'Product deleted successfully' });
    } else {
      res.status(404).render('error', { message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};
