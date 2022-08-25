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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
