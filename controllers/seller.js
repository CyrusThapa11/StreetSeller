const express = require("express");
const router = express.Router();
const Seller = require("../model/seller");
const generateToken = require("../utilities/generateToken");
const bcrypt = require("bcryptjs");
const AppError = require("../middlewares/AppError");

const allSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find({});
    console.log("seller in signupSeller ", sellers);
    return res.json(sellers);
  } catch (error) {
    console.log("error in allSellers", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};

const signupSeller = async (req, res, next) => {
  try {
    const seller = await Seller.create(req.body);
    console.log("seller in signupSeller ", seller);
    return res.json({ user: seller, token: generateToken(seller._id) });
  } catch (error) {
    console.log("error in signupSeller", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};
//
const loginSeller = async (req, res, next) => {
  try {
    const { password } = req.body;
    // expect _id
    console.log("req.body", req.body);
    let seller = await Seller.findOne({ email: req.body.email });
    console.log("seller in loginSeller ", seller);
    bcrypt.compare(password, seller.password, function (err, result) {
      // result == true
      delete seller.password;
      if (result) {
        return res.json({ user: seller, token: generateToken(seller._id) });
      } else {
        return next(
          new AppError(error?.message || "Internal Server Error", 401)
        );
      }
    });
  } catch (error) {
    console.log("error in loginseller", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
  // res.send("login UP PAGE");
};

const deleteSeller = async (req, res, next) => {
  try {
    // TODO CHECK IF ADMIN IS TRUE
    // const { password } = req.body;
    // expect _id
    let seller = await Seller.findOneAndDelete({ email: req.body.email });
    // TODO UPDATE AND DELTE HIS PRODUCTS TOO !
    return res.json({ message: "Delted Sucessfully" });
  } catch (error) {
    console.log("error in deleteseller", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};

const updateSeller = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 8, async function (err, hash) {
      // Store hash in your password DB.
      let seller = await Seller.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, email: req.body.email, password: hash },
        {
          new: true,
        }
      );
      console.log("seller in update ", seller);
      return res.json({ seller, message: "Updated Sucessfully" });
    });
  } catch (error) {
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};
module.exports = {
  deleteSeller,
  updateSeller,

  loginSeller,
  signupSeller,
  allSellers,
};
