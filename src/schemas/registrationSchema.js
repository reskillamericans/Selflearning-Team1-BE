const { body } = require('express-validator');

/**
 * Validates input and checks that confirmation password matches password
 */
module.exports = [
  body('firstName').not().isEmpty().withMessage('Please enter your first name'),
  body('lastName').not().isEmpty().withMessage('Please enter your last name'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Please enter a password at least 6 characters long'),
  body('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Please retype your password')
    .custom((val, { req }) => {
      if (val !== req.body.password) throw new Error('Passwords do not match');
      return true;
    }),
  body('role')
    .not()
    .isEmpty()
    .isIn(['student', 'mentor'])
    .withMessage(`Invalid role. Select either 'student' or 'mentor'`),
];
