const express = require("express");
const router = express.Router();

const { generateToken, validateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");
const Users = require("../models/Users.js");
const Cart = require("../models/Cart");

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      return res.send(users);
    })
    .catch(next);
});

router.get("/:id", function (req, res, next) {
  Users.findOne({
    where: {
      id: req.params.id,
    },
  }).then((user) => res.send(user));
});

router.post("/", (req, res) => {
  Users.create(req.body).then((user) => {
    res.status(201).send(user);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
});

router.post("/logout", (req, res) => {
  const token = req.cookies.token;
  const { user } = validateToken(token);
  const cart = req.body;

  if (cart.length > 0) {
    user.addCart(cart);
  }
  res.clearCookie("token");
});

router.put("/:id", (req, res) => {
  Users.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then(([affectedRows, updated]) => {
    const user = updated[0];
    res.status(201).send(user);
  });
});

router.delete("/admin/:id", (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  }).then((resp) => res.sendStatus(202));
});

module.exports = router;
