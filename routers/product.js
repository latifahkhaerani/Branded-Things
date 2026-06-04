const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authorization = require("../middlewares/authorization");

router.get("/", productController.get);
router.post("/", productController.create);
router.get("/:id", authorization, productController.detail);
router.put("/:id", authorization, productController.update);
router.delete("/:id", authorization, productController.delete);

module.exports = router;
