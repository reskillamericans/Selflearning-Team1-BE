const User = require("..models/user");

exports.registerNewUser = {req, res} => {
    User.create(
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
    
    ),
    (err, newUser) => {
        if (err) {
            return res.status(500).json({err});
        }
    }
}