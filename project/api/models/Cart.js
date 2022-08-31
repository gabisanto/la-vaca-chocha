const Sequelize = require("sequelize");
const db = require("../config/db");

class Cart extends Sequelize.Model {}

Cart.init(
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    products: {
      type: Sequelize.ARRAY(Sequelize.JSON),
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
