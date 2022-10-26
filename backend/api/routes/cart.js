const express = require("express");
const router = express.Router();

const {
  getProduct
} = require("../controllers/cart");

// OBTENER LOS PRODUCTOS DEL CARRITO
router.get("/:id", getProduct);

module.exports = router;
