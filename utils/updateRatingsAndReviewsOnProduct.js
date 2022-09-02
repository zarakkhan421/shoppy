const Product = require("../models/products");
const Review = require("../models/reviews");
const updateRatingsAndReviewsOnProduct = async (product) => {
	const getReviewsByProduct = await Review.find({ product });
	console.log(getReviewsByProduct);
	let ratingsArray = getReviewsByProduct.map(
		(productReview) => productReview.rating
	);
	let ratingsSum = ratingsArray.reduce((total, current) => total + current, 0);
	let averageRating = ratingsSum / ratingsArray.length;
	console.log(averageRating);
	await Product.findByIdAndUpdate(product, {
		ratings: averageRating,
		reviews: ratingsArray.length,
	});
};
module.exports = { updateRatingsAndReviewsOnProduct };
