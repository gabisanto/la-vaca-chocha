const Sequelize = require("sequelize");
const db = require("../config/db");

class Comments extends Sequelize.Model {}

Comments.init(
  {
    idProduct: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "comments" }
);

module.exports = Comments;
