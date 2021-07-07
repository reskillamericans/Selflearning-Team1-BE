const User = require("..models/user");
const bcrypt = require("bcrypt");
const { createToken} = require ("../services/jwtService")

exports.registerNewUser = {req, res} => {

    if (!req.body.firstName) {
        return res.status(400).json({message: 'Please enter your first name'})
    } else if (!req.body.lastName) {
        return res.status(400).json({message: 'Please enter your last name'})
    } else if (!req.body.email) {
        return res.status(400).json({message: 'Please enter your email address'})
    }

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
     }),
    (err, newUser) => {
        if (err) {
            return res.status(500).json({err});
        }  else {
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
     } )}
    }
}