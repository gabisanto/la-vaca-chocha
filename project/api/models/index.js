const Users = require("./Users");
const Products = require("./Products");
const Cart = require("./Cart");
const Categories = require("./Categories");
const Favorites = require("./Favorites");
const Orders = require("./Orders");

Favorites.belongsToMany(Users, { through: "userFavorites", as: "favorites" });
Users.belongsToMany(Favorites, { through: "userFavorites", as: "favorites" });

Users.hasOne(Cart);
Cart.belongsTo(Users);

Cart.belongsToMany(Products, { through: "cartItem", as: "addCart" });
Products.belongsToMany(Cart, { through: "cartItem", as: "addCart" });


module.exports = { Users, Products, Cart, Categories };
