const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");
const { auth } = require("../middleware/auth");

router.post("/", auth, categoryController.create);
router.get("/", categoryController.readAll);

module.exports = router;
