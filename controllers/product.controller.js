const fs = require("fs");
const PRODUCTS = require("../data/data.json");
const { json } = require("express");

function getProducts(req, res) {
  res.status(200).json(PRODUCTS);
}

function getProductById(req, res) {
  const { id } = req.params;

  const product = PRODUCTS.find((product) => {
    return product._id === id;
  });

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  res.status(200).json(product);
}

function deleteProduct(req, res) {
  const { id } = req.params;

  const products = [...PRODUCTS];
  const productIndex = products.findIndex((product) => {
    return product._id === id;
  });

  if (productIndex === -1) {
    return res.status(404).json({ message: "product not found" });
  }
  products.splice(productIndex, 1);
  fs.writeFileSync("./data/data.json", JSON.stringify(products));
  res.status(200).json({ message: "Product deleted" });
}

function createProduct(req, res) {
  const products = [...PRODUCTS, req.body];
  fs.writeFileSync("./data/data.json", JSON.stringify(products));
  res.status(201).json({ message: "Product added" });
}

function updateProduct(req, res) {
  const { _id } = req.body;

  const productIndex = PRODUCTS.findIndex((product) => {
    return product._id === _id;
  });

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const products = [...PRODUCTS];
  products[productIndex] = req.body;
  fs.writeFileSync("./data/data.json", JSON.stringify(products));
  res.status(200).json({ message: "Product updated" });
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
