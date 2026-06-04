// require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function signToken(payload) {
  //   console.log("secretKey =", process.env.SECRET_KEY,'masuk?');
  //   return jwt.sign(payload, process.env.SECRET_KEY);
  return jwt.sign(payload, secretKey);
}
// console.log(process.env.SECRET_KEY, "<<<APAA");

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { signToken, verifyToken };
