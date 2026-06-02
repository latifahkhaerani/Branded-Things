const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.get);
router.post("/", productController.create);
router.get("/:id", productController.detail);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
