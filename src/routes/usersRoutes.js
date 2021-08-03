const router = require("express").Router();
const controller = require("../controllers/userController");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { authenticateUser } = require("../middlewares/authentication");


router
  .route("/")
  .get(authenticateUser, controller.fetchUsers )
  .all(methodNotAllowed);



router
  .route("/:id")
  .get(authenticateUser, controller.fetchUserById)
  .all(methodNotAllowed);


  router
  .route("/:id")
  .get(authenticateUser, controller.fetchUsersProfile)
  .all(methodNotAllowed);

module.exports = router;
