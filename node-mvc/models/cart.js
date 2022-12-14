const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProdIndex = cart.products.findIndex((p) => p.id === id);
      const existingProd = cart.products[existingProdIndex];
      let updatedProduct;
      if (existingProd) {
        updatedProduct = { ...existingProd };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProdIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const prod = updatedCart.products.find((prod) => prod.id === id);
      if (prod) {
        const prodQty = prod.qty;
        updatedCart.products = updatedCart.products.filter(
          (prod) => prod.id !== id
        );
        updatedCart.totalPrice = updatedCart.totalPrice - price * prodQty;
        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getProducts(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
