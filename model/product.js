// const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// const reviewSchema = mongoose.Schema({
//   name: { type: String },
//   rating: { type: Number },
//   comment: { type: String },
//   user: { type: Schema.Types.ObjectId, ref: "User" },
// });

const productModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [
      {
        type: String,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    ],
    // countInStock: { type: Number, default: 0 },
    category: { type: String },
    subcategory: [{ type: String }],
    seller: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
    // locality: { type: String },
    //  TODO CHECK WHERE TO PUT THESE ATTRIBUTES !!
    // paid: { type: Boolean, default: false },
    // delivered: { type: Boolean, default: false },
    rating: { type: Number, default: 4 },
    // reviews: [reviewSchema],
    subscriber: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productModel);
module.exports = Product;
