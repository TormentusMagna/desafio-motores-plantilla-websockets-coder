import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { resolve } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import ProductManager from './ProductManager.js';

const adminProducts = new ProductManager(
  resolve(__dirname, 'data', 'productList.json')
);

let listaProductosDB = [];

// Start app
const app = express();
const server = createServer(app);
const io = new Server(server);

// Settings
app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, 'public')));

// Routes
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', viewRoutes);

// Launch server
const port = process.env.SERVER_PORT || 3000;
server.listen(port, () => `Server ready and listening on port: ${port}`);

io.on('connection', async (socket) => {
  console.log('CLIENTE CONECTADO');
  console.log(socket.id);
  console.log('================================');
  listaProductosDB = await adminProducts.getAllProducts();

  socket.emit('server:initialProducts', listaProductosDB);

  socket.on('client:idProductoaBorrar', (data) => {
    listaProductosDB = listaProductosDB.filter((p) => p.id !== parseInt(data));
    socket.emit('server:productoBorrado', listaProductosDB);
  });

  socket.on('client:newproduct', (data) => {
    const productID = listaProductosDB.length + 1;
    const newProduct = { id: productID, ...data };
    listaProductosDB.push(newProduct);
    socket.emit('server:newProductAdded', listaProductosDB);
  });
});
