const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.get);
router.post("/", productController.create);
router.get("/:id", productController.detail);
router.put("/:id", productController.update);
router.delete("/", productController.delete);



module.exports = router;
