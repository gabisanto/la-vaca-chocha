const OrderItem = require("../models/OrderItem");
const { deleteCart } = require("../controllers/cart");
const { sendEmail } = require("../config/mailer");

const proceedPayment = async (req, res) => {
  const { cart, userId, name, email, ...data } = req.body;

  let total = 0;
  try {
    cart.map((prod) => {
      total += prod.price;
    });
    const order = OrderItem.create({ userId, products: cart, total });
    deleteCart(userId);
    res.send(order);
    sendEmail(name, email);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { proceedPayment };
