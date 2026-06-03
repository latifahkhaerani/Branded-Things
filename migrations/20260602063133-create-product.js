"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
          notEmpty: { msg: "name is required" },
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "description is required" },
          notEmpty: { msg: "description is required" },
        },
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "price is required" },
          notEmpty: { msg: "price is required" },
          min: {
            args: [10000],
            msg: "price minimum 1000",
          },
        },
      },

      stock: {
        type: Sequelize.INTEGER,
      },
      imgUrl: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "categoryId is required" },
        },
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "authorId is required" },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
