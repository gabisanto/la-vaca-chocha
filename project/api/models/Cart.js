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
        defaultValue: 0,
      },
    },
    { sequelize: db, modelName: "cart" }
  );
  
  module.exports = Cart;