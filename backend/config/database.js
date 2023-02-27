const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true, // It is not support error read all key bcz this is new
    })
    .then((data) => {
      console.log(`Mongodb connect with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
