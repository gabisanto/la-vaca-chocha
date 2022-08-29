const Sequelize = require("sequelize");
const db = require("../config/db");

class Cart extends Sequelize.Model {}

Cart.init(
  {
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
