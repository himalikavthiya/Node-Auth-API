const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

let transport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/** Send mail */
const sendMail = async (to, data, subject) => {
  try {
    return transport.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: data,
    });
  } catch (error) {
    return error;
  }
};

/** Generate a random OTP */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  sendMail,
  generateOTP,
};
