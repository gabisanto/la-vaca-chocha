const Sequelize = require("sequelize");

const db = new Sequelize("lavacachocha", "postgres", "luayher", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;