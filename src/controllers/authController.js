const User = require('../models/user');
const { createToken } = require('../services/jwtService');

exports.signup = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Email is already registered, please log in' });
    }
    const user = await User.create({ ...req.body });
    const token = createToken(user);
    res.status(201).json({
      status: 'success',
      token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
