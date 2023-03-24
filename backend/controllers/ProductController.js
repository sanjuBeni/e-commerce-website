const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError"); // this is used instead of try...catch block

// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id; // when we login the we save user data in req
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product }); // 201 create status
});

// Fetch Product
exports.getAllProduct = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({ success: true, products, productCount });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
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
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
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
});

// Get Product Detail
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // return res
    //   .status(500)
    //   .json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, product });
});

// Create new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

// Get all review of a product
exports.getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
