const express = require("express");
const router = express.Router();
const {
	createReview,
	getReviews,
	getMyReviews,
	getReview,
	updateReview,
	deleteReview,
	getReviewsByProductId,
} = require("../controllers/reviews");
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");

// :product id on which review will be created
router.route("/:product").post(auth, createReview);
router.route("/product/:product").get(getReviewsByProductId);
router.route("/all").get(auth, roles(["admin"]), getReviews);
router.route("/").get(auth, getMyReviews);
router
	.route("/:id")
	.get(auth, getReview)
	.put(auth, updateReview)
	.delete(auth, deleteReview);
module.exports = router;
