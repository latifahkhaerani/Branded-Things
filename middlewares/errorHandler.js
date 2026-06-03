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

  if (error.name == "LoginError") {
    status = 401;
    message = "Invalid email or password";
  }

  if (error.name == "BadRequest") {
    status = 400;
    message = "Please input email or password";
  }
  res.status(500).json({
    message,
  });
}

module.exports = errorHandler;
