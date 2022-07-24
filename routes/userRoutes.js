const express = require("express");
const {
  deleteUser,
  updateUser,
  //   createUser,
  logoutUser,
  loginUser,
  signupUser,
} = require("../controllers/user");
const authenticate = require("../middlewares/authMidware");

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/update/:id").put(authenticate, updateUser).delete(deleteUser);
// api/user/update/:id
module.exports = router;
