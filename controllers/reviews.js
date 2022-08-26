const Product = require("../models/products");
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
				user: req.user,
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
			const getReviewsByProduct = await Review.find({ product });
			console.log(getReviewsByProduct);
			let ratingsArray = getReviewsByProduct.map(
				(productReview) => productReview.rating
			);
			let ratingsSum = ratingsArray.reduce(
				(total, current) => total + current,
				0
			);
			let averageRating = ratingsSum / ratingsArray.length;
			console.log(averageRating);
			await Product.findByIdAndUpdate(req.params.product, {
				ratings: averageRating,
				reviews: ratingsArray.length,
			});
			successfulResponse(res, { review });
		} else {
			failedResponse(res, null, 400, "review on this product already exit");
		}
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getReview = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id)
			.populate("user")
			.populate("product");
		successfulResponse(res, { review });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getReviews = async (req, res) => {
	try {
		const reviews = await Review.find().populate("user").populate("product");
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

exports.updateReview = async (req, res) => {
	try {
		const review = await Review.findByIdAndUpdate(
			req.params.id,
			{
				comment: req.body.comment,
				rating: req.body.rating,
			},
			{ new: true }
		);
		successfulResponse(res, review);
	} catch (error) {
		console.log(error);
	}
};

exports.deleteReview = async (req, res) => {
	try {
		console.log("www");
		console.log("dqqqqq", req.params.id);
		const review = await Review.findByIdAndRemove(req.params.id);
		successfulResponse(res, { review });
	} catch (error) {
		failedResponse(res, error);
	}
};
