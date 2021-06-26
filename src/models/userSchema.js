const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
         required: true
        },
        lastName: {
            type: String,
             required: true
            },
            email: {
                type: String,
                 required: true,
                  unique: true
                },
                password: {
                    type: String,
                     required: true
                    },
                    role: {
                        type: String,
                         required: true,
                          enum: ["student", "mentor", "admin"],
                            select: ["student", "mentor"]
                        }

}); 


const User = mongoose.model('User', userSchema)
module.exports = User