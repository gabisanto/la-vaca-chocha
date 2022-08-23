const Users = require("./Users");
const Products = require("./Products");
const Cart = require("./Products");
const Categories = require("./Categories");

Products.belongsTo(Users);
Products.belongsTo(Cart)
Products.belongsTo(Categories)
Users.hasOne(Cart)

module.exports = { Users, Products, Cart, Categories};