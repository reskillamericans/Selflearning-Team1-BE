const router = require("express").Router();
const controller = require("../controllers/steps.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { authenticateUser } = require("../middlewares/authentication");

router
  .route("/:courseId/:stepId")
  .put(authenticateUser, controller.addStep)
  .delete(authenticateUser, controller.removeStep)
  .all(methodNotAllowed);

router
  .route("/:stepId")
  .get(authenticateUser, controller.read)
  .put(authenticateUser, controller.update)
  .delete(authenticateUser, controller.destroy)
  .all(methodNotAllowed);

router
  .route("/")
  .post(authenticateUser, controller.create)
  .get(authenticateUser, controller.list)
  .all(methodNotAllowed);

module.exports = router;