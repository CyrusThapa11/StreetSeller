const express = require("express");
const router = express.Router();
const asynchHandler = require("express-async-handler");
const User = require("../model/user");
const generateToken = require("../utilities/generateToken");

const signupUser = asynchHandler(async (req, res) => {
  res.send("login PAGE");
});

const loginUser = asynchHandler(async (req, res) => {
  res.send("login UP PAGE");
});

const logoutUser = asynchHandler(async (req, res) => {
  res.send("logout PAGE");
});

const createUser = asynchHandler(async (req, res) => {
  res.send("createUser PAGE");
});

const deleteUser = asynchHandler(async (req, res) => {
  res.send("deleteUser UP PAGE");
});

const updateUser = asynchHandler(async (req, res) => {
  // res.send("updateUser PAGE");

  // const { user } = req.body;
  console.log("req.body.email,", req.body.email);
  // find and update
  // res.send("updateSeller PAGE");
  console.log("updating a User !");
  const oldUser = await User.findById(req.params.id);
  // console.log("id", req.params.id);
  // console.log("user updated in ", user);
  if (oldUser) {
    oldUser.name = req.body.name || oldUser.name;
    oldUser.email = req.body.email || oldUser.email;
    oldUser.locality = req.body.locality || oldUser.locality;
    if (req.body.password) {
      oldUser.password = req.body.password;
    }
    const updatedUser = await oldUser.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      locality: updatedUser.locality,
      isSeller: false,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});

module.exports = {
  deleteUser,
  updateUser,
  createUser,
  logoutUser,
  loginUser,
  signupUser,
};
