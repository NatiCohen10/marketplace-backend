const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductsCount,
} = require("../controllers/product.controller");
const { verifyToken } = require("../middleware/createProduct.middleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/count", getProductsCount);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", verifyToken, createProduct);
router.patch("/:id", updateProduct);

module.exports = router;
