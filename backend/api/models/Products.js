const Sequelize = require("sequelize");
const db = require("../config/db");

class Products extends Sequelize.Model {}

Products.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
    categoryId: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
  },
  { sequelize: db, modelName: "products" }
);

module.exports = Products;
