const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const router = express.Router();
const authenticate = require("../middlewares/authMidware");
const Order = require("../model/order");
const Seller = require("../model/seller");
const User = require("../model/user");

router.post(
  "/",
  authenticate,
  expressAsyncHandler(async (req, res) => {
    // console.log("order cart");
    try {
      const { userID } = req.body;
      let { cartItems, totalPrice } = req.body;
      // OrderItems; owner
      // console.log("userID", userID);
      // console.log("cartItems", cartItems);
      // console.log("totalPrice", totalPrice);
      const newOrder = new Order({
        owner: userID,
        OrderItems: cartItems,
        totalPrice,
      });
      const savedOrder = await newOrder.save();
      // console.log("savedOrder", savedOrder);
      const user = await User.findById(userID);
      // console.log("user BEFORE : ", user);
      user.Orders.push(savedOrder._id);
      // console.log("user AFTER : ", user);Order
      // cartItems.forEach((cartItem) => {
      //   // Product;
      // });
      for (let cartItem of cartItems) {
        let seller = await Seller.findById(cartItem.seller);
        // console.log("seller", seller);
        if (seller && !seller.Orders.includes(savedOrder._id)) {
          seller.Orders.push(savedOrder._id);
          await seller.save();
          // console.log("SELER UPDATED I S", seller);
        }
      }
      await user.save();
      res.json(savedOrder);
    } catch (error) {
      res.status(401);
      throw Error(error.message);
    }
  })
);

router.get(
  "/",
  authenticate,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log("orderRoutes GET !");
      const allOrders = await Order.find({});
      if (allOrders) {
        res.json(allOrders);
      }
    } catch (error) {
      res.status(404);
      throw new Error(error);
    }
  })
);

router.get(
  "/:id",
  authenticate,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log("orderRoutes GET :ID !");
      const order = await Order.findById(req.params.id).populate(
        "owner",
        "name locality"
      );
      if (order) {
        res.json(order);
      }
    } catch (error) {
      res.status(404);
      throw new Error(error);
    }
  })
);
router.put(
  "/:id/pay",
  authenticate,
  expressAsyncHandler(async (req, res) => {
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
      res.status(404);
      throw new Error(error);
    }
  })
);
module.exports = router;
