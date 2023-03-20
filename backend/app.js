const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Route Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
