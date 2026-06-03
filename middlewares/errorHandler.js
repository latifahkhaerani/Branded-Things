function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  if (error.name == "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  }

  //   detail product
  if (error.name == "ID Not Found") {
    status = 400;
    message = `Data with id ${error.id} not found`;
  }

  // unique
  if (error.name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.message;
  }
  res.status(500).json({
    message,
  });
}

module.exports = errorHandler;
