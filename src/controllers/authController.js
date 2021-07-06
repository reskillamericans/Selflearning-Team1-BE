const User = require("..models/user");
const bcrypt = require("bcrypt");
const { createToken} = require ("../services/jwtService")

exports.registerNewUser = {req, res} => {
    User.create(
        firstName: req.body.firstName,
        lastName: req.body.lastName,    
    ),
    (err, newUser) => {
        if (err) {
            return res.status(500).json({err});
        }
        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                return res.status(500).json({err});
            }
            bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({err});
                }
                newUser.password = hashedPassword;
                newUser.save((err, savedUser) => {
                    if (err) {
                        return res.status(500).json({err});
                    }
                    let token = createToken(newUser);
                    if (!token) {
                        return res.status(500).json({message: "Apologies, we cannot authenticate you. Please login",});
                    }

                    return res.status(200).json({
                        message: "Success! You are now registered.", token,
                    });
                })
            })
        } )
    }
}