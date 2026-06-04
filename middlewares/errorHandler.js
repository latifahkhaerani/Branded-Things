function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  if (error.name == "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  }

  //   detail product
  if (error.name == "ID Not Found" || error.name == "NotFound") {
    status = 400;
    message = `Data with id ${error.id} not found`;
  }

  // unique
  if (error.name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.message;
  }

  // login
  if (error.name == "LoginError") {
    status = 401;
    message = "Invalid email or password";
  }

  if (error.name == "BadRequest") {
    status = 400;
    message = "Please input email or password";
  }

  // no token
  if (error.name == "Unauthorized" || error.name == "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  }

  // authorization
  if (error.name == "Forbidden") {
    status = 403;
    message = "You don't have any access";
  }

  // upload image
  if (error.name == "ImageRequired") {
    status = 403;
    message = "Please upload an image";
  }

  // search feature
  if (error.name == "DataEmpty") {
    status = 403;
    message = "Data is empty";
  }

  res.status(500).json({
    message,
  });
}

module.exports = errorHandler;
