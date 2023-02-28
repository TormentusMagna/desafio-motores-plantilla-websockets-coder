import ProductManager from '../ProductManager.js';
import { resolve } from 'path';
import __dirname from '../utils.js';

const adminProducts = new ProductManager(
  resolve(__dirname, 'data', 'productList.json')
);

const homePage = async (req, res) => {
  const products = await adminProducts.getAllProducts();
  res.render('index', {
    pageTitle: 'Home Page App Coder',
    products,
    scripts: false,
  });
};

const realtimeProducts = async (req, res) => {
  res.render('realtimeProducts', {
    pageTitle: 'Productos en tiempo real',
    scripts: true,
  });
};

export { homePage, realtimeProducts };
