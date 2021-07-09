const Step = require("../models/steps.model");
const Course = require("../models/courses.model");

// Create Step
function create(req, res, next) {
  Step.create({ ...req.body }, (err, newStep) => {
    if (err) return next(err);
    res.status(201).json({ message: "New step created", newStep })
  });
}

// Add Step to course
function addStep(req, res, next) {
  const { steps } = req.body;
  Course.findByIdAndUpdate(req.params.courseId, { steps }, (err, course) => {
    if (err) return next();
    if (!course) return next({
      status: 404,
      message: `Course id ${req.params.courseId} cannot be found`
    });
    course.save((err, savedCourse) => {
      if (err) return next({
        status: 400,
        message: err
      });
      res.json({ message: "Step added to course", savedCourse });
    });
  });
}

// Remove step from course
function removeStep(req, res, next) {
  const { steps } = req.body;
  Course.findByIdAndUpdate(req.params.courseId, { steps }, (err, course) => {
    if (err) return next();
    if (!course) return next({
      status: 404,
      message: `Course id ${req.params.courseId} cannot be found`
    });
    course.save((err, savedCourse) => {
      if (err) return next({
        status: 400,
        message: err
      });
      res.json({ message: "Step added to course", savedCourse });
    });
  });
}

// Fetch Steps
function list(req, res, next) {
  Step.find({}, (err, steps) => {
    if (err) return next();
    res.status(200).json({ steps });
  });
}

// Fetch Single Step
function read(req, res, next) {
  const stepId = req.params.stepId;
  Step.findById(stepId, (err, step) => {
    if (err) return next();
    if (!step) return next({
      status: 404,
      message: `Step id ${stepId} cannot be found`
    });
    res.json({ step });
  });
}

// Update Single Step
function update(req, res, next) {
  const { name } = req.body;
  Step.findByIdAndUpdate(req.params.stepId, { name }, (err, step) => {
    if (err) return next();
    if (!step) return next({
      status: 404,
      message: `Step id ${req.params.stepId} cannot be found`
    });
    step.save((err, savedstep) => {
      if (err) return next({
        status: 400,
        message: err
      });
      res.json({ message: "step successfaully updated", savedstep });
    });
  });
}

// Delete Single Step
function destroy(req, res, next) {
  Step.findByIdAndDelete(req.params.stepId, (err, step) => {
    if (err) return next();
    if (!step) return next({
      status: 400,
      message: `Step id ${req.params.stepId} cannot be found`
    });
    res.json({ message: "Step deleted successfully" })
  });
}


module.exports = {
  create,
  addStep,
  removeStep,
  list,
  read,
  update,
  destroy,
}