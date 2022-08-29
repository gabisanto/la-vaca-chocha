const Users = require("../models/Users.js");
const { generateToken } = require("../config/tokens");

const getProfile = (req, res) => {
  res.send(req.user);
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
    Users.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    }).then(([affectedRows, updated]) => {
      const user = updated[0];
      res.status(201).send(user);
    });
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

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  login,
  getProfile,
  editUser,
  deleteUser,
};
