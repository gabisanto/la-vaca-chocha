const Sequelize = require("sequelize");
const db = require("../config/db");

class Orders extends Sequelize.Model {}
Orders.init(
  {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Orders;
