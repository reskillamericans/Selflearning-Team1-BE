const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  steps: {
    type: [Schema.Types.ObjectId],
    ref: "Step",
  },
  mentors: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  students: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;