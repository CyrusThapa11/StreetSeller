const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderModel = mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // 63d7c02aaaa1611b61feb815 seller
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    OrderItems: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        count: { type: Number },
        price: { type: Number },
        image: { type: String },
      },
    ],
    cartQuantity: { type: Number, required: true },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    PaidAt: { type: Date },
    dispatch: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Boolean },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderModel);
module.exports = Order;
