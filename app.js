if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();

const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const upload = require("./utils/multers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

module.exports = app;
// console.log(`Hello ${process.env.SECRET_KEY}`);
