import ProductManager from '../ProductManager.js';
import { resolve } from 'path';
import __dirname from '../utils.js';

const adminProducts = new ProductManager(
  resolve(__dirname, 'data', 'productList.json')
);

// Add product
const addProduct = async (req, res) => {
  const productData = req.body;
  const productAdded = await adminProducts.addProduct(productData);
  productAdded.msg ===
  "Denied. You can't use ID property to create a new product"
    ? res.status(406).json(productAdded)
    : res.status(200).json(productAdded);
};

// Get all products
const getAllProducts = async (req, res) => {
  const { limit } = req.query;
  const products = await adminProducts.getAllProducts(limit);
  res.status(200).json(products);
};

// Get a single product
const getSingleProduct = async (req, res) => {
  const { pid } = req.params;
  const product = await adminProducts.getSingleProduct(pid);
  product.msg === 'The product not exists'
    ? res.status(404).json(product)
    : res.status(200).json(product);
};

// Update a product
const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const productData = req.body;
  const updated = await adminProducts.updateProduct(pid, productData);
  if (updated.msg === 'The product not exists')
    return res.status(404).json(updated);
  if (updated.msg === "Denied. You can't update or insert ID property")
    return res.status(406).json(updated);
  if (updated.msg === 'The product was updated successfully')
    return res.status(200).json(updated);
};

// Delete product
const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const deleted = await adminProducts.deleteProduct(pid);
  deleted.msg === 'The product not exists'
    ? res.status(404).json(deleted)
    : res.status(200).json(deleted);
};

export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
