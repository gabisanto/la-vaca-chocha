const express = require("express");
const router = express.Router();

const { generateToken, validateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");
const Users = require("../models/Users.js");

router.post("/register", (req, res) => {
  Users.create(req.body).then((user) => {
    res.status(201).send(user);
  });
});

//QUEDA PENDIENTE EL METODO VALIDATE PASSWORD DEL MODELO
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    });
  });
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

router.get("/me", validateAuth, (req, res) => {
    res.send(req.user);
  });
  
router.delete("/admin/:id", (req, res) => {
  Users.destroy({
    where: {
      id: 1,
    },
  });
});

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      return res.send(users);
    })
    .catch(next);

});

module.exports = router;
