const express = require("express");
const router = express.Router();

const {
  getProductsByCategory,
  getAllCategories,
  createCategory,
  deleteCategory,
  editCategory,
  getCategoryById
} = require("../controllers/category");

//RUTA QUE DEVUELVA LOS PRODUCTOS DE DETERMINADA CATEGORIA
router.get("/:name", getProductsByCategory);
//RUTA QUE DEVUELVA CATEGORIA POR ID
router.get("/:id", getCategoryById);
//RUTA QUE DEVUELVE TODAS LAS CATEGORIAS
router.get("/", getAllCategories);
//RUTA PARA CREAR CAREGORIAS
router.post("/", createCategory);
//RUTA PARA ELIMINAR CATEGORIAS
router.delete("/:id", deleteCategory);
//RUTA PARA EDITAR CATEGORIAS
router.put("/:id", editCategory);

module.exports = router;
