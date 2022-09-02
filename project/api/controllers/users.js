const Users = require("../models/Users.js");
const Favorites = require("../models/Favorites");
const Comments = require("../models/Comments");
const Cart = require("../models/Cart");
const { generateToken, validateToken } = require("../config/tokens");
const { findOne } = require("../models/Users.js");

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
    let payload = user.map(({ id, name, email, isAdmin }) => ({
      id,
      name,
      email,
      isAdmin,
    }));
    res.send(payload);
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
      include: "favorites",
    });
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      favorites: user.favorites,
    };
    res.send(payload);
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
    const user = await Users.findOne({
      where: { email },
      include: ["favorites", "comments"],
    });
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
      },
    });

    if (!user) return res.sendStatus(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        favorites: user.favorites,
        cart: cart && cart.products.length > 0 ? cart : [],
        comments: user.comments,
      };
      const token = generateToken(payload);
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
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    res.send(payload);
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
  Favorites.create({
    idProduct: product.id,
  }).then((product) => {
    Users.findOne({ where: { id: userId } })
      .then((user) => {
        user.addFavorites(product, { through: "favorites" });
        res.sendStatus(200);
      })
      .catch((e) => console.log(e));
  });
};

const deleteFavorites = (req, res) => {
  const { userId, product } = req.body;

  Users.findByPk(userId, { include: "favorites" })
    .then((user) => {
      let faveId = user["favorites"].find(
        (fave) => fave.idProduct === product.id
      ).id;
      user.removeFavorite(faveId);
    })
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
};

const logout = async (req, res) => {
  const { cart, user } = req.body;
  const users = await Users.findOne({ where: { email: user.email } });
  const userId = users.dataValues.id;

  const carts = await Cart.findOne({ where: { userId: userId } });

  if (carts) {
    Cart.update(
      { userId: userId, products: cart },
      {
        where: { userId: userId },
        returning: true,
      }
    ).then(([affectedRows, updated]) => {
      const cart = updated[0];
      res.status(201).send(cart);
    });
  } else {
    Cart.create({ userId: userId, products: cart });
    res.send(carts);
  }
};

const addComment = (req, res) => {
  const { userId, product, comment } = req.body;
  Comments.create({
    idProduct: product.id,
    userId: userId,
    comment: comment,
  })
    .then((newc) => res.send(newc))
    .catch((e) => console.log(e));
};

const getAllComments = (req, res) => {
  Comments.findAll()
    .then((comm) => res.send(comm))
    .catch((e) => console.log(e));
};

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
  logout,
  addComment,
  getAllComments,
};
