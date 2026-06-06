const app = require("../app");
const request = require("supertest");
const { User, Product, Category } = require("../models");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");

// bikin seeding before all
let adminToken;
let staffToken;
let staff2Token;
let productId;

beforeAll(async () => {
  await sequelize.queryInterface.bulkDelete("Products", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  try {
    let dataAdmin = {
      username: "admin",
      email: "admin@mail.com",
      password: "password123",
      role: "Admin",
      phoneNumber: "081234567890",
      address: "Jakarta",
    };

    let createAdmin = await User.create(dataAdmin);

    adminToken = signToken({
      id: createAdmin.id,
      email: createAdmin.email,
      role: createAdmin.role,
    });

    //   console.log(adminToken, "<<<<<<");

    //   user
    let dataStaff = {
      username: "john",
      email: "john@example.com",
      password: "password123",
      role: "Staff",
      phoneNumber: "081377788899",
      address: "Surabaya",
    };
    let createStaff = await User.create(dataStaff);

    staffToken = signToken({
      id: createStaff.id,
      email: createStaff.email,
      role: createStaff.role,
    });

    let dataStaff2 = {
      username: "jane",
      email: "jane@example.com",
      password: "password123",
      role: "Staff",
      phoneNumber: "081234567899",
      address: "Surabaya",
    };
    let createStaff2 = await User.create(dataStaff2);

    staff2Token = signToken({
      id: createStaff2.id,
      email: createStaff2.email,
      role: createStaff2.role,
    });

    // cat
    const category = await Category.create({
      name: "T-Shirt",
    });

    // product
    const product = await Product.create({
      name: "H&M Basic Crew Neck T-Shirt",
      description:
        "Soft cotton t-shirt with a classic crew neck design for a clean and versatile look.",
      price: 149000,
      stock: 40,
      imgUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      categoryId: category.id,
      authorId: createStaff.id,
    });

    productId = product.id;
  } catch (error) {
    console.log(error);
  }
});
// bikin seeding after all
afterAll(async () => {
  await User.destroy({
    truncate: true, // menghapus semua data di table Movies
    restartIdentity: true, // mengatur ulang auto increment key pada primary key
    cascade: true, // jika ada relasi foreignkey pada table lain, maka akan dihapus
  });

  await sequelize.queryInterface.bulkDelete("Products", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// post
describe("POST /product", () => {
  describe("Positive test case - succeed create product", () => {
    test("should return an object with message and data product", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 199000,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
        // authorId: createStaff.id,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      //   console.log(response, "<<<<<<");

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);

      expect(response.body).toHaveProperty(
        "message",
        "Succeed Add New Product!",
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
      //   expect(response.body.data).toHaveProperty("authorId", expect.any(Number));
    });
  });

  describe("Negative test case - failed create product", () => {
    // jika tidak login
    test("should return an object with error message", async () => {
      const response = await request(app).post("/product");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthorized");
    });
    // jika token salah
    test("should return an object with error message", async () => {
      const response = await request(app)
        .post("/product")
        .set("Authorization", `Bearer ngasal`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
  // jika req body tidak sesuai
  describe("Input Validation", () => {
    // 1. name kosong
    test("should return an object with error message", async () => {
      const body = {
        name: "",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 199000,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "name is required");
    });
    // 2. desc kosong
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description: "",
        price: 199000,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "description is required",
      );
    });
    // 3. price kosong
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: null,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "price is required");
    });
    // 4. price under 5k
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 500,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "price min 5000");
    });
    // 5. stock 0
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 5000,
        stock: 0,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Validation min on stock failed",
      );
    });
    // 5. imageUrl null
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 5000,
        stock: 1,
        imgUrl: null,
        categoryId: 1,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Product.imgUrl cannot be null",
      );
    });
    // 5. categoryId null
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 5000,
        stock: 1,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: null,
      };
      const response = await request(app)
        .post("/product")
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "categoryId is required");
    });
  });
});

// update
describe("UPDATE: PUT /product/id", () => {
  describe("Positive test case - succeed update product", () => {
    test("should return an object with message and data product", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 199000,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      //   console.log(response, "<<<<<<");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);

      expect(response.body).toHaveProperty(
        "message",
        `Succeed update product with id ${productId}`,
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
  //<<<<<<<<<<<negative test>>>>>>>>>>>
  describe("Negative test case - failed update product", () => {
    // jika tidak login
    test("should return an object with error message", async () => {
      const response = await request(app).put(`/product/${productId}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthorized");
    });
    // jika token salah
    test("should return an object with error message", async () => {
      const response = await request(app)
        .put(`/product/${productId}`)
        .set("Authorization", `Bearer ngasal`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
  //<<<<<<<<<<<input validation test>>>>>>>>>>>
  describe("Input Validation", () => {
    // 1. name kosong
    test("should return an object with error message", async () => {
      const body = {
        name: "",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 199000,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "name is required");
    });
    // 2. desc kosong
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description: "",
        price: 199000,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "description is required",
      );
    });
    // 3. price kosong
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: null,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "price is required");
    });
    // 4. price under 5k
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 500,
        stock: 50,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "price min 5000");
    });
    // 5. stock 0
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 5000,
        stock: 0,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: 1,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Validation min on stock failed",
      );
    });
    // 5. imageUrl null
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 5000,
        stock: 1,
        imgUrl: null,
        categoryId: 1,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Product.imgUrl cannot be null",
      );
    });
    // 5. categoryId null
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 5000,
        stock: 1,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: null,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "categoryId is required");
    });
    // 6. update bukan miliknya
    test("should return an object with error message", async () => {
      const body = {
        name: "Uniqlo Oversized T-Shirt",
        description:
          "Premium cotton oversized t-shirt with a relaxed fit, suitable for everyday casual wear.",
        price: 5000,
        stock: 1,
        imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: null,
      };
      const response = await request(app)
        .put(`/product/${productId}`)
        .send(body)
        .set("Authorization", `Bearer ${staff2Token}`);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty(
        "message",
        "You don't have any access",
      );
    });
  });
});

// delete
describe("DELETE /product/:id", () => {
  describe("Data ownership invalid", () => {
    test("should return an object with message invalid", async () => {
      const response = await request(app)
        .delete(`/product/${productId}`)
        .set("Authorization", `Bearer ${staff2Token}`);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty(
        "message",
        "You don't have any access",
      );
    });
  });
  describe("Positive test case - succeed delete product", () => {
    test("should return an object with message and data product", async () => {
      const response = await request(app)
        .delete(`/product/${productId}`)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);

      expect(response.body).toHaveProperty(
        "message",
        `Product with id ${productId} success to delete`,
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
  describe("Negative test case - failed delete product", () => {
    // jika tidak login
    test("should return an object with error message", async () => {
      const response = await request(app).delete(`/product/${productId}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthorized");
    });
    // jika token salah
    test("should return an object with error message", async () => {
      const response = await request(app)
        .delete(`/product/${productId}`)
        .set("Authorization", `Bearer ngasal`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });
  describe("Input Validation", () => {
    test("should return an object with error message", async () => {
      const response = await request(app)
        .delete(`/product/9999`)
        .set("Authorization", `Bearer ${staffToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "Data with id undefined not found",
      );
    });
  });
});
