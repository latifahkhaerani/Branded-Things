const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const routerCategory = require("./category");
const routerProduct = require("./product");
const publicController = require("../controllers/publicController");

router.use("/user", userController);

router.get("/pub/product", publicController.getProduct);
router.get("/pub/:id", publicController.detail);
router.get("/pub/category", publicController.getCategory);

router.use("/product", routerProduct);
router.use("/category", routerCategory);

module.exports = router;
