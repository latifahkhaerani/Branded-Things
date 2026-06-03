const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");

router.get("/product", publicController.getProduct);
router.get("/category", publicController.getCategory);
router.get("/:id", publicController.detailProduct);

module.exports = router;
