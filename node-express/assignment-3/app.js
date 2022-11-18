const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000);
