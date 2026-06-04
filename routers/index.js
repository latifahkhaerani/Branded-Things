const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const routerCategory = require("./category");
const routerProduct = require("./product");

const publicController = require("../controllers/publicController");
const authentication = require("../middlewares/authentication");

router.get("/pub/product", publicController.getProduct);
router.get("/pub/category", publicController.getCategory);
router.get("/pub/:id", publicController.detailProduct);

router.post("/add-user", userController.addUser);
router.post("/login", userController.login);

// authentication: penjaga gerbang pertama , penggunaan middleware secara global / app level
router.use(authentication); 

router.use("/product", routerProduct);
router.use("/category", routerCategory);

module.exports = router;
