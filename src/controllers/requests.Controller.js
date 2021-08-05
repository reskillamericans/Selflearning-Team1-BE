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
    const isStudent = req.user.role === "student";
    let data;
    // if request doesn't contain search query, retrun all eligible results
    if (!("search" in req.query)) {
      // if user is student return only student's requests otherwise return all
      if (isStudent) {
        data = await Request.find({ student: req.user.id });
      } else {
        data = await Request.find({});
      }

      return res.status(200).json({
        status: "success",
        results: data.length,
        data,
      });
    }

    // check if both search and id are included
    if (!("id" in req.query) || !req.query.search) {
      res.status(400);
      return clientError(new Error("Search requires valid criteria and Id"), req, res);
    }
    // build search object based on user query and user role
    let searchOptions = {};
    if (isStudent) {
      searchOptions.student = req.user.id;
      searchOptions[req.query.search] = req.query.id;
    } else {
      searchOptions[req.query.search] = req.query.id;
    }

    data = await Request.find(searchOptions);

    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.fetchSingle = async (req, res, next) => {
  try {
    const isStudent = req.user.role === "student";

    const data = await Request.findById(req.params.id);
    const dataOwner = data?.student;

    if (isStudent) {
      if (dataOwner.toString() !== req.user.id) {
        res.status(401);
        return clientError(
          new Error("You do not have authorization for the requested action"),
          req,
          res
        );
      }
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.toggleStatus = async (req, res, next) => {
  try {
    const isStudent = req.user.role === "student";
    const request = await Request.findById(req.params.id);
    const isOwner = req.user.id === request?.student.toString();

    // check if status valid
    const status = req.body.status;
    if (status !== "accepted" && status !== "closed" && status !== "pending") {
      res.status(404);
      return clientError(new Error("Invalid status"), req, res);
    }

    // check validity of request baed on user and status
    if (!isStudent && status !== "closed") {
      request.status = status;
      request.save();
      return res.status(204).json({
        status: "success",
        request,
      });
    }

    if (isStudent && isOwner && status !== "accepted") {
      request.status = status;
      request.save();
      return res.status(204).json({
        status: "success",
        request,
      });
    }

    res.status(400).json({
      status: "fail",
      message: "Invalid request",
    });
  } catch (err) {
    next(err);
  }
};

// only student who created can delete
exports.delete = async (req, res, next) => {
  try {
    const data = await Request.findById(req.params.id);
    if (data) {
      // check if user attempting to delete is owner of data
      if (data.student.toString() !== req.user.id) {
        res.status(401);
        return clientError(new Error("Action not authorized"), req, res);
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
