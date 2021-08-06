const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
  role: {
    type: String,
    required: true,
    enum: {
      values: ['student', 'mentor'],
      message: `Role must be either 'student' or 'mentor'`,
    },
  },
  passwordResetToken: String,
  passwordResetTokenExpiration: Date,
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

userSchema.methods.createResetToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  const encryptedToken = crypto.createHash('sha256').update(token).digest('hex');
  this.passwordResetToken = encryptedToken;
  this.passwordResetTokenExpiration = Date.now() + 600000;
  return token;
};

module.exports = mongoose.model('User', userSchema);
