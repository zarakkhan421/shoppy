const products = require("../models/products");
const Review = require("../models/reviews");
const { failedResponse } = require("../utils/failedResponse");
const { successfulResponse } = require("../utils/successfulResponse");

exports.createReview = async (req, res) => {
	try {
		const { comment, rating } = req.body;
		const { product } = req.params;
		const reviewFound =
			(await Review.findOne({
				product,
			})) === null
				? false
				: true;
		console.log(reviewFound);
		if (!reviewFound) {
			const review = await Review.create({
				comment,
				rating,
				product,
				user: req.user,
			});
			successfulResponse(res, { review });
		} else {
			failedResponse(res, null, 400, "review on this product already exit");
		}
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getReviews = async (req, res) => {
	try {
		const reviews = await Review.find();
		successfulResponse(res, { reviews });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getMyReviews = async (req, res) => {
	try {
		const reviews = await Review.find({ user: req.user })
			.populate("user")
			.populate("product");
		successfulResponse(res, { reviews });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updateReview = (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
};
