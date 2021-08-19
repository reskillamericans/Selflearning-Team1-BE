const { decodeToken } = require("../services/jwtService");

exports.authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "authorization required" });
  }
  let splittedHeader = req.headers.authorization.split(" ");

  if (splittedHeader[0] != "Bearer") {
    return re
      .status(401)
      .json({ message: "authorization format is Bearer <token>" });
  }
  let token = splittedHeader[1];

  let decodedToken = decodeToken(token);
  console.log( decodedToken)
  if (!decodedToken) {
    return res
      .status(401)
      .json({ message: "invalid authorization token - please login" });
  }
  req.user = decodedToken;
  next();
};

exports.isAuthenticated = (req,res,next) =>{
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "authorization required" });
  }
  if ( !req.user){
    return res.status(401).json({ message: "authorization required" });

  }
  next();
}