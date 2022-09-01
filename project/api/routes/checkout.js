const express = require("express");
const router = express.Router();

const User = require("../models/Users");
const transporter = require("../config/mailer")
const {proceedPayment}= require("../controllers/checkout")

/* router.post("/", (req, res) => {

  //CONFIGURACION MOMENTANEA
  let mailOptions = {
    from: `"sdas"<ramirezjulio.0789@gmail.com>`,
    to: "ramirezjulio.0789@gmail.com", //this is the mail in the user content
    subject: "esto seria el subjecsdsdt",
    text: "este seria el contenido del mail",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("Email Enviado");
      res.status(200).send(req.body);
    }
  });
}); */

router.post("/",proceedPayment)


module.exports = router;
