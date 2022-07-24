const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    locality: { type: String },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/vinsmokecyrus/image/upload/v1658428778/ecom/profileImage-1_xrbfom.png",
    },
    isAdmin: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    Orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

userModel.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("password : ", this.password);
  return next();
});

const User = mongoose.model("User", userModel);
module.exports = User;
