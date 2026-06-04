const { where, Op } = require("sequelize");
const { Category, Product } = require("../models");
class publicController {
  static async getProduct(req, res, next) {
    try {
      // search:
      const { search, sort, filter } = req.query;

      const options = {
        where: {},
        // feature sort
        order: [
          sort === "oldest" ? ["createdAt", "ASC"] : ["createdAt", "DESC"],
        ],
      };
      // console.log(products, "<<<");
      const products = await Product.findAll(options, {
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      if (search) {
        options.where.name = { [Op.iLike]: `%${search}%` };
      }

      //tambahan validasi
      if (products.length == 0) {
        throw { name: "DataEmpty" };
      }

      // sorting (samaji)
      // if (sort === "oldest") {
      //   options.order.push(["createdAt", "ASC"]);
      // } else {
      //   // urutkan dari yang terbaru
      //   options.order.push(["createdAt", "DESC"]);
      // }

      //filter product by its category
      if (!filter) {
        throw { name: "DataEmpty" };
      }

      if (filter) {
        let searchCategory = await Category.findAll({
          where: {
            name: { [Op.iLike]: `%${filter}%` },
          },
        });

        // console.log(searchCategory[0].id, "apa isi");
        let getIdCategory = searchCategory.map((el) => {
          return el.dataValues.id;
        });
        // console.log(getIdCategory, "idnya?");

        let result = await Product.findAll({
          where: { categoryId: { [Op.in]: getIdCategory } },
        });
        // console.log(result, "product apa");
      }

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
