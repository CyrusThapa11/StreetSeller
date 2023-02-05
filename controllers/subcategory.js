const express = require("express");
const asynchHandler = require("express-async-handler");
const SubCategory = require("../model/subcategory");
const AppError = require("../middlewares/AppError");

const getSubCategory = asynchHandler(async (req, res, next) => {
  try {
    const allsubcat = await SubCategory.find({});
    // console.log("subcat in createSubCategory ", allsubcat);
    return res.json({
      subcategories: allsubcat,
      message: "Subcategory Created ",
    });
  } catch (error) {
    console.log("error in createSubCategory", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});
const createSubCategory = asynchHandler(async (req, res, next) => {
  try {
    const subcat = await SubCategory.create(req.body);
    // console.log("subcat in createSubCategory ", subcat);
    return res.json({ message: "Subcategory Created " });
  } catch (error) {
    console.log("error in createSubCategory", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});

const deleteSubcategory = asynchHandler(async (req, res, next) => {
  console.log("req.body", req.body);
  let subcategory_name = req.params.id;
  try {
    // TODO CHECK IF ADMIN IS TRUE
    // const { password } = req.body;
    // expect _id
    let subcat = await SubCategory.findOneAndDelete({
      subcategory_name: subcategory_name,
    });
    // TODO UPDATE AND DELTE HIS PRODUCTS TOO !
    return res.json({ message: "Deleted Sucessfully" });
  } catch (error) {
    console.log("error in deleteSubcategory", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});

module.exports = {
  deleteSubcategory,
  createSubCategory,
  getSubCategory,
};
