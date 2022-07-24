const express = require("express");
const generateToken = require("./../utilities/generateToken");
const router = express.Router();
const User = require("../model/user");
const Seller = require("../model/seller");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const Order = require("../model/order");
const { findById } = require("../model/user");

const login = asyncHandler(async (req, res) => {
  let { email, password, isAdmin, isSeller } = req.body;
  // console.log(
  //   "email, password, isAdmin, isSeller FROM BACKEND !!",
  //   email,
  //   password,
  //   isAdmin,
  //   isSeller
  // );

  isSeller = JSON.parse(isSeller);
  // console.log("isSeller ka value h ", isSeller);
  // console.log("typeof", typeof isSeller);
  // console.log("typeof isSeller", typeof isSeller);

  try {
    if (isSeller === true) {
      const seller = await Seller.findOne({ email });
      let valid = await seller.matchPassword(password);
      // console.log("valid", valid);

      // TODO CHECK THIS VALUE !
      // valid = JSON.parse(valid);

      if (seller && valid) {
        return res.json({
          _id: seller._id,
          name: seller.name,
          email: seller.email,
          isAdmin: false,
          isSeller: true,
          token: generateToken(seller._id),
          createdAt: seller.createdAt,
          // TODO NEED TO ADD DETAILS OF PAST ORDERS !!
        });
      } else {
        res.status(401);
        throw new Error("Invalid credentials of Seller");
      }
    } else {
      // console.log("Searching for a user");

      const user = await User.findOne({ email });
      // console.log("user is user", user);
      if (user) {
        let valid = await user.matchPassword(password);
        // console.log("valid", valid);
        if (user && valid) {
          return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: false,
            token: generateToken(user._id),
            createdAt: user.createdAt,
            // TODO NEED TO ADD DETAILS OF PAST ORDERS !!
          });
        } else {
          res.status(401);
          throw new Error("Invalid credentials of User");
        }
      } else {
        res.status(401);
        throw new Error("No user with that email exists !");
      }
    }
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

// REGISTER !!

const signup = asyncHandler(async (req, res) => {
  // try {
  let { isSeller } = req.body;
  let userOrSeller = null;
  // USER
  // sellisSellerer = se;
  isSeller = JSON.parse(isSeller);
  // console.log("isSeller ka value h ", isSeller);
  // console.log("typeof", typeof isSeller);
  if (isSeller === false) {
    userOrSeller = await User.findById(req.userID);
    if (userOrSeller) {
      throw new Error("User Already Exists");
    } else {
      // IF DOES NOT EXIST USER !
      // console.log("CREATING A NEW USER ");
      const { name, email, password } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
      });
      // console.log("newUser", newUser);
      if (newUser) {
        return res.status(201).json({
          name: newUser.name,
          email: newUser.email,
          _id: newUser._id,
          isAdmin: newUser.isAdmin,
          isSeller: newSeller.isSeller,
          token: generateToken(newUser._id),
        });
      } else {
        res.status(401);
        throw new Error(" Oops some error occured !!");
      }
    }
  } else {
    // SELLER

    userOrSeller = await Seller.findById(req.userID);

    if (userOrSeller) {
      res.status(401);
      throw new Error("User Already Exists");
    } else {
      // IF DOES NOT EXIST SELLER !
      const { name, email, password } = req.body;
      console.log("CREATING A NEW seller ");

      const newSeller = await Seller.create({
        name,
        email,
        password,
      });

      if (newSeller) {
        return res.status(201).json({
          name: newSeller.name,
          email: newSeller.email,
          _id: newSeller._id,
          isAdmin: newSeller.isAdmin,
          isSeller: newSeller.isSeller,
          token: generateToken(newSeller._id),
        });
      } else {
        res.status(401);
        throw new Error(
          " Oops some error occured could not create a seller !!"
        );
      }
    }
  }
  // } catch (error) {
  //   throw new Error(error.message);
  // }

  // res.send("signup UP PAGE");
});

const getUserDetails = asyncHandler(async (req, res) => {
  let { isSeller, userID } = req.body;
  let user = null;
  // console.log("typeof isSeller", typeof isSeller);
  // console.log("typeof userID", typeof userID);
  isSeller = JSON.parse(isSeller);
  // console.log("isSeller ka value h ", isSeller);

  if (isSeller === false) user = await User.findById(userID);
  else user = await Seller.findById(userID);

  if (user) {
    let orderDetails = [];
    if (user.Orders && user.Orders.length > 0) {
      //  Order.findById()
      /*
      user.Orders.forEach(async (order) => {
        // orderDetails.push(order)
        let orderDetail = await Order.findById(order);
        // if (!orderDetail) continue;
        if (orderDetail) {
          console.log("orderDetail is ", orderDetail);
          let modifiedDetail = { ...orderDetail };
          // OrderItems;
          if (orderDetail.OrderItems)
            modifiedDetail.totalItems = orderDetail.OrderItems.length;
          if (orderDetail.totalPrice)
            modifiedDetail.totalPrice = orderDetail.totalPrice;
          // delete modifiedDetail['owner'];
          delete modifiedDetail["updatedAt"];
          orderDetails.push(modifiedDetail);
        }
      });
        */
      for (orderid of user.Orders) {
        // console.log("orderid", orderid);
        let order = await Order.findById(orderid);
        if (order) orderDetails.push(order);
      }

      // console.log("orderDetails ka value : ", orderDetails);
    }
    if (isSeller === true) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        createdAt: user.createdAt,
        locality: user.locality,
        location: user.location,
        Orders: user.Orders,
        orderDetails: orderDetails,
        products: user.products,
      });
    } else {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        createdAt: user.createdAt,
        locality: user.locality,
        // Orders: user.Orders,
        orderDetails: orderDetails,
      });
    }
  } else {
    res.status(404);
    throw new Error("User not Found !");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.send("logout PAGE");
});

module.exports = {
  login,
  signup,
  logout,
  getUserDetails,
};
