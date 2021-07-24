const Course = require("../models/courses.model")
const Step = require("../models/steps.model");

// Validation Middleware

// Checks if step exists
function stepExists(req, res, next) {
  const { stepId } = req.params;
  Step.findById(stepId, (err, step) => {
    if (err) return next();
    if (!step) return next({
      status: 404,
      message: `Step id ${req.params.stepId} cannot be found`
    });
    res.locals.step = step;
    next();
  });
}

// Router-level Middleware

// Create a Course
function create(req, res, next) {
  Course.create({ ...req.body }, (err, newCourse) => {
    if (err) return next(err);
    res.status(201).json({ message: "New Course Created", newCourse });
  });
}

// Fetch all courses
function list(req, res, next) {
  Course.find({}, (err, courses) => {
    if (err) return next(err);
    res.status(200).json({ courses });
  })
}

// Fetch Single Course
function read(req, res, next) {
  const courseId = req.params.courseId;
  Course.findById(courseId, (err, course) => {
    if (err) return next();
    if (!course) return next({
      status: 404,
      message: `Couses id ${courseId} cannot be found`
    });
    res.json({ course });
  });
}

// Update a single course (only updates course 'title')
function update(req, res, next) {
  const { title } = req.body;
  if (!title) return next({
    status: 400,
    message: "Title is required."
  });
  Course.findByIdAndUpdate(req.params.courseId, { title }, { new: true }, (err, course) => {
    if (err) return next(err);
    if (!course) return next({
      status: 400,
      message: `Course id ${req.params.courseId} cannot be found`
    });
    course.save((err, savedCourse) => {
      if (err) return next({
        status: 400,
        message: err.message
      });
      res.json({ message: "Course successfully updated", savedCourse });
    });
  });
}

// Add Step to Course
function addStep(req, res, next) {
  const { step } = res.locals;
  Course.findByIdAndUpdate(req.params.courseId, { $addToSet: { steps: step } }, {new: true}, (err, course) => {
    if (err) return next();
    if (!course) return next({
      status: 404,
      message: `Course id ${req.params.courseId} cannot be found`
    });
    course.save((err, savedCourse) => {
      if (err) return next({
        status: 400,
        message: err.message
      });
      res.json({ message: "Step added to course", savedCourse });
    });
  });
}

// Remove Step from Course
function removeStep(req, res, next) {
  const { step } = res.locals;
  Course.findByIdAndUpdate(req.params.courseId, { $pull: { steps: step._id } }, {new: true}, (err, course) => {
    if (err) return next();
    if (!course) return next({
      status: 404,
      message: `Course id ${req.params.courseId} cannot be found`
    });
    course.save((err, savedCourse) => {
      if (err) return next({
        status: 400,
        message: err.message
      });
      res.json({ message: "Step removed from course", savedCourse });
    });
  });
}

// Delete Single Course
function destroy(req, res, next) {
  Course.findByIdAndDelete(req.params.courseId, (err, course) => {
    if (err) return next();
    if (!course) return next({
      status: 400,
      message: `Course id ${req.params.courseId} cannot be found`
    });
    res.json({ message: "Course deleted successfully" });
  });
}

module.exports = {
  create,
  list,
  read,
  update,
  addStep: [stepExists, addStep],
  removeStep: [stepExists, removeStep],
  destroy,
}