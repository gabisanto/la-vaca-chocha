const nodemailer = require("nodemailer");


//ESTA CONFIGURACION ES MOMENTANEA
 const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "thora.anderson@ethereal.email",
    pass: "HGxAK9XbgJ89jqSqXe",
  },
});
 
 module.exports= transporter