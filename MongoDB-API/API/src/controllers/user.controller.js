const {
  createUser,
  checkEmailId,
  UserById,
  getUserById,
} = require("./../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const moment = require("moment");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
const { sendMail, generateOTP } = require("../services/email.service");
const User = require("./../models/user.model");


/* ---------------------------- Register User Data ---------------------------- */

const register = async (req, res) => {
  try {
    const reqbody = req.body;
    /** find email Id*/
    const userExist = await checkEmailId(reqbody.email);
    if (userExist) {
      throw new Error(`Email already use ${reqbody.email} `);
    }

    /**create user by creste service */
    const user = await createUser(reqbody);

    /**create accesstoken */
    const payload = {
      firstname: reqbody.firstname,
      email: reqbody.email,
      expiresIn: moment().add(5, "minutes").unix(),
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRECT_KEY);

    /**   generate Refresh Token */
    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, refreshSecret);
    };

    const refreshToken = generateRefreshToken(payload);

    res.status(201).json({
      message: "User data create sucessfully !",
      data: user,
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* ------------------------------- User Login ------------------------------- */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await checkEmailId(email);

    if (!findUser) {
      throw new Error("User not Found", 403);
    }

    /**compare password   */
    const successPassword = await bcrypt.compare(password, findUser.password);

    if (!successPassword) throw Error("Inccorect Password");

    /**create Token */
    let payload = {
      email,
      expiresIn: moment().add(10, "minutes").unix(),
    };

    let accessToken;
    if (findUser && successPassword) {
      accessToken = await jwt.sign(payload, process.env.JWT_SECRECT_KEY);
    }

    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, refreshSecret);
    };

    const refreshToken = generateRefreshToken(payload);

    res.status(200).json({
      success: true,
      message: "User Login successfully!",
      data: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ------------------------------ User get list ----------------------------- */
const userList = async (req, res) => {
  try {
    const userList = await getUserById(req, res);
    if (!userList) {
      throw new Error("User not Found");
    }
    res.status(200).json({
      success: true,
      message: "User List succesfully !",
      data:userList
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ----------------------------- Forgot password ---------------------------- */
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Find the user by email and verify OTP
    const user = await checkEmailId(email);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const otp = generateOTP();
    const subject = "Password Reset OTP";

    // Render the EJS template
    const emailTemplate = await ejs.renderFile("./src/views/otp.temp.ejs", {
      otp,
    });

    // send mail service is use by email service
    const mailSent = sendMail(email, emailTemplate, subject);

    if (!mailSent) {
      // If email sending fails, handle the error
      res.status(500).json({
        success: false,
        message: "Failed to send email with OTP",
      });
    }
    // Save the OTP in the user document
    user.otp = otp;
    await user.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: `Check your email for the OTP: ${otp}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ----------------------------- Reset Password ----------------------------- */

const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  try {
    // Find the user by email and verify OTP
    const user = await checkEmailId(email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (user.otp !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP." });
    }

    // Check if the new password and confirm password match

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }
    
    // Update the user's password and clear the OTP
    user.password = newPassword;
    user.otp = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/* ----------------------------- Change Password ----------------------------- */

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
console.log(req.body);
  try {
    // Get the user from the token
     const userData = await User.findById(req.user._id);

    // Check if the old password is correct
    const isPasswordValid = await bcrypt.compare(oldPassword, userData.password);
   
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect.",
      });
    }
    
    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }
   
    // Update the user's password
    userData.password = newPassword;

     await userData.save();
  
    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


module.exports = {
  register,
  login,
  userList,
  forgotPassword,
  resetPassword,
  changePassword,
};
