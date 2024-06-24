const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductsCount,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/count", getProductsCount);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);
router.patch("/:id", updateProduct);

module.exports = router;
