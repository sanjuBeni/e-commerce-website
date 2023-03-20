const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/ProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Create a new Product -- only Admin
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// Fetch All Product
router.route("/products").get(getAllProduct);

// Update Product -- Admin
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) // only admin
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct) // only admin
  .get(getProductDetails);

// Delete Product -- Admin
// router.route("/delete-product/:id").delete(deleteProduct);

module.exports = router;
