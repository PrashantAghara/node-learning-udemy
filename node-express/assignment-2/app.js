const express = require("express");
const app = express();

// app.use((req, res, next) => {
//   console.log("In middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("In middleware 2");
//   res.send("<h1>Hello</h1>");
// });

app.use("/users", (req, res) => {
  res.send("<ul><li>User 1</li><li>User 2</li></ul>");
});

app.use("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(3000);
