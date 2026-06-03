const bcrypt = require("bcryptjs");

// <<<REGISTER>>>
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("B4c0/\/", salt);

function hash(pass) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);
  //   console.log(hash, "password sudah ke hash?");
  return hash;
}
// hash();
module.exports = { hash };
