const express = require("express");
const router = express.Router();
const asynchHandler = require("express-async-handler");
const Seller = require("../model/seller");
const generateToken = require("../utilities/generateToken");

const signupSeller = asynchHandler(async (req, res) => {
  res.send("login PAGE");
});

const loginSeller = asynchHandler(async (req, res) => {
  res.send("login UP PAGE");
});

const logoutSeller = asynchHandler(async (req, res) => {
  res.send("logout PAGE");
});

const createSeller = asynchHandler(async (req, res) => {
  res.send("createSeller PAGE");
});

const deleteSeller = asynchHandler(async (req, res) => {
  res.send("deleteSeller UP PAGE");
});

const updateSeller = asynchHandler(async (req, res) => {
  // res.send("updateSeller PAGE");
  console.log("updating a seller !");
  const { name, email, location, locality, password, products } = req.body;
  const seller = await Seller.findById(req.params.id);
  console.log("id", req.params.id);
  if (seller) {
    seller.name = name || seller.name;
    seller.email = email || seller.email;
    seller.locality = locality || seller.locality;
    seller.location = location || seller.location;
    seller.products = products || seller.products;
    if (password) {
      seller.password = password;
    }
    const updatedUser = await seller.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      products: updatedUser.products,
      Orders: updatedUser.Orders,
      location: updatedUser.location,
      locality: updatedUser.locality,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("Wrong credentials");
  }
});
module.exports = {
  deleteSeller,
  updateSeller,
  createSeller,
  logoutSeller,
  loginSeller,
  signupSeller,
};
