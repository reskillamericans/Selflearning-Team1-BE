const express = require("express");
const requestController = require("../controllers/requests.Controller");
const { authenticateUser } = require("../middlewares/authentication");
const methodNotAllowed = require("../errors/methodNotAllowed");
const router = express.Router();

router
  .route("/")
  .all(authenticateUser)
  .post(requestController.create)
  .get(requestController.fetch)
  .all(methodNotAllowed);

router
  .route("/:id")
  .all(authenticateUser)
  .get(requestController.fetchSingle)
  .patch(requestController.toggleStatus)
  .delete(requestController.delete)
  .all(methodNotAllowed);

module.exports = router;
