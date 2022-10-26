const nodemailer = require('nodemailer');

const sendEmail = function(name, email){

const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "lavacachochap5@gmail.com",
    pass: "onsfxqheingqanfj",
  }
});

const mailOptions =  {
  from: "lavacachochap5@gmail.com",
  to: `${email}`,
  subject: `Hola, ${name}! Muchas gracias por tu compra!`,
  html: '<a href="https://ibb.co/V3XkyFb"><img src="https://i.ibb.co/3ktPXxV/lavacachocha.png" alt="lavacachocha" border="0"></a>'
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log("Email enviado");
  }
}); 
}

module.exports = {sendEmail}