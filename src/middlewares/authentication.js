const { restart } = require("nodemon");
const { decodeToken } = require("../services/jwtService");

exports.authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "authorization required" });
  }
  let splittedHeader = req.headers.authorization.split(" ");

  if (splittedHeader[0] != "Bearer") {
    return res
      .status(401)
      .json({ message: "authorization format is Bearer <token>" });
  }
  let token = splittedHeader[1];

  let decodedToken = decodeToken(token);

  if (!decodedToken) {
    return res
      .status(401)
      .json({ message: "invalid authorization token - please login" });
  }
  req.user = decodedToken;
  next();
};
