const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");

// Register a user
exports.registerUser = async (req, res) => {
  try {
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
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Enternal server error.", error });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking if user given password or email both

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please enter email & password" });

    // console.log(req.body);
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email & Password" });

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email & Password" });

    sendToken(user, 200, res);
    // res.status(200).json({ success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Enternal server error.", error });
  }
};
