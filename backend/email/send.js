const nodemailer = require('nodemailer');
require('dotenv').config();

const credentials = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PWD
  }
}

const transporter = nodemailer.createTransport(credentials)

module.exports = async (to, content) => {
  
  const contacts = {
    from: process.env.MAIL_USER,
    to: to
  }
  
  const email = Object.assign({}, content, contacts)

  await transporter.sendMail(email)

}