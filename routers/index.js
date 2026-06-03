const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/userController");
const routerCategory = require("./category");
const routerProduct = require("./product");
const publicController = require("./public");

router.use("/user", userController);

router.use("/pub", publicController);

router.use("/product", routerProduct);
router.use("/category", routerCategory);

module.exports = router;
