const express = require("express");
const router = express();
const {
  userList,
  userListById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user.controller");

router.post("/create-user", createUser);

router.get("/users", userList);

router.get("/user:id", userListById);

router.put("/update-user/:id", updateUser);

router.delete("/delete-user/:id", deleteUser);

module.exports = router;
