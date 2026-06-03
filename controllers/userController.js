const { User } = require("../models");

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
      console.log("masuk loginnn");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = userController;
