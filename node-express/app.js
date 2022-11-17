const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
// app.use((req, res, next) => {
//   console.log("In middleware");
//   next(); //Allows to continue to next middleware
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoute);
app.use(shopRoute);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

app.listen(3000);
