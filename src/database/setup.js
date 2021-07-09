require("dotenv").config();
// set up mongoose
const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/bookstore";

// connect application to database
module.exports = () => {
  mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  }, (err) => {
    if (err) return console.log(err);
    console.log("Database Connection is Successful!");
    }
  );
}