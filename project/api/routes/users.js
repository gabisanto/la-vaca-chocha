const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middlewares/auth");

const {
  getAllUser,
  getUserById,
  createUser,
  login,
  getProfile,
  editUser,
  deleteUser,
  addFavorites,
  deleteFavorites,
  getFavorites,
} = require("../controllers/users");
//USERS
router.get("/me", validateAuth, getProfile);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/login", login);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
//FAVORITES
router.post("/favorites", addFavorites);
router.get("/favorites/:id", getFavorites);
router.post("/favorites/delete", deleteFavorites);
module.exports = router;
