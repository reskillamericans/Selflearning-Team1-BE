const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
});

const Step = mongoose.model("Step", stepSchema);

module.exports = Step;
