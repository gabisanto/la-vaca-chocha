const express = require("express");
const router = express.Router();
const Products = require("../models/Products.js");

const {getProducts, getProductBYId, deleteById, editProduct, searchProducts} = require("../controllers/products");


//RUTA QUE DEVUELVA TODOS LOS PRODUCTOS

router.get("/", getProducts);

//RUTA QUE DEVUELVA UN PRODUCTO ESPECIFICO

router.get("/:id", getProductBYId); 

// RUTA PARA ELIMINAR UN PRODUCTO

router.get("/:id", deleteById);

//RUTA PARA MODIFICAR UN PRODUCTO

router.get("/:id", editProduct);

//RUTA QUE DEVUELVA LOS PRODUCTOS CUYO NOMBRE, COINCIDA CON LA BUSQUEDA DEL USUARIO A TRAVES DE INPUT

router.get("/search/:query", searchProducts);




//RUTA PARA AGREGAR UN PRODUCTO

router.post("/", function (req, res, next) {
  Products.create(req.body).then((product) => res.send(product));
});









module.exports = router;
