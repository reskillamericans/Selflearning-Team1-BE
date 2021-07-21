const router = require("express").Router();
const controller = require("../controllers/courses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { authenticateUser } = require("../middlewares/authentication");

router
  .route("/:courseId/:stepId")
  .put(authenticateUser, controller.addStep)
  .delete(authenticateUser, controller.removeStep)
  .all(methodNotAllowed);

router
  .route("/:courseId")
  .put(authenticateUser, controller.update)
  .all(methodNotAllowed);

router
  .route("/")
  .post(authenticateUser, controller.create)
  .all(methodNotAllowed);

module.exports = router;