const router = require("express").Router();
const controller = require("../controllers/steps.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:courseId/:stepId")
  .put(controller.addStep)
  .delete(controller.removeStep)
  .all(methodNotAllowed);

router
  .route("/:stepId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

module.exports = router;