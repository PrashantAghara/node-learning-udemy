const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "prashant", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
