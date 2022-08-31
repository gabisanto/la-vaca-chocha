const Users = require("./Users");
const Products = require("./Products");
const Cart = require("./Cart");
const Categories = require("./Categories");
const Favorites = require("./Favorites");
const Orders = require("./Orders");

Favorites.belongsToMany(Users, { through: "userFavorites", as: "favorites" });
Users.belongsToMany(Favorites, { through: "userFavorites", as: "favorites" });

module.exports = { Users, Products, Cart, Categories };
