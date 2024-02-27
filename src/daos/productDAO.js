// productDAO.js
import ProductModel from '../models/Product.js';

export const getAllProducts = async () => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await ProductModel.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const newProduct = new ProductModel(productData);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedData, { new: true });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
