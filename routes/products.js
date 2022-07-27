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
const { roles } = require("../middleware/roles");

router
	.route("/")
	.get(getProducts)
	.post(auth, roles(["admin"]), createProduct);
router
	.route("/:id")
	.get(getProduct)
	.delete(auth, roles(["admin"]), deleteProduct)
	.put(auth, roles(["admin", "editor"]), updateProduct);

module.exports = router;
