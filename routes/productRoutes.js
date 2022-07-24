const express = require("express");

const {
  deleteProduct,
  updateProduct,
  createProduct,
  allProducts,
  showOneProduct,
} = require("../controllers/product");

const router = express.Router();

router.route("/").get(allProducts).post(createProduct);
router
  .route("/:id")
  .get(showOneProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
