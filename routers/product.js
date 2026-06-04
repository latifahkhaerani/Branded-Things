const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authorization = require("../middlewares/authorization");
const upload = require("../utils/multers");

router.get("/", productController.get);
router.post("/", productController.create);
router.get("/:id", authorization, productController.detail);
router.put("/:id", authorization, productController.update);
router.delete("/:id", authorization, productController.delete);
router.patch(
  "/upload-image/:id",
  authorization,
  upload.single("img"),
  productController.uploadImg,
);

module.exports = router;
