const { where, Op } = require("sequelize");
const { Category, Product } = require("../models");
class publicController {
  static async getProduct(req, res, next) {
    try {
      // search:
      const { search, sort, filter, limit = 10, page = 1 } = req.query;

      const options = {
        where: {},
        // feature sort
        order: [],
        // pagination
        offset: +limit * (+page - 1),
        limit: +limit,
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      };

      // feature : search
      if (search) {
        options.where.name = { [Op.iLike]: `%${search}%` };
      }

      //  feature : sorting
      if (sort) {
        //! sorting
        let parSort = sort[0] === "-" ? "DESC" : "ASC";
        let sortBy = parSort === "DESC" ? sort.slice(1) : sort;
        options.order = [[sortBy, parSort]];

        // validasi field yg boleh di-sort
        if (!["name", "price", "createdAt"].includes(sortBy)) {
          throw { name: "BadRequestInput" };
        }

        options.order = [[sortBy, parSort]];
      }

      //feature : filter product by its category
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

        options.where.categoryId = { [Op.in]: getIdCategory };
        // console.log(result, "product apa");
      }

      // feature : pagination
      let { count, rows } = await Product.findAndCountAll(options);

      let data = {
        page: +page,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: +limit,
      };

      // console.log(products, "<<<");

      res.status(200).json({
        message: "Succeed read products",
        data,
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
