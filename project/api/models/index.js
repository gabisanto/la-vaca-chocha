const Users = require("./Users");
const Products = require("./Products");
const Cart = require("./Products");
const Categories = require("./Categories");
const Favorites = require("./Favorites");
const Orders = require("./Orders");

Products.belongsTo(Users);
Users.hasMany(Products);
Users.hasOne(Cart);
Cart.belongsTo(Users);

Products.belongsToMany(Cart, { through: "cartItems", as: "cartProducts" });
Cart.belongsToMany(Products, { through: "cartItems", as: "productsCart" });

Favorites.belongsToMany(Users, { through: "userFavorites", as: "favorites" });
Users.belongsToMany(Favorites, { through: "userFavorites", as: "favorites" });

Orders.belongsTo(Users);
Users.hasMany(Orders);
Orders.belongsToMany(Products, {
  through: "orderItem",
});
Products.belongsToMany(Orders, {
  through: "orderItem",
});

module.exports = { Users, Products, Cart, Categories };
