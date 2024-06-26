function buildCriteria(query) {
  const result = {};
  if (query.name && query.name !== "") {
    result.name = { $regex: query.name, $options: "i" };
  }

  if (query.price) {
    const priceRange = query.price.split("-");
    if (priceRange.length === 2) {
      const minPrice = parseFloat(priceRange[0]);
      const maxPrice = parseFloat(priceRange[1]);

      if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice <= maxPrice) {
        result.price = { $gte: minPrice, $lte: maxPrice };
      } else {
        console.log(
          "Invalid price range: minPrice should be less than or equal to maxPrice"
        );
      }
    } else {
      console.log("Price range must be in the format 'minPrice-maxPrice'");
    }
  }

  if (query.isInStock && query.isInStock !== "") {
    const isInStock = query.isInStock === "true";
    if (isInStock) {
      result.quantity = { $gt: 0 };
    }
  }

  if (query.category) {
    const categories = query.category.split(",");
    const capitalizedCategories = categories.map((productCat) =>
      capitalize(productCat.trim())
    );
    const validateCategories = capitalizedCategories.filter(
      (category) => typeof category === "string" && category.trim() !== ""
    );

    result.category = { $in: validateCategories };
  }
  return result;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { buildCriteria };
