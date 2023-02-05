const express = require("express");
const {
  deleteSubcategory,
  createSubCategory,
  getSubCategory,
} = require("../controllers/subcategory");
const { authenticate, isAdmin } = require("../middlewares/authMidware");

const router = express.Router();

router
  .route("/")
  .get(getSubCategory)
  .post(authenticate, isAdmin, createSubCategory);
router.route("/:id").delete(authenticate, isAdmin, deleteSubcategory);

module.exports = router;
