const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

// Middleware for error
app.use(errorMiddleware);

// Route Import
const product = require("./routes/productRoute");
app.use("/api/v1", product);

module.exports = app;
