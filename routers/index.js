const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const routerCategory = require("./category");
const routerProduct = require("./product");

const publicController = require("../controllers/publicController");
const {
  authentication,
  authenticationAdmin,
} = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/pub/product", publicController.getProduct);
router.get("/pub/category", publicController.getCategory);
router.get("/pub/:id", publicController.detailProduct);

router.post("/login", userController.login);

// authentication: penjaga gerbang pertama , penggunaan middleware secara global / app level
router.use(authentication);

router.post("/add-user", authenticationAdmin, userController.addUser);

router.use("/product", routerProduct);
router.use("/category", routerCategory);

module.exports = router;
