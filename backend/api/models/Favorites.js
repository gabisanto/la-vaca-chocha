const Sequelize = require("sequelize");
const db = require("../config/db");

class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    idProduct: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "favorites" }
);

module.exports = Favorites;
