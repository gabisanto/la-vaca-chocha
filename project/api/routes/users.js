const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middlewares/auth");

//RUTAS TESTEADAS MENOS "/ME"

const {
  getAllUser,
  getUserById,
  createUser,
  login,
  getProfile,
  editUser,
  deleteUser,
} = require("../controllers/users");

router.get("/me", validateAuth, getProfile);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/login", login);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
