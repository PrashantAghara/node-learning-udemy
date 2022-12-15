const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, image, description, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existProdIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updateProds = [...products];
        updateProdsp[existProdIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProds), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAllProducts(cb) {
    getProductsFromFile(cb);
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const prod = products.find((prod) => prod.id === id);
      const updateProds = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updateProds), (err) => {
        if (!err) {
          Cart.deleteProduct(id, prod.price);
        }
      });
    });
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
