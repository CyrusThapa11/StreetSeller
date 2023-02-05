const express = require("express");
const {
  createCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/category");
const { authenticate, isAdmin } = require("../middlewares/authMidware");

const router = express.Router();

router
  .route("/")
  .get(getCategory)
  .post(authenticate, isAdmin, createCategory)
  .delete(authenticate, isAdmin, deleteCategory);

module.exports = router;
