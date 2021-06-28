const mongoose = require('mongoose')
const Schema = mongoose.Schema
const coursesSchema = new Schema({
    title: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ["ux/ui design", "computer science", "database management", "frontend development", "information systems"]
    },
    url: {
        type: String,
        required: true
    }
})


const Course = mongoose.model('Course', coursesSchema)
module.exports = Course
