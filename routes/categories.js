const express = require("express");
const {
	createCategory,
	getCategories,
	deleteCategory,
	updateCategory,
} = require("../controllers/categories");
const { getProductsByCategory } = require("../controllers/products");
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");
const router = express.Router();

router.route("/").post(auth, roles(["admin"]), createCategory);
router.route("/").get(auth, roles(["admin", "editor"]), getCategories);
router
	.route("/:id")
	.put(auth, roles(["admin", "editor"]), updateCategory)
	.delete(auth, roles(["admin"]), deleteCategory);
router.route("/:slug").get(getProductsByCategory);

module.exports = router;
