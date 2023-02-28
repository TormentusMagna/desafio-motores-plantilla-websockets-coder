import CartManager from '../CartManager.js';
import { resolve } from 'path';
import __dirname from '../utils.js';

const adminCart = new CartManager(resolve(__dirname, 'data', 'carrito.json'));

// Add carts
const addCart = async (req, res) => {
  const newCart = await adminCart.addCart();
  return res.status(200).json(newCart);
};

// Get products from a specific cart
const getCartProducts = async (req, res) => {
  const { cid } = req.params;
  const products = await adminCart.getCartProducts(cid);
  if (products.msg === 'The cart not exists')
    return res.status(404).json(products);
  return res.status(200).json(products);
};

// Add products to carts
const addProductsToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const productAdded = await adminCart.addProductsToCart(cid, pid);
  if (productAdded.msg === 'The cart not exists')
    return res.status(404).json(productAdded);
  if (productAdded.msg === 'The product not exists')
    return res.status(404).json(productAdded);
  if (
    productAdded.msg ===
    'The product already exists in cart. Product quantity updated successfully'
  )
    return res.status(200).json(productAdded);
  if (productAdded.msg === 'New product added successfully to cart products')
    return res.status(200).json(productAdded);
};

export { addCart, getCartProducts, addProductsToCart };
