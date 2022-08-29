const Users = require("./Users");
const Products = require("./Products");
const Cart = require("./Cart");
const Categories = require("./Categories");
const Favorites = require("./Favorites");
const Orders = require("./Orders");

/* Favorites.belongsToMany(Users, { through: "userFavorites", as: "favorites" });
Users.belongsToMany(Favorites, { through: "userFavorites", as: "favorites" }); */

Products.belongsTo(Users, {
  constraints: true,
  onDelete: "CASCADE",
});
Users.hasMany(Products);
Users.hasOne(Cart);
Cart.belongsTo(Users);

Cart.belongsToMany(Products, { through: "cartItem", as: "addCart" });
Products.belongsToMany(Cart, { through: "cartItem", as: "addCart" });

Products.belongsToMany(Categories, { through: "product-category", as: "productCategory" });
Categories.belongsToMany(Products, { through: "product-category", as: "productCategory" });

/* Orders.belongsTo(Users);
Users.hasMany(Orders);
Orders.belongsToMany(Products, {
  through: "orderItem",
});
Products.belongsToMany(Orders, {
  through: "orderItem",
}); */

module.exports = { Users, Products, Cart, Categories };
