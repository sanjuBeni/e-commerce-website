const express = require("express");

const { registerUser, loginUser } = require("../controllers/UserController");

const router = express.Router();

// Create user
router.route("/register").post(registerUser);

// Login User

router.route("/login").post(loginUser);
module.exports = router;
