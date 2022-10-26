const { Products, Categories } = require("../models");

const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Categories.findOne({
      where: {
        name: req.params.name,
      },
      include: { model: Products, as: "name" },
    });
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.findAll();
    res.send(categories);
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Categories.create(req.body);
    res.send(category);
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = (req, res, next) => {
  try {
    Categories.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(202);
  } catch (error) {}
};

const editCategory = async (req, res, next) => {
  const [row, update] = await Categories.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  });
  const category = update[0];
  res.send(category);
};
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Categories.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(category);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductsByCategory,
  getAllCategories,
  createCategory,
  deleteCategory,
  editCategory,
  getCategoryById
};
