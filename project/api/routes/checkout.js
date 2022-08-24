/* const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Users = require("../models/Users");

router.get("/:id", (req, res) => {
  const idUser = req.params.id;

  Users.findOne({
    where: {
      id: idUser,
    },
  }).then((user) => {
    const cart = user.getCart();
  });
});
module.exports = router;
 */