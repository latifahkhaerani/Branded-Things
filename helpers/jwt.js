// require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// var token = jwt.sign({ foo: "bar" }, "shhhhh");
function signToken(payload) {
  //   console.log("secretKey =", process.env.SECRET_KEY,'masuk?');
//   return jwt.sign(payload, process.env.SECRET_KEY);
  return jwt.sign(payload, secretKey);
}

// console.log(process.env.SECRET_KEY, "<<<APAA");
module.exports = signToken;
