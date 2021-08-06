const User = require('../models/user');
const { createToken } = require('../services/jwtService');

module.exports = async (req, res) => {
  try {
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
