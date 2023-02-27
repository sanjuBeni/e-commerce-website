const express = require("express");
const {
  getAllProduct,
  createProduct,
} = require("../controllers/ProductController");

const router = express.Router();

// Create a new Product -- only Admin
router.route("/create-product").post(createProduct);

// Fetch All Product
router.route("/fetch-products").get(getAllProduct);

module.exports = router;
