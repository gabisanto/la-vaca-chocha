const Sequelize = require("sequelize");
const db = require("../config/db");

class Categories extends Sequelize.Model {}

Categories.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "categories" }
);

module.exports = Categories;
