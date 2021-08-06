const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;
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
    minLength: [6, 'Password must be at least 6 characters long'],
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'The passwords do not match',
    },
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'mentor'],
  },
});

userSchema.pre('save', function (next) {
  // make sure we don't re-hash when user updates fields other than password
  if (!this.isModified('password')) return next();
  const password = this.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    this.confirmPassword = undefined;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
