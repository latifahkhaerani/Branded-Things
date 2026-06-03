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

function compare(pass, hashed) {
  // console.log(bcrypt.compareSync(pass, hashed));
  return bcrypt.compareSync(pass, hashed);
  // await bcrypt.compare(pass, hashed); // true
}

// compare(
//   "passwo123",
//   "$2b$10$y9Ma92efgpBA/jcEBO/r8OHu7Xds.9GeHfVwJ10EnMLgpBrjj46yO",
// );
module.exports = { hash, compare };
