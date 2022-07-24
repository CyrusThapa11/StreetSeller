const Users = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");
const Seller = require("../model/seller");

const asynchHandler = require("express-async-handler");

const express = require("express");
const { users, productdata, sellers } = require("./data");
const router = express.Router();

router.route("/users").get(
  asynchHandler(async (req, res) => {
    await Users.remove({});
    const addedUsers = await Users.insertMany(users);
    res.send({ addedUsers });
  })
);
router.route("/sellers").get(
  asynchHandler(async (req, res) => {
    await Seller.remove({});
    const addSellers = await Seller.insertMany(sellers);
    res.send({ addSellers });
  })
);
router.route("/products").get(
  asynchHandler(async (req, res) => {
    await Product.remove({});
    const addedProductdata = await Product.insertMany(productdata);
    res.send({ addedProductdata });
  })
);
router.route("/orders").get(
  asynchHandler(async (req, res) => {
    //   await Order.remove({});
    const addedUsers = await Order.insertMany(users);
    res.send({ addedUsers });
  })
);

module.exports = router;
