const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const { sequelize } = require("../models");

// seeding user
beforeAll(async () => {
  // to avoid email have been used in db
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  const data = {
    username: "admin",
    email: "admin@store.com",
    password: "password123",
    phoneNumber: "081234567890",
    address: "Jakarta",
  };

  await User.create(data);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  describe("Positive test case - succeed login", () => {
    test("should return an object with message and access token", async () => {
      const body = { email: "admin@store.com", password: "password123" };
      const response = await request(app).post("/login").send(body);
      //   console.log(response);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "success login");
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Negative test case - failed login", () => {
    // jika email kosong
    test("should return an object with error message", async () => {
      const body = { email: "", password: "password123" };
      const response = await request(app).post("/login").send(body);
      //   console.log(response);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Please input email or password",
      );
    });
    // jika password kosong
    test("should return an object with error message", async () => {
      const body = { email: "admin@store.com", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Please input email or password",
      );
    });
  });

  describe("Input Validation", () => {
    // jika email tidak valid
    test("should return an object with error message", async () => {
      const body = { email: "ain@store.com", password: "password123" };
      const response = await request(app).post("/login").send(body);
      //   console.log(response);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email or password",
      );
    });
    // jika pass tidak valid
    test("should return an object with error message", async () => {
      const body = { email: "admin@store.com", password: "passrd123" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email or password",
      );
    });
  });
});
