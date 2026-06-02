const { Product, User, Category } = require("../models");

class productController {
  static async get(req, res) {
    try {
      const products = await Product.findAll();

      // res.send(products);
      res.status(200).json({
        message: "Succeed read producst",
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async create(req, res) {
    try {
      console.log("masuk");
    } catch (error) {
      console.log(error);
    }
  }
  static async detail(req, res) {
    try {
      console.log("masuk");
    } catch (error) {
      console.log(error);
    }
  }
  static async update(req, res) {
    try {
      console.log("masuk");
    } catch (error) {
      console.log(error);
    }
  }
  static async delete(req, res) {
    try {
      console.log("masuk");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = productController;
