const express = require("express");
const router = express.Router();
const asynchHandler = require("express-async-handler");
const Category = require("../model/category");
const AppError = require("../middlewares/AppError");

const getCategory = asynchHandler(async (req, res, next) => {
  try {
    const allSubcat = await Category.find({});
    // console.log("subcat in createCategory ", allSubcat);
    return res.json({ categories: allSubcat, message: "Category Created " });
  } catch (error) {
    console.log("error in createCategory", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});
const createCategory = asynchHandler(async (req, res, next) => {
  try {
    const subcat = await Category.create(req.body);
    // console.log("subcat in createCategory ", subcat);
    return res.json({ message: "Category Created " });
  } catch (error) {
    console.log("error in createCategory", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});

const deleteCategory = asynchHandler(async (req, res, next) => {
  try {
    // TODO CHECK IF ADMIN IS TRUE
    // const { password } = req.body;
    // expect _id
    let subcat = await Category.findOneAndDelete({
      Category: req.body,
    });
    // TODO UPDATE AND DELTE HIS PRODUCTS TOO !
    return res.json({ message: "Deleted Sucessfully" });
  } catch (error) {
    console.log("error in deleteCategory", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});

module.exports = {
  deleteCategory,
  createCategory,
  getCategory,
};
