function errorHandler(err, req, res, next) {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({
    status: "error",
    message,
  });
}

module.exports = errorHandler;
