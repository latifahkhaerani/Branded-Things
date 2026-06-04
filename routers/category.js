const express = require("express");
const categoryController = require("../controllers/categoryController");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.post("/", categoryController.create);
router.get("/", categoryController.get);
router.put("/:id", authorization, categoryController.update);

module.exports = router;
