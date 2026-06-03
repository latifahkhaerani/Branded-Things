const { Category, Product } = require("../models");
class publicController {
  static async getProduct(req, res, next) {
    try {
      const products = await Product.findAll();

      // res.send(products);
      res.status(200).json({
        message: "Succeed read products",
        data: products,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async detailProduct(req, res, next) {
    try {
      const { id } = req.params;

      let detail = await Product.findByPk(id);

      if (!detail) {
        throw { name: "ID Not Found", id };
      }

      res.status(200).json({
        message: `Succeed read detail by id ${detail.id}`,
        data: detail,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getCategory(req, res, next) {
    try {
      let categories = await Category.findAll();
      // console.log(categories);
      console.log(categories, "categoery");
      res.status(200).json({
        message: "Succeed read categories",
        data: categories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = publicController;
