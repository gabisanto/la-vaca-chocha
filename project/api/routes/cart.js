const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { generateToken, validateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");

// AGREGA UN PRODUCTO AL CARRITO
router.post("/add/:id", validateAuth, (req, res) => {
  
});
// ELIMINA UN PRODUCTO DEL CARRITO
router.delete("/remove/:id", validateAuth, (req, res) => {
    
})

// EDITA LA CANTIDAD DEL PRODUCTO EN EL CARRITO
router.post("/modify/:id", validateAuth, (req, res) => {

})

module.exports = router;
