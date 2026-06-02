const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.post("/", categoryController.create);
router.get("/", categoryController.get);
router.put("/:id", categoryController.update);



module.exports = router;
