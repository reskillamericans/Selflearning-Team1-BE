const router = require("express").Router();
const controller = require("../controllers/userController");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { authenticateUser } = require("../middlewares/authentication");

router
  .route("/users")
  .get(authenticateUser)
  .all(methodNotAllowed);

router
  .route("/users/:Id")
  .get(authenticateUser)
  .all(methodNotAllowed);

router
  .route("/users/:Id")
  .post(authenticateUser)
  .all(methodNotAllowed);

module.exports = router;
