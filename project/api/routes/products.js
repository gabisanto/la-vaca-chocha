const express = require("express");
const router = express.Router();
const Products = require("../models/Products.js");

const {
  getProducts,
  getProductBYId,
  deleteById,
  editProduct,
  searchProducts,
  createProduct,
  getProductComments,
} = require("../controllers/products");

//RUTA QUE DEVUELVA TODOS LOS PRODUCTOS
router.get("/", getProducts);
//RUTA QUE DEVUELVA UN PRODUCTO ESPECIFICO
router.get("/:id", getProductBYId);
// RUTA PARA ELIMINAR UN PRODUCTO
router.delete("/:id", deleteById);
//RUTA PARA MODIFICAR UN PRODUCTO
router.put("/:id", editProduct);
//RUTA QUE DEVUELVA LOS PRODUCTOS CUYO NOMBRE, COINCIDA CON LA BUSQUEDA DEL USUARIO A TRAVES DE INPUT
router.get("/search/:query", searchProducts);
//RUTA PARA AGREGAR UN PRODUCTO
router.post("/", createProduct);
//RUTA PARA TRAER COMENTARIOS DE UN PRODUCTO
router.get("/:id/comments", getProductComments);

module.exports = router;
