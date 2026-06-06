const { Category } = require("../models");

class categoryController {
  static async get(req, res, next) {
    try {
      let categories = await Category.findAll();
      // console.log(categories);
      res.status(200).json({
        message: "Succeed read categories",
        data: categories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      // console.log(req.body);
      const { name } = req.body;

      let createCategory = await Category.create({ name });

      res.status(201).json({
        message: "Succeed add new category!",
        data: createCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      // console.log(req.body,'<<<<');
      let findToUpdate = await Category.findByPk(id);

      if (!findToUpdate) {
        throw { name: "NotFound", id };
      }

      await findToUpdate.update({ name });

      // console.log(findToUpdate, "berhasil update");
      res.status(200).json({
        message: `Succeed update category with id ${id}`,
        data: findToUpdate,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = categoryController;
