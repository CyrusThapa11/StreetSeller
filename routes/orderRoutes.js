const express = require("express");
const AppError = require("../middlewares/AppError");
// const ExpressAsyncHandler = require("express-async-handler");
const router = express.Router();
const { authenticate, isAdmin } = require("../middlewares/authMidware");
const Order = require("../model/order");
const Seller = require("../model/seller");
const User = require("../model/user");

router.post(
  "/",
  authenticate,
  // TODO ADD HERE AUTHENTICATION
  async (req, res, next) => {
    // console.log("order cart");
    try {
      let { OrderItems, totalPrice, cartQuantity, owner, seller } = req.body;
      // OrderItems; owner
      console.log("owner", owner);
      console.log("OrderItems", OrderItems);
      console.log("totalPrice", totalPrice);
      const newOrder = new Order({
        owner,
        seller,
        OrderItems,
        totalPrice,
        cartQuantity,
      });
      const savedOrder = await newOrder.save();
      // console.log("savedOrder", savedOrder);
      const user = await User.findById(owner);
      // console.log("user BEFORE : ", user);
      user.Orders.push(savedOrder._id);
      // console.log("user AFTER : ", user);Order
      // cartItems.forEach((cartItem) => {
      //   // Product;
      // });
      for (let cartItem of OrderItems) {
        let seller = await Seller.findById(cartItem.seller);
        // console.log("seller", seller);
        if (seller && !seller.Orders.includes(savedOrder._id)) {
          seller.Orders.push(savedOrder._id);
          await seller.save();
          // console.log("SELER UPDATED I S", seller);
        }
      }
      await user.save();
      res.json({ message: "Order Placed", savedOrder });
    } catch (error) {
      return next(new AppError(error?.message || "Internal Server Error", 401));
    }
  }
);

router.get("/", authenticate, isAdmin, async (req, res, next) => {
  try {
    console.log("orderRoutes GET !");
    const allOrders = await Order.find({}).populate("owner seller");
    res.json(allOrders);
  } catch (error) {
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    console.log("orderRoutes GET :ID !");
    const order = await Order.findById(req.params.id).populate(
      "owner",
      "name locality"
    );
    res.json(order);
  } catch (error) {
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});

router.patch("/:id/pay", authenticate, async (req, res, next) => {
  try {
    console.log("orderRoutes GET :ID !");
    const order = await Order.findById(req.params.id).populate(
      "owner",
      "name locality"
    );
    if (order) {
      order.isPaid = true;
      order.PaidAt = Date.now;
      await order.save();
      res.json(order);
    }
  } catch (error) {
    return next(new AppError(error?.message || "Internal Server Error", 401));
  }
});
module.exports = router;
