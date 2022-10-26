const Users = require("./Users");
const Products = require("./Products");
const Cart = require("./Cart");
const Categories = require("./Categories");
const Favorites = require("./Favorites");
const Orders = require("./OrderItem");
const Comments = require("./Comments");

Favorites.belongsToMany(Users, { through: "userFavorites", as: "favorites" });
Users.belongsToMany(Favorites, { through: "userFavorites", as: "favorites" });

Users.hasMany(Comments, { as: "comments" });
Comments.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = { Users, Products, Cart, Categories, Orders };
