const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../util/path");

const users = [];

router.get("/user", (req, res, next) => {
  res.render('user', {title: 'Users', path:'/user', users: users})
});

router.post("/add-user",(req,res) => {
  users.push({username : req.body.username});
  res.redirect("/user");
})

router.get("/", (req, res, next) => {
  res.render('home', {title: 'Home', path:'/'});
});

module.exports = router;
