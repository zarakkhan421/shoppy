const express = require("express");
const router = express.Router();
const {
	createReview,
	getReviews,
	getMyReviews,
} = require("../controllers/reviews");
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");

// :product id on which review will be created
router.route("/:product").post(auth, createReview);
router.route("/all").get(auth, roles(["admin"]), getReviews);
router.route("/").get(auth, getMyReviews);
module.exports = router;
