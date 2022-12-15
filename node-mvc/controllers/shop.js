const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (prod) => {
    Cart.addProduct(prodId, prod.price);
  });
  res.render();
};

exports.getIndex = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
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
