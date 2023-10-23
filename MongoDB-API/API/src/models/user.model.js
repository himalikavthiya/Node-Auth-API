const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    otp:{
      type:Number,

    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  // var salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
