const http = require("http");
const { dbconnect } = require("./config/dbconnection");
const bodyParser=require('body-parser');
const routes=require('./routes/v1/index')
const dotenv = require("dotenv").config();
const express= require("express");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1',routes);

app.use(express.static(path.join(__dirname, `./public`)));


/** database connection  */
dbconnect();

/**create server */
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(" Server listning port number", +process.env.PORT);
});
