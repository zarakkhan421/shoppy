const express = require("express");
const router = express.Router();
const {
	getProducts,
	createProduct,
	getProduct,
	deleteProduct,
	updateProduct,
	getFeaturedProducts,
	getSaleProducts,
	getSearchedProducts,
} = require("../controllers/products");
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");

router.route("/search/:search_term").get(getSearchedProducts);
router.route("/featured").get(getFeaturedProducts);
router.route("/sale").get(getSaleProducts);
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
