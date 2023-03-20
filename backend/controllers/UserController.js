const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/sendToken");

// Register a user
exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "picurl",
    },
  });

  // const token = user.getJWTToken();
  sendToken(user, 201, res);
  // res.status(201).json({ success: true, token });
});

// Login a user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user given password or email both

  if (!email || !password)
    return next(new ErrorHandler("Please enter email & password", 400));
  // return res
  //   .status(400)
  //   .json({ success: false, message: "Please enter email & password" });

  // console.log(req.body);
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Email & Password", 401));
  // return res
  //   .status(401)
  //   .json({ success: false, message: "Invalid Email & Password" });

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch)
    return next(new ErrorHandler("Invalid Email & Password", 401));
  // return res
  //   .status(401)
  //   .json({ success: false, message: "Invalid Email & Password" });

  sendToken(user, 200, res);
  // res.status(200).json({ success: true, token });
});

// Logout

exports.logout = catchAsyncError(async (req, res, next) => {
  const option = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, option);

  res.status(200).json({ success: true, message: "Logged out successfully." });
});
