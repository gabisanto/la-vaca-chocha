const Sequelize = require("sequelize");
const db = require("../config/db");

class OrderItem extends Sequelize.Model {}

OrderItem.init(
  {
    userId: {
      type: Sequelize.INTEGER,
    },
    products: {
      type: Sequelize.ARRAY(Sequelize.JSON),
    },
    total:{
        type: Sequelize.DECIMAL
    }
  },
  { sequelize: db, modelName: "orderItem" }
);

module.exports = OrderItem;
