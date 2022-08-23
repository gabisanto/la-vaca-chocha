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
      rol: {
        type: Sequelize.STRING,
        defaultValue: "client"
      }

    },
    { sequelize: db, modelName: "users" }
  );
  
  module.exports = Users;