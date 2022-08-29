const Products = require("../models/Products");
const Users = require("../models/Users");
const Cart = require("../models/Cart")

const addProduct = async (req, res) => {
const {product, user}= req.body
console.log(product);
console.log(user);

Cart.create(product).then((product)=>{
  Users.findByPk(user.id).then((user)=>{
    user.addCart(product)
  })
})

/* 
  try {
    const user = await Users.findOne({
      where: { id: user.id },
      include: { model: Products, as: "products" },
    });
    const product = await Products.findOne({ where: { id: product.id } });
    if (!product) return;
    await user.addProducts(product);
    return res.send(product);
  } catch (error) {
    console.log(error);
  } */
};

const deleteProduct = async (req, res) => {
  try {
    if (!req.user) return;
    const user = await Users.findOne({
      where: { id: req.user.id },
      include: { model: Products, as: "products" },
    });
    if (!req.body.id) return;
    const product = await Products.findOne({ where: { id: req.body.id } });
    if (!product) return;
    let bool = false;
    user.products.map((value) => {
      if (value.id === req.body.id) bool = true;
    });
    if (bool === false) return;
    await user.removeProducts(product);
    return res.send(user.products);
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res) => {
  try {
    if (!req.user) return;
    const user = await Users.findOne({
      where: { id: req.user.id },
      include: { model: Products, as: "products" },
    });
    if (!req.body.id) return;
    let product = await Products.findOne({ where: { id: req.body.id } });
    if (!product) return;
    await product.update({ stock: req.body.stock });
    await product.save();
    if (!product) return;
    let bool = false;
    user.products.map((value) => {
      if (value.id === req.body.id) bool = true;
    });
    if (bool === false) return;
    await user.removeProducts(product);
    await user.addProducts(product);
    return res.send(user.products);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProduct, deleteProduct, editProduct };
