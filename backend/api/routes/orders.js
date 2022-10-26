const express = require("express");
const { getAllOrders , getOrder} = require("../controllers/orders");
const router = express.Router();


router.get("/", getAllOrders)
router.get("/:id", getOrder)

module.exports = router;
