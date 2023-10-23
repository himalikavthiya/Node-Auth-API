const express = require("express");
const cors = require("cors");
const helmet=require('helmet');
const User = require("./config");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add(data);
  console.log("Data",data);

  res.send({ msg: "User data add", data: data });
});

app.listen(8001, () => {
  console.log("Server running");
});
