const router = require("express").Router();
const controller = require("../controllers/userController");
const methodNotAllowed = require("../errors/methodNotAllowed");
const { authenticateUser } = require("../middlewares/authentication");


router
  .route("/")
  .get( controller.fetchUsers )
  .all(methodNotAllowed);

  router
  .route("/profile")
  .get(authenticateUser, controller.fetchUsersProfile)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get( controller.fetchUserById)
  .all(methodNotAllowed);


 

module.exports = router;
