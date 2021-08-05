const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "mentor"],
  },
});

module.exports = mongoose.model("User", userSchema);
