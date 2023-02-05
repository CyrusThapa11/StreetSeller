const express = require("express");

const {
  deleteProduct,
  updateProduct,
  createProduct,
  allProducts,
  showOneProduct,
  getSellerProduct,
} = require("../controllers/product");
const { authenticate, isSeller } = require("../middlewares/authMidware");

const router = express.Router();

router.route("/").get(allProducts).post(authenticate, isSeller, createProduct);
router.route("/seller/:id").get(authenticate, getSellerProduct);
router
  .route("/:id")
  .get(showOneProduct)
  .patch(authenticate, isSeller, updateProduct)
  .delete(authenticate, isSeller, deleteProduct);

module.exports = router;
