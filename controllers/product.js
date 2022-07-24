const express = require("express");
const router = express.Router();

const asynchHandler = require("express-async-handler");

const { productdata } = require("../data/data");
const Product = require("../model/product");

//GET ALL PRODUCT
const allProducts = asynchHandler(async (req, res) => {
  // res.send("allProducts PAGE");

  const products = await Product.find({});

  res.json(products);
});

//GET 1 PRODUCT
const showOneProduct = asynchHandler(async (req, res) => {
  // res.send("showOneProduct PAGE");
  const product = await Product.findById(req.params.id);
  // console.log("product is ---", product);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: " Opps... Product Not Found" });
    throw new Error("Product Not Found");
  }
});

const createProduct = asynchHandler(async (req, res) => {
  res.send("createProduct PAGE");
});

const deleteProduct = asynchHandler(async (req, res) => {
  res.send("deleteProduct UP PAGE");
});

const updateProduct = asynchHandler(async (req, res) => {
  res.send("updateProduct PAGE");
});

module.exports = {
  deleteProduct,
  updateProduct,
  createProduct,
  allProducts,
  showOneProduct,
};
