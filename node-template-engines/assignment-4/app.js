const path = require("path");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
const bodyParser = require("body-parser");
const routes = require("./routes/route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.use((req, res) => {
  res.status(404).render('404',{title: 'Page Not Found', path: ''})
});

app.listen(3000);
