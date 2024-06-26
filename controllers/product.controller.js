const { buildCriteria } = require("../helper/buildCriteria");
const Product = require("../models/products.model");

async function getProductsCount(req, res) {
  const { query } = req;
  const criteria = buildCriteria(query);
  try {
    const count = await Product.countDocuments(criteria);
    res.json({ count });
  } catch (error) {
    console.log(
      "product.contoller, getProductsCount. Error while getting products count",
      error
    );
    res.status(500).json({ message: error.message });
  }
}

async function getProducts(req, res) {
  const { query } = req;
  const criteria = buildCriteria(query);
  let page = parseInt(query.page) || 1;
  if (page < 1) page = 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find(criteria).skip(skip).limit(limit);
    res.json({ products, limit });
  } catch (error) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      error
    );
    res.status(500).json({ message: error.message });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    if (error.name === "CastError") {
      console.log(
        `product.controller, getProductById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "robot not found" });
    }
    console.log(
      `product.controller, getProductById. Error while getting product with id: ${id}`,
      error.name
    );
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log(
        `product.controller, deleteProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.log(
      `product.controller, deleteProduct. Error while deleting product with id: ${id}`
    );
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  const productToAdd = req.body;
  const newProduct = new Product(productToAdd);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      error
    );

    if (error.name === "ValidationError") {
      console.log(`product controller, createProduct. ${error.message}`);
      res.status(400).json({ message: error.message });
    } else {
      console.log(`product controller, createProduct. ${error.message}`);
      res.status(500), json({ message: "server error while creating robot" });
    }
  }
}

async function updateProduct(req, res) {
  const { id } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      error
    );

    if (error.name === "ValidationError") {
      console.log(`product controller, createProduct. ${error.message}`);
      res.status(400).json({ message: error.message });
    } else {
      console.log(`product controller, createProduct. ${error.message}`);
      res.status(500), json({ message: "server error while creating robot" });
    }
  }
}

module.exports = {
  getProductsCount,
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
