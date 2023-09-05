const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCard(product) {
    const cartProd = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let quantity = 1;
    const updateCartItems = [...this.cart.items];
    if (cartProd >= 0) {
      quantity = this.cart.items[cartProd].quantity + 1;
      updateCartItems[cartProd].quantity = quantity;
    } else {
      updateCartItems.push({
        productId: new ObjectId(product._id),
        quantity: quantity,
      });
    }

    const updatedCart = {
      items: updateCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
