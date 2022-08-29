const express = require("express");
const router = express.Router();

const {
  addProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/cart");

// AGREGA UN PRODUCTO AL CARRITO
router.post("/add", addProduct);

// ELIMINA UN PRODUCTO DEL CARRITO
router.post("/delete", deleteProduct);

// EDITA LA CANTIDAD DEL PRODUCTO EN EL CARRITO
router.post("/edit", editProduct);

module.exports = router;
