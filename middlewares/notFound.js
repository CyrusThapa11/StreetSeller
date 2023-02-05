const AppError = require("./AppError");

const notFound = (req, res, next) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 401);
  // res.status(404);
  console.log("error notFound", error);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log("err.statusCode", err.statusCode);
  let statusCode = err.statusCode || 500;
  let message = err.message || " Internal Server Error.... ";
  console.log("statusCode", statusCode);
  console.log("error errorHandler --", err.message);
  console.log("error errorHandler  message--", message);
  res.status(statusCode).json({
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    message: message,
  });
};
module.exports = { errorHandler, notFound };
