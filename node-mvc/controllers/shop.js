const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts()
    .then(([rows]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (prod) => {
    Cart.addProduct(prodId, prod.price);
  });
  res.render();
};

exports.getIndex = (req, res, next) => {
  Product.fetchAllProducts()
    .then(([rows]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fetchAllProducts((products) => {
      const cartProd = [];
      for (const product of products) {
        const cartProdData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProdData) {
          cartProd.push({ productData: product, qty: cartProdData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your cart",
        path: "/cart",
        products: cartProd,
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/orders", { pageTitle: "Your Orders", path: "/orders" });
  });
};

exports.getCheckout = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/checkout", { pageTitle: "Checkout", path: "/checkout" });
  });
};
