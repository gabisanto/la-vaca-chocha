const { Orders } = require("../models");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();
    res.send(orders);
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Orders.findAll({ where: { userId: req.params.id } });
    res.send(order);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllOrders, getOrder };
