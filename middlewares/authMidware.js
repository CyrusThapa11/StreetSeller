const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Seller = require("../model/seller");
const expressAsyncHandler = require("express-async-handler");

const authenticate = expressAsyncHandler(async (req, res, next) => {
  // console.log("checking authenticate !");
  // console.log("req.headers.authorization !", req.headers.authorization);
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("found !");

    try {
      token = req.headers.authorization.split(" ")[1];

      // console.log("token", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.body.userIDD = decoded.id;
      // const { isSeller, userID } = req.body;
      // console.log("decoded.id", decoded.id);
      // console.log("isSeller", isSeller);
      // console.log("userID", userID);
      return next();
    } catch (error) {
      res.status(401);
      console.log("error in authentication !", error.message);
      throw new Error("Not authorized ,token Expired !");
    }
  } else if (!token) {
    res.status(401);
    throw new Error("Not authorized , no token !");
  }
});

module.exports = authenticate;
