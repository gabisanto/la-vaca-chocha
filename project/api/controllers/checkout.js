const OrderItem = require("../models/OrderItem");
const {deleteCart}= require("../controllers/cart")

const proceedPayment = async (req, res) => {
  const { cart, userId, ...data } = req.body;

  let total = 0;
  cart.map((prod) => {
    total += prod.price;
  });
  const order = OrderItem.create({ userId, products: cart, total });
  deleteCart(userId)

  res.send(order)
};
module.exports = { proceedPayment };
