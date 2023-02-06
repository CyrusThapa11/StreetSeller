const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Seller = require("../model/seller");
const AppError = require("./AppError");

const authenticate = async (req, res, next) => {
  try {
    let token = "";
    // console.log("req.headers", req.headers);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log("found !");

      token = req.headers.authorization.split(" ")[1];

      // console.log("token", token);
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("decoded", decoded);
        console.log("err", err);
        if (err !== undefined && err !== null) {
          return next(new AppError("Invalid credentials", 402));
        } else {
          console.log(" here ");
          return next();
        }
      });

      // console.log("error in authentication !", error.message);

      // return next(new AppError("Not authorized ,token Expired !"));
    } else {
      return next(new AppError("Not authorized, token Not found !", 403));
    }
  } catch (error) {
    console.log("error in authenticate", error.message);
    return next(new AppError(error.message, 401));
  }
};

const isSeller = async (req, res, next) => {
  try {
    console.log("req.body--> ", req.body);

    if (req.body.isAdmin === true) return next();
    if (
      req.body.isSeller === null ||
      req.body.isSeller === undefined ||
      req.body.isSeller === false
    ) {
      return next(new AppError("You are not a seller ", 403));
    } else return next();
  } catch (error) {
    return next(new AppError("Something went wrong in server", 402));
  }
};

const isAdmin = async (req, res, next) => {
  try {
    console.log("req.body--> ", req.body);
    if (
      req.body.isAdmin === undefined ||
      req.body.isAdmin === null ||
      req.body.isAdmin === false
    )
      return next(new AppError("You are not admin ", 403));
    else return next();
  } catch (error) {
    next(new AppError("Something went wrong in server", 402));
  }
};

// const isOwner = (async (req, res, next) => {
//   try {
//     if (req.body.isAdmin === 0)
//       return next(new AppError("You are not authorized to do this"));
//   } catch (error) {
//     next(new AppError("Something went wrong in server", 402));
//   }
// });

module.exports = { authenticate, isSeller, isAdmin };
