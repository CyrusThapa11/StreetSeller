const express = require("express");
const AppError = require("../middlewares/AppError");
const Product = require("../model/product");

//GET ALL PRODUCT
const allProducts = async (req, res, next) => {
  try {
    let q = {};

    if (req.query.category) {
      console.log("req.query.category", req.query.category);

      q = { category: req.query.category };
    }

    if (req.query.subcategory) {
      // q = { category: req.query.category };

      console.log("req.query.subcategory", req.query.subcategory);

      let subcategory = req.query.subcategory.split(",");

      console.log("subcategory", subcategory);

      q = { ...q, subcategory: { $in: subcategory } };
    }

    const { limit, pagenumber } = req.query;
    console.log("limit, pagenumber", limit, pagenumber);
    const products = await Product.find(q)
      .skip(limit * pagenumber)
      .limit(limit);
    // TODO PAGINATION !
    // console.log("products int allProducts", products);

    res.json({ products });
  } catch (error) {
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};

//GET 1 PRODUCT
const showOneProduct = async (req, res, next) => {
  try {
    // res.send("showOneProduct PAGE");
    const product = await Product.findById(req.params.id);
    // console.log("product is ---", product);
    if (product) {
      return res.json(product);
    } else {
      return next(new AppError(error?.message || "Internal Server Error", 401));
    }
  } catch (error) {
    console.log("error in showOneProduct", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};
const getSellerProduct = async (req, res, next) => {
  try {
    // res.send("showOneProduct PAGE");
    // const { _id } = req.body;
    console.log("req.params.id", req.params.id);
    const product = await Product.find({
      seller: req.params.id,
    });

    // console.log("product is ---", product);
    if (product) {
      return res.json(product);
    } else {
      return next(new AppError(error?.message || "Internal Server Error", 401));
    }
  } catch (error) {
    console.log("error in showOneProduct", error);
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};
const createProduct = async (req, res, next) => {
  try {
    console.log("createProduct");
    const { seller } = req.body;
    const product = await Product.create(req.body);
    // TODO ADD THIS TO SELLER PRODUCT ARRAY
    // const product = await Product.create(req.body);
    return res.json({ product, message: "Product created Sucessfully " });
  } catch (error) {
    console.log("error in createProduct", error);

    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({ message: "product Deleted sucessfully" });
  } catch (error) {
    console.log("error in deleteProduct", error);

    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    let product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json({ message: " Product Updated Sucessfully ", product });
  } catch (error) {
    console.log("error in updateProduct", error);

    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
};

module.exports = {
  deleteProduct,
  updateProduct,
  createProduct,
  allProducts,
  showOneProduct,
  getSellerProduct,
};
