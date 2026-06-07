const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");

beforeAll(async () => {
  // restart category before seeding
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  // seeding products
  let product = require("../datas/products.json");
  product.forEach((el) => {
    el.updatedAt = el.createdAt = new Date();
  });

  // seeding categories
  let category = require("../datas/categories.json");
  category.forEach((el) => {
    el.updatedAt = el.createdAt = new Date();
  });

  await sequelize.queryInterface.bulkInsert("Products", product);
  await sequelize.queryInterface.bulkInsert("Categories", category);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Products", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// get data tanpa query
describe("GET /pub/product", () => {
  describe("Succeed get list product without query filter", () => {
    test("should return an object with message, page, list product, total data, total page, and data per page", async () => {
      const response = await request(app).get("/pub/product");
      //   console.log(response.body.data.data, "<<<<<<");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Succeed read products");
      expect(response.body).toHaveProperty("data", expect.any(Object));
      expect(response.body.data).toHaveProperty("page", expect.any(Number));
      expect(response.body.data).toHaveProperty("data", expect.any(Array));
      expect(response.body.data).toHaveProperty(
        "totalData",
        expect.any(Number),
      );
      expect(response.body.data).toHaveProperty(
        "dataPerPage",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "id",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "name",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "description",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "price",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "stock",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "imgUrl",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "categoryId",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "authorId",
        expect.any(Number),
      );
    });
  });
});

// dengan query
describe("GET /pub/public?filter=Pants", () => {
  describe("Succeed get list product with query filter by category", () => {
    test("should return an object with message, page, list product, total data, total page, and data per page", async () => {
      const response = await request(app).get("/pub/product");
      //   console.log(response.body.data.data, "<<<<<<");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Succeed read products");
      expect(response.body).toHaveProperty("data", expect.any(Object));
      expect(response.body.data).toHaveProperty("page", expect.any(Number));
      expect(response.body.data).toHaveProperty("data", expect.any(Array));
      expect(response.body.data).toHaveProperty(
        "totalData",
        expect.any(Number),
      );
      expect(response.body.data).toHaveProperty(
        "dataPerPage",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "id",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "name",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "description",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "price",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "stock",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "imgUrl",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "categoryId",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "authorId",
        expect.any(Number),
      );
    });
  });
});

describe("GET /pub/product/public?page=2", () => {
  describe("Succeed get list product with query page", () => {
    test("should return an object with message, page, list product, total data, total page, and data per page", async () => {
      const response = await request(app).get("/pub/product?page=2");
      //   console.log(response.body.data.data, "<<<<<<");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Succeed read products");
      expect(response.body).toHaveProperty("data", expect.any(Object));
      expect(response.body.data).toHaveProperty("page", expect.any(Number));
      expect(response.body.data).toHaveProperty("data", expect.any(Array));
      expect(response.body.data).toHaveProperty(
        "totalData",
        expect.any(Number),
      );
      expect(response.body.data).toHaveProperty(
        "dataPerPage",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "id",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "name",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "description",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "price",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "stock",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "imgUrl",
        expect.any(String),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "categoryId",
        expect.any(Number),
      );
      expect(response.body.data.data[0]).toHaveProperty(
        "authorId",
        expect.any(Number),
      );
    });
  });
});

// detail
describe("GET /pub/product/:id", () => {
  describe("Succeed get detail product by id", () => {
    test("should return an object with message and data product", async () => {
      const response = await request(app).get("/pub/product/1");
      //   console.log(response.body.data.data, "<<<<<<");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Succeed read detail by id 1",
      );
      expect(response.body).toHaveProperty("data", expect.any(Object));

      expect(response.body.data).toHaveProperty("id", expect.any(Number));
      expect(response.body.data).toHaveProperty("name", expect.any(String));
      expect(response.body.data).toHaveProperty(
        "description",
        expect.any(String),
      );
      expect(response.body.data).toHaveProperty("price", expect.any(Number));
      expect(response.body.data).toHaveProperty("stock", expect.any(Number));
      expect(response.body.data).toHaveProperty("imgUrl", expect.any(String));
      expect(response.body.data).toHaveProperty(
        "categoryId",
        expect.any(Number),
      );
      expect(response.body.data).toHaveProperty("authorId", expect.any(Number));
    });
  });
});
