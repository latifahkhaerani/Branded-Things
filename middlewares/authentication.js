const { where } = require("sequelize");
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    // console.log('masuk authe');
    // next()
    // console.log('lolosin aja say');
    // console.log(req.headers, "req headerr");
    // console.log(req.headers["postman-token"], "req headerr"); -- bukan pake yg ini.

    //   console.log(req.headers.authorization);
    const { authorization } = req.headers;

    // Cek dulu apakah objeknya ada, baru pakai objeknya.
    if (!authorization) {
      throw { name: "Unauthorized" };
    }

    //   baru pakai
    let getToken = authorization.split(" ");
    //   console.log(getToken[1]);
    getToken = getToken[1];

    //jika ketemu tokennya, make sure ini token asli tidak
    const verify = verifyToken(getToken);
    //   console.log(verify); // data dari paayload di userController . id, email, role

    //double check user ini ada di database atau tidak
    const user = await User.findOne({
      where: {
        email: verify.email,
      },
    });

    if (!user) {
      throw { name: "Unauthorized" };
    }

    // jika ketemu, bikin object baru kedalam req. nanti dipake di authorization
    // console.log(req)
    req.loginInfo = {
      authorId: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = authentication;
