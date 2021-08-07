const { validationResult } = require('express-validator');

const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            message: 'One or more missing or invalid fields.',
            errors: errors.array(),
        });
    }
    next();
};

module.exports = validateUser;
