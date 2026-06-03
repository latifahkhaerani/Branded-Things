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
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async create(req, res) {
    try {
      console.log(req.body);

      const { name, description, price, stock, imgUrl, categoryId, authorId } =
        req.body;

      let createProduct = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId,
      });

      // console.log(createProduct, "sudah masuk");

      // hapus
      delete createProduct.dataValues.updatedAt;
      delete createProduct.dataValues.createdAt;

      res.status(200).json({
        message: "Succeed Add New Product!",
        data: createProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error!",
      });
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
