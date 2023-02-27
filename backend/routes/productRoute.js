const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/ProductController");

const router = express.Router();

// Create a new Product -- only Admin
router.route("/product/new").post(createProduct);

// Fetch All Product
router.route("/products").get(getAllProduct);

// Update Product -- Admin
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

// Delete Product -- Admin
// router.route("/delete-product/:id").delete(deleteProduct);

module.exports = router;
