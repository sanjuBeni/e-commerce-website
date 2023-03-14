const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
// const catchAsyncError = require("../middleware/catchAsyncError");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product }); // 201 create status
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Enternal server error.", error });
  }
};

// Fetch Product
exports.getAllProduct = async (req, res) => {
  try {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apifeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apifeature.query;
    res.status(200).json({ success: true, products, productCount });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Enternal server error." });
  }
};

// Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 500));
      // return res
      //   .status(500)
      //   .json({ success: false, message: "Product not found." });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Enternal server error." });
  }
};

// Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 500));
      // return res
      //   .status(500)
      //   .json({ success: false, message: "Product not found." });
    }

    await product.remove();

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Enternal server error." });
  }
};

// Get Product Detail
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
      // return res
      //   .status(500)
      //   .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Enternal server error." });
  }
};
