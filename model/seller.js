const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const sellerModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSeller: { type: Boolean, default: false },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    location: { type: String },
    locality: { type: String },
    revenue: { type: Number },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    Orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

sellerModel.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

sellerModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("password : ", this.password);
  return next();
});

const Seller = mongoose.model("Seller", sellerModel);
module.exports = Seller;
