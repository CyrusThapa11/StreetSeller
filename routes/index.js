const express = require("express");

const {
  login,
  signup,
  logout,
  getUserDetails,
} = require("../controllers/auth");
const authenticate = require("../middlewares/authMidware");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);
router.route("/profile").post(authenticate, getUserDetails);

module.exports = router;
