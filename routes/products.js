const express = require("express");
const router = express.Router();
const {
	getProducts,
	createProduct,
	getProduct,
	deleteProduct,
	updateProduct,
} = require("../controllers/products");
const { auth } = require("../middleware/auth");

router.route("/").get(getProducts).post(auth, createProduct);
router
	.route("/:id")
	.get(getProduct)
	.delete(auth, deleteProduct)
	.put(auth, updateProduct);

module.exports = router;
