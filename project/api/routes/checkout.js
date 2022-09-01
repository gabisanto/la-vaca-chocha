const express = require("express");
const router = express.Router();

const {proceedPayment}= require("../controllers/checkout")

router.post("/",proceedPayment)

module.exports = router;
