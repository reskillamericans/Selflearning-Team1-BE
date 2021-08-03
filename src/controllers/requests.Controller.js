const Step = require("../models/steps.model");
const Request = require("../models/requests.model");

exports.create = async (req, res, next) => {
  try {
    // validate step id
    const stepId = req.body.stepId;
    const step = await Step.findById(stepId);
    if (!stepId || !step) {
      res.status(404);
      return clientError(new Error("Invalid or missing stepId"), req, res);
    }

    const data = await Request.create({
      step: stepId,
      course: step.course,
      student: req.user.id,
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.fetch = async (req, res, next) => {
  try {
    // check if seach is present or empty; if so return all requests
    if (!("search" in req.query) || !req.query.search) {
      const data = await Request.find();
      return res.status(200).json({
        status: "success",
        results: data.length,
        data,
      });
    }

    // check if search criteria is valid & if search id is provided
    const search = req.query.search;
    const id = req.body.id;
    if (
      !id ||
      (search !== "course" && search !== "step" && search !== "student" && search !== "mentor")
    ) {
      res.status(400);
      return clientError(new Error("Invalid search criteria or missing id"), req, res);
    }

    // search by course
    const data = [];
    if (search === "course") {
      const results = await Request.find({ course: id });
      data.push(...results);
    }

    // search by step
    if (search === "step") {
      const results = await Request.find({ step: id });
      data.push(...results);
    }

    // search by student
    if (search === "student") {
      const results = await Request.find({ student: id });
      data.push(...results);
    }

    // search by mentor
    if (search === "mentor") {
      const results = await Request.find({ mentor: id });
      data.push(...results);
    }

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.fetchSIngle = async (req, res, next) => {
  try {
    const data = await Request.findById(req.params.id);
    if (data) {
      if (data.student.toString() !== req.user.id) {
        res.status(400);
        return clientError(new Error("You are not authorized to view this resource"), req, res);
      }
      return res.status(200).json({
        status: "success",
        data,
      });
    }

    res.status(404);
    clientError(new Error("Request not found"), req, res);
  } catch (err) {
    next(err);
  }
};

exports.toggleStatus = async (req, res, next) => {
  try {
    const data = await Request.findById(req.params.id);
    if (data) {
      if (data.student.toString() !== req.user.id) {
        res.status(400);
        return clientError(new Error("You are not authorized to view this resource"), req, res);
      }

      // student has option to toggle between open and closed.
      // later only admin or mentor can toggle to accepted or closed
      if (data.status === "pending") {
        data.status = "closed";
      } else {
        data.status = "pending";
      }
      await data.save();

      return res.status(204).json({
        status: "success",
        data,
      });
    }

    res.status(404);
    clientError(new Error("Request not found"), req, res);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const data = await Request.findById(req.params.id);
    if (data) {
      if (data.student.toString() !== req.user.id) {
        res.status(400);
        return clientError(new Error("You are not authorized to view this resource"), req, res);
      }

      await data.remove();

      return res.status(204).json({
        status: "success",
        data,
      });
    }

    res.status(404);
    clientError(new Error("Request not found"), req, res);
  } catch (err) {
    next(err);
  }
};

function clientError(err, req, res) {
  res.json({
    status: "fail",
    message: err.message,
  });
}
