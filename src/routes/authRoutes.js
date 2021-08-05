const { Router } = require("express");
const express = require("express");
const router = express.Router();
const validateUser = require("../middlewares/validateUser");
const { body } = require("express-validator");

const authController = require("../controllers/authController");
router.post(
  "/signup",
  body("firstName").not().isEmpty().withMessage("Please enter your first name"),
  body("lastName").not().isEmpty().withMessage("Please enter your last name"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter a password at least 6 characters long"),
  body("role").not().isEmpty().withMessage("Please select a role"),
  validateUser,
  authController.registerNewUser
);

module.exports = router;
