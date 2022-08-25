const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Products = require("../models/Products");
const Users = require("../models/Users");

// AGREGA UN PRODUCTO AL CARRITO
router.post("/add", (req, res, next) => {
  Users.findOne({
    where: { id: req.user.id },
    include: { model: Products, as: "products" },
  }).then((user) => {
    Products.findOne({ where: { id: req.body.id } }).then((product) => {
      user.addProducts(product);
      res.send(product);
    });
  });
});

// ELIMINA UN PRODUCTO DEL CARRITO
router.delete("/remove/:id", (req, res, next) => {
  Cart.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.sendStatus(202));
});

// EDITA LA CANTIDAD DEL PRODUCTO EN EL CARRITO
router.put("/edit/:id", (req, res) => {
  Products.update(req.params.amount, {
    where: {
      id: req.params.id,
    },
  }).then((cartProduct) => {
    res.send(cartProduct);
  });
});

module.exports = router;
