const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  console.log(err.message);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Enternal server error.";

  // Wrong mongodb id error => cast error

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
  next();
};
