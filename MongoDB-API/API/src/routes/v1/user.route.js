const express = require("express");
const router = express();
const {
  register,
  login,
  userList,
  forgotPassword,
  resetPassword,
  changePassword
} = require("../../controllers/user.controller");
const { refreshToken, accessToken } = require("../../middlwares/auth");


router.post("/signup", register);

router.post("/signin", login);

router.get("/list",accessToken(), userList);

router.post("/refreshtoken", refreshToken);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/change-password",accessToken(), changePassword);


module.exports = router;
