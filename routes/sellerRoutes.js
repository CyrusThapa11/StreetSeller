const express = require("express");
const {
  deleteSeller,
  updateSeller,
  allSellers,
  loginSeller,
  signupSeller,
} = require("../controllers/seller");
const { authenticate, isSeller } = require("../middlewares/authMidware");

const router = express.Router();

router.route("/").get(authenticate, isSeller, allSellers);
router.route("/signup").post(signupSeller);
router.route("/login").post(loginSeller);
router.route("/:id").patch(updateSeller).delete(deleteSeller);

module.exports = router;
