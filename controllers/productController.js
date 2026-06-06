const { Product, User } = require("../models");
const ImageKit = require("@imagekit/nodejs");

class productController {
  static async get(req, res, next) {
    try {
      const products = await Product.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
      });

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
  static async create(req, res, next) {
    try {
      const { authorId } = req.loginInfo;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

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

      res.status(201).json({
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
        throw { name: "NotFound", id };
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
      // console.log(req.body);
      // console.log(req.params);
      const { id } = req.params;

      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      let findProduct = await Product.findByPk(id);

      if (!findProduct) {
        throw { name: "NotFound", id };
      }
      await findProduct.update({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
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
        throw { name: "NotFound", id };
      }
      await findtoDelete.destroy();

      res.status(200).json({
        message: `Product with id ${findtoDelete.id} success to delete`,
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
  static async uploadImg(req, res, next) {
    try {
      const { id } = req.params;

      let findProduct = await Product.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // console.log(findProduct, "isi apa?");
      if (!findProduct) {
        throw { name: "NotFound" };
      }

      //image kit process masukin disini
      // console.log(req.file, "filenyaaaa");
      const client = new ImageKit({
        privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
      });

      // console.log(req.file.buffer, "filenyaaaa");
      if (!req.file) {
        throw { name: "ImageRequired" };
      }

      const response = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(req.file.buffer), "img"),
        fileName: req.file.originalname,
      });

      // console.log(response,'responnya'); //ada url

      // finish process imageKit

      //setelah dapat url, pake urlnya untuk update gambar
      let updateImage = await findProduct.update({
        imgUrl: response.url,
      });

      res.status(200).json({
        message: `Image ${req.file.originalname} succeed to update!`,
        imgUrl: response.url,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = productController;
