const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const subCategoryModel = mongoose.Schema(
  {
    subcategory_name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategoryModel);
module.exports = SubCategory;
