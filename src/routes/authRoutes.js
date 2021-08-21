const { Router } = require('express');
const router = Router();
const validateUser = require('../middlewares/validateUser');
const authController = require('../controllers/authController');
const registrationSchema = require('../schemas/registrationSchema');

router.post('/login', authController.login);
router.post('/signup', registrationSchema, validateUser, authController.signup);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
