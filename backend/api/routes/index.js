const express = require("express");
const router = express.Router();
const usersRoutes = require("./users");
const productsRoutes = require("./products");
const cartRoutes = require("./cart");
const categoryRoutes = require("./category");
const checkoutRoutes = require("./checkout");
const ordersRoutes = require("./orders");

router.use("/users", usersRoutes);
router.use("/products", productsRoutes);
router.use("/category", categoryRoutes);

router.use("/cart", cartRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
