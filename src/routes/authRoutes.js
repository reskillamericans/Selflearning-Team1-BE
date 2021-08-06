const { Router } = require('express');
const router = Router();
const validateUser = require('../middlewares/validateUser');
const authController = require('../controllers/authController');
const registrationSchema = require('../schemas/registrationSchema');

router.post('/signup', registrationSchema, validateUser, authController.signup);

module.exports = router;
