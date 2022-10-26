const Products = require("../models/Products.js");
const Comments = require("../models/Comments.js");
const { Op } = require("sequelize");

const getProducts = async (req, res, next) => {
  try {
    const productos = await Products.findAll();
    res.send(productos);
  } catch (error) {
    console.log(error);
  }
};

const getProductBYId = async (req, res, next) => {
  try {
    const productos = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!productos.id) return res.sendStatus(404);
    res.send(productos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const productos = await Products.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(202);
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const [row, update] = await Products.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    const productos = update[0];
    res.send(productos);
  } catch (error) {
    console.log(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const productos = await Products.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: "%" + req.params.query + "%",
            },
          },
          {
            description: {
              [Op.iLike]: "%" + req.params.query + "%",
            },
          },
        ],
      },
    });
    res.send(productos);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res, next) => {
  const { category } = req.body;

  try {
    const product = await Products.create(req.body);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

const getProductComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await Comments.findAll({ where: { idProduct: id } });
    res.send(comments);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProductBYId,
  deleteById,
  editProduct,
  searchProducts,
  createProduct,
  getProductComments,
};
