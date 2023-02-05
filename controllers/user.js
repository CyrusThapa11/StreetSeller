const express = require("express");
const AppError = require("./../middlewares/AppError");
const User = require("../model/user");
const generateToken = require("../utilities/generateToken");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  console.log("getAllUsers");
  try {
    const users = await User.find({});
    console.log("user in getAllUsers ", users);
    return res.json(users);
  } catch (error) {
    console.log("error in getAllUsers", error);
    console.log("error.message", error.message);
    return next(new AppError(error.message, 401));
  }
};

const signupUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    console.log("req.body", req.body);
    console.log("user in signupUser ", user);
    return res.json({ user, token: generateToken(user._id) });
  } catch (error) {
    console.log("error in signupUser", error);
    return next(new AppError(error.message, 401));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { password, Person } = req.body;
    let isAdmin = Person === "admin";
    // TODO CHECK FOR ADMIN LOGIN AND PASSWORD
    let user = await User.findOne({
      email: req.body.email,
    });
    console.log("user in loginUser ", user);
    bcrypt.compare(password, user.password, function (err, result) {
      // result == true
      console.log("result", result);
      console.log("err", err);
      delete user.password;
      if (result === true) {
        return res.json({ user, token: generateToken(user._id) });
      } else {
        return next(new AppError("Invalid Credentials", 401));
      }
    });
  } catch (error) {
    return next(new AppError(error.message || "Invalid Credentials", 401));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    // TODO CHECK IF ADMIN IS TRUE
    // const { password } = req.body;
    // expect _id
    let user = await User.findOneAndDelete({ email: req.body.email });
    return res.json({ message: "Deleted Sucessfully " });
  } catch (error) {
    console.log("error in deleteUser", error);
    return next(new AppError(error.message, 401));
  }
};

const updateUser = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    bcrypt.hash(req.body.password, 8, async function (err, hash) {
      // Store hash in your password DB.
      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, email: req.body.email, password: hash },
        {
          new: true,
        }
      );
      console.log("user in update ", user);
      return res.json({ user, message: "Updated Sucessfully " });
    });
  } catch (error) {
    console.log(" error in updateUser", error);
    return next(new AppError(error.message, 401));
  }
};

const addToUsersCart = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    bcrypt.hash(req.body.password, 8, async function (err, hash) {
      // Store hash in your password DB.
      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, email: req.body.email, password: hash },
        {
          new: true,
        }
      );
      console.log("user in update ", user);
      return res.json({ user, message: "Updated Sucessfully " });
    });
  } catch (error) {
    console.log(" error in updateUser", error);
    return next(new AppError(error.message, 401));
  }
};
const getUsersCart = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    bcrypt.hash(req.body.password, 8, async function (err, hash) {
      // Store hash in your password DB.
      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, email: req.body.email, password: hash },
        {
          new: true,
        }
      );
      console.log("user in update ", user);
      return res.json({ user, message: "Updated Sucessfully " });
    });
  } catch (error) {
    console.log(" error in updateUser", error);
    return next(new AppError(error.message, 401));
  }
};

// TODO !
const addToUsersOrders = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    bcrypt.hash(req.body.password, 8, async function (err, hash) {
      // Store hash in your password DB.
      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, email: req.body.email, password: hash },
        {
          new: true,
        }
      );
      console.log("user in update ", user);
      return res.json({ user, message: "Updated Sucessfully " });
    });
  } catch (error) {
    console.log(" error in updateUser", error);
    return next(new AppError(error.message, 401));
  }
};
const getUserOrders = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    let userOrders = await User.findById(req.params.id).populate("Orders");
    // TODO !
    // .populate("");
    res.json(userOrders.Orders);
  } catch (error) {
    console.log(" error in updateUser", error);
    return next(new AppError(error.message, 401));
  }
};

module.exports = {
  deleteUser,
  updateUser,
  loginUser,
  signupUser,
  getAllUsers,
  addToUsersCart,
  getUsersCart,
  getUserOrders,
};
