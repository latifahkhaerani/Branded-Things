const { Product, User, Category } = require("../models");

class productController {
  static async get(req, res, next) {
    try {
      const products = await Product.findAll();

      // res.send(products);
      res.status(200).json({
        message: "Succeed read producst",
        data: products,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async create(req, res, next) {
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
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      // console.log(req.params);
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
  static async update(req, res, next) {
    try {
      console.log(req.body);
      // console.log(req.params);
      const { id } = req.params;

      const { name, description, price, stock, imgUrl, categoryId, authorId } =
        req.body;

      let findProduct = await Product.findByPk(id);

      if (!findProduct) {
        throw { name: "ID Not Found", id };
      }
      await findProduct.update({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId,
      });

      res.status(200).json({
        message: `Succeed update product with id ${id}`,
        data: findProduct,
      });
    } catch (error) {
      console.log(error);
      next(error);
      // res.status(500).json({
      //   message: error,
      // });
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      let findtoDelete = await Product.findByPk(id);

      if (!findtoDelete) {
        throw { name: "ID Not Found", id };
      }
      await findtoDelete.destroy();

      res.status(200).json({
        message: `Succeed delete product with id ${findtoDelete.id}`,
        data: findtoDelete,
      });
    } catch (error) {
      console.log(error);
      next(error);
      // res.status(500).json({
      //   error,
      // });
    }
  }
}

module.exports = productController;
