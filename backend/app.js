const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cros = require("cors");

const app = express();

app.use(cros());
app.use(express.json());
app.use(cookieParser());

// Route Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
