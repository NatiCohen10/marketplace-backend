const mongoose = require("mongoose");

const productScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 100,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productScheme);

module.exports = Product;
