const express = require("express");
const router = express.Router();
const Categories = require("../models/Categories.js");

router.get("/", function (req, res, next) {
  Categories.findAll()
    .then((categories) => res.send(categories))
    .catch(next);
});

router.post("/", function (req, res, next) {
  Categories.create(req.body).then((category) => res.send(category));
});

module.exports = router;
