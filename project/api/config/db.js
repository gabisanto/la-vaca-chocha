const Sequelize = require("sequelize");

const db = new Sequelize("lavacachocha", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;