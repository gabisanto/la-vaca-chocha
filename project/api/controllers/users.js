const Users = require("../models/Users.js");
const Favorites = require("../models/Favorites");
const { generateToken, validateToken } = require("../config/tokens");

const getProfile = async (req, res) => {
  try {
    const verifyToken = validateToken(req.body.token);
    const user = await Users.findByPk(verifyToken.user);

    if (user) return res.send({ name: user.name, lastname: user.lastname });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    let user = await Users.findAll();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });
    user
      ? res.send({ error: "User already exists" })
      : Users.create(req.body)
          .then((user) => {
            res.status(201).send(user);
          })
          .catch((error) => {
            res.status(400).send(error);
          });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.sendStatus(401);
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      };
      const token = generateToken(payload);
      console.log(payload, "payload del back");
      res.send({ payload, token });
    });
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const [row, update] = await Users.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    const user = update[0];
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(202);
  } catch (error) {
    console.log(error);
  }
};

const getFavorites = async (req, res) => {
  const id = req.params.id;
  const resp = await Users.findOne({ where: { id: id }, include: "favorites" });
  res.send(resp.favorites);
};

const addFavorites = (req, res) => {
  const { userId, product } = req.body;
  console.log(product);

  Favorites.create({
    idProduct: product.id,
  }).then((product) => {
    Users.findOne({ where: { id: userId } })
      .then((user) => {
        user.addFavorites(product);
        res.sendStatus(200);
      })
      .catch((e) => console.log(e));
  });
};

const deleteFavorites = (req, res) => {
  const { userId, productId } = req.query;
  Users.findByPk(userId)
    .then((user) => user.removeFavorite(productId))
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));

}
module.exports = {
  getAllUser,
  getUserById,
  createUser,
  login,
  getProfile,
  editUser,
  deleteUser,
  getFavorites,
  addFavorites,
  deleteFavorites,
};
