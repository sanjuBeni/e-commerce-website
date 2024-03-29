const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// Config path
dotenv.config({ path: "backend/config/config.env" });

// Handling Uncaught Exception => undefine variable type error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Exception`);
  process.exit(1);
});

// ConnectDatabase
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection and unhandledRejection is event name
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
