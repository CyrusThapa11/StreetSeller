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
    // seller: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Seller",
    //   },
    // ],
    OrderItems: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: { type: String, required: true },
        image: { type: String },
        cartProdcutQuantity: { type: Number, required: true },
        price: { type: Number, required: true },
        seller: { type: Schema.Types.ObjectId, required: true, ref: "Seller" },
      },
    ],
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    PaidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Boolean },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderModel);
module.exports = Order;
