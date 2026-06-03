require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// console.log(`Hello ${process.env.SECRET_KEY}`);
