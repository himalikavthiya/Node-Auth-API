const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbconnect = async () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("Database connection sucessfully !");
    })
    .catch((error) => {
      console.log("Database connection error", error);
    });
};

module.exports = {
  dbconnect,
};
