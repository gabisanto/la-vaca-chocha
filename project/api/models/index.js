const Users = require("./Users");
const Products = require("./Products");
const Cart = require("./Products");
const Categories = require("./Categories");
const Favorites = require("./Favorites");

Products.belongsTo(Users);
Users.hasMany(Products);
Users.hasOne(Cart);
Cart.belongsTo(Users);
Products.belongsTo(Categories);

Products.belongsToMany(Cart, { through: "cartItems", as: "cartProducts" });
Cart.belongsToMany(Products, { through: "cartItems", as: "productsCart" });


Favorites.belongsToMany(Users, { through: "userFavorites", as: "favorites" });
Users.belongsToMany(Favorites, { through: "userFavorites", as: "favorites" });

module.exports = { Users, Products, Cart, Categories };
