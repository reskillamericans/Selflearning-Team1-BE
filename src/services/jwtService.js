const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY);

exports.createToken = (user) => {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      secret,
      { expiresIn: expiry }
    );
    return token;
  } catch (err) {
    return null;
  }
};

exports.decodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
