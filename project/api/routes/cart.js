const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Products = require("../models/Products");
const Users = require("../models/Users");

// AGREGA UN PRODUCTO AL CARRITO
router.post("/add", async function (req, res) {
  if (!req.user) return
  const user = await Users.findOne({
    where: { id: req.user.id },
    include: { model: Products, as: "products" },
  });
  if (!req.body.id) return
  const product = await Products.findOne({ where: { id: req.body.id } });
  if (!product) return
  await user.addProducts(product);
  return res.send(product);
});

// ELIMINA UN PRODUCTO DEL CARRITO
router.post("/delete", async function (req, res) {
  if (!req.user) return
  const user = await Users.findOne({
    where: { id: req.user.id },
    include: { model: Products, as: "products" },
  });
  if (!req.body.id) return
  const product = await Products.findOne({ where: { id: req.body.id } });
  if (!product) return
  let bool = false;
  user.products.map((value) => {
    if (value.id === req.body.id) bool = true;
  });
  if (bool === false)
    return
  await user.removeProducts(product);
  return res.send(user.products)
});

// EDITA LA CANTIDAD DEL PRODUCTO EN EL CARRITO
router.post("/edit", async function (req, res) {
  if (!req.user) return
  const user = await Users.findOne({
    where: { id: req.user.id },
    include: { model: Products, as: "products" },
  });
  if (!req.body.id) return
  let product = await Products.findOne({ where: { id: req.body.id } });
  if (!product) return
  await product.update({ stock: req.body.stock });
  await product.save();
  if (!product) return
  let bool = false;
  user.products.map((value) => {
    if (value.id === req.body.id) bool = true;
  });
  if (bool === false)
    return
  await user.removeProducts(product);
  await user.addProducts(product);
  return res.send(user.products);
});

module.exports = router;


