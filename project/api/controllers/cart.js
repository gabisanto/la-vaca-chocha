const Cart = require("../models/Cart");

const getProduct = async (req, res, next) => {
  try {
    const products = await Cart.findOne({
      where: {
        userId: req.params.id,
      },
    });

    res.send(products.dataValues.products);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProduct };
