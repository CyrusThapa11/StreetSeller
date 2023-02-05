const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const categoryModel = mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categoryModel);
module.exports = Category;
