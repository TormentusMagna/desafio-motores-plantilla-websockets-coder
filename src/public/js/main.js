const socket = io();

const productListContainer = document.querySelector('#productList');
const formData = document.querySelector('#formData');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const code = document.querySelector('#code');
const price = document.querySelector('#price');
const stats = document.querySelector('#status');
const stock = document.querySelector('#stock');
const category = document.querySelector('#category');
const thumbnails = document.querySelector('#thumbnails');

socket.on('server:initialProducts', (data) => {
  while (productListContainer.firstChild) {
    productListContainer.firstChild.remove();
  }

  data.forEach((e) => {
    productListContainer.innerHTML += `<h2>${e.title}</h2>`;
  });

  formData.addEventListener('submit', (e) => {
    e.preventDefault();

    let newProduct = {
      title: title.value.toLowerCase(),
      description: description.value.toLowerCase(),
      code: code.value.toLowerCase(),
      price: Number(price.value),
      status: Boolean(stats.value),
      stock: Number(stock.value),
      category: category.value.toLowerCase(),
      thumbnails: Array(thumbnails.value),
    };

    socket.emit('client:newproduct', newProduct);

    socket.on('server:newProductAdded', (data) => {
      while (productListContainer.firstChild) {
        productListContainer.firstChild.remove();
      }

      data.forEach((e) => {
        productListContainer.innerHTML += `<h2>${e.title}</h2>`;
      });
    });
  });
});
