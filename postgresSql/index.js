const http = require("http");
const bodyParser = require("body-parser");
const routes = require("./src/routes/v1/user.route");
const cors=require('cors');
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const client = require("./src/dbs/db.connect");

app.use(bodyParser.json());

app.use(cors());

app.use("/v1", routes);

client.connect();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server listing port number ", +process.env.PORT);
});
