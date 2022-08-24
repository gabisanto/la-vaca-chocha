const express = require("express");
const router = express.Router();
const usersRoutes = require("./users");
const productsRoutes = require("./products");
const cartRoutes = require("./cart");
const categoryRoutes = require("./category");
const checkoutRoutes = require("./checkout");

router.use("/users", usersRoutes);
router.use("/products", productsRoutes);
router.use("/cart", cartRoutes);
router.use("/category", categoryRoutes);
/* router.use("/checkout", checkoutRoutes); */

module.exports = router;
