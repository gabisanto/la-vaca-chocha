const Sequelize = require("sequelize");
const db = require("../config/db");

class Users extends Sequelize.Model {}

Users.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    },
    { sequelize: db, modelName: "users" }
  );
  
  module.exports = Users;