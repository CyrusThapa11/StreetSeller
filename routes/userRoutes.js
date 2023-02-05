const express = require("express");
const {
  deleteUser,
  updateUser,
  addToUsersCart,
  getAllUsers,
  loginUser,
  signupUser,
  getUsersCart,
  getUserOrders,
} = require("../controllers/user");
const { authenticate, isAdmin } = require("../middlewares/authMidware");

const router = express.Router();

router.route("/").get(authenticate, isAdmin, getAllUsers);
router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
// router.route("/logout").post(logoutUser);
router
  .route("/:id")
  .patch(authenticate, updateUser)
  .delete(authenticate, deleteUser);

router.route("/orders/:id").get(authenticate, getUserOrders);

router
  .route("/order")
  .get(authenticate, getUsersCart)
  .post(authenticate, addToUsersCart);

// api/user/update/:id
module.exports = router;
