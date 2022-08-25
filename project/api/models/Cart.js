const Sequelize = require("sequelize");
const db = require("../config/db");

class Cart extends Sequelize.Model {}

Cart.init(
  {
    products: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stock: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
