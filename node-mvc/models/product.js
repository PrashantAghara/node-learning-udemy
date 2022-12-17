const Cart = require("./cart");
const db = require("../util/database");
module.exports = class Product {
  constructor(id, title, image, description, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, image, decription) values (?,?,?,?)",
      [this.title, this.price, this.image, this.description]
    );
  }

  static fetchAllProducts() {
    return db.execute("SELECT * FROM products");
  }

  static deleteById(id) {}

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id=?", [id]);
  }
};
