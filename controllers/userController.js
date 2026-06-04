const { where } = require("sequelize");
const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const {signToken} = require("../helpers/jwt");

class userController {
  static async addUser(req, res, next) {
    try {
      console.log(req.body);
      const { username, email, password, phoneNumber, address } = req.body;

      let createUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      //   console.log(createUser, "masuk user baru");
      //   console.log(createUser.dataValues.password, "dapat pass nya belom?");

      delete createUser.dataValues.password;
      delete createUser.dataValues.createdAt;
      delete createUser.dataValues.updatedAt;

      res.status(201).json({
        message: "Success add new user!",
        data: createUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      // console.log(req.body, "<<<req bod");
      const { email, password } = req.body;

      // cari akun yg sudah login
      let findUser = await User.findOne({
        where: {
          email,
        },
      });

      // console.log(findUser,'akun siapaa?');
      // bandingkan password yang ada dengan yg di hash
      // console.log('berhasil login');
      // console.log(findUser.dataValues);

      // jika tidak diisi salah satu
      if (!email || !password) throw { name: "BadRequest" };

      // jika tidak terdaftar
      if (!findUser) throw { name: "LoginError" };

      // jika password tidak cocok dengan db
      if (!compare(password, findUser.dataValues.password)) {
        throw { name: "LoginError" };
      }

      //make payload to be received at jwt
      const payload = {
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
      };

      // console.log(payload, 'kamu id,role apa?');

      // generate token
      const access_token = signToken(payload);

      res.status(200).json({
        message: "success login",
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = userController;
