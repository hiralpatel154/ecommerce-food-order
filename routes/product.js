const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const upload = require("../middleware/multer");
const productController = require("../controllers/product");

router.post("/", auth, upload.single("productImage"), productController.create);

router.get("/", productController.readAll);
router.get("/count", productController.readByCount);
router.get("/:productId", productController.read);
router.put(
  "/:productId",
  auth,
  upload.single("productImage"),
  productController.update
);
router.delete("/:productId", auth, productController.delete);

module.exports = router;
