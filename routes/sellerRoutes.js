const express = require("express");
const {
  deleteSeller,
  updateSeller,
  //   createSeller,
  logoutSeller,
  loginSeller,
  signupSeller,
} = require("../controllers/seller");
const authenticate = require("../middlewares/authMidware");

const router = express.Router();

router.route("/signup").post(signupSeller);
router.route("/login").post(loginSeller);
router.route("/logout").post(logoutSeller);
router
  .route("/update/:id")
  .put(authenticate, updateSeller)
  .delete(deleteSeller);

module.exports = router;
