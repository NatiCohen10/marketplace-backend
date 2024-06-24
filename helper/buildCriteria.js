function buildCriteria(query) {
  const result = {};
  if (query.name && query.name !== "") {
    result.name = { $regex: query.name, $options: "i" };
  }

  if (query.minPrice || query.maxPrice) {
    result.price = {};
    if (query.minPrice) {
      const minPrice = parseFloat(query.minPrice);
      if (!isNaN(minPrice)) {
        result.price.$gte = minPrice;
      }
    }
    if (query.maxPrice) {
      const maxPrice = parseFloat(query.maxPrice);
      if (!isNaN(maxPrice)) {
        result.price.$lte = maxPrice;
      }
    }
  }

  if (query.isInStock && query.isInStock !== "") {
    const isInStock = query.isInStock === "true";
    if (isInStock) {
      result.quantity = { $gt: 0 };
    }
  }

  return result;
}

module.exports = { buildCriteria };
