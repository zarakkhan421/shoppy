const Product = require("../models/products");
const { failedResponse } = require("../utils/failedResponse");
const { filter } = require("../utils/filter");
const { successfulResponse } = require("../utils/successfulResponse");
const _ = require("lodash");

exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		successfulResponse(res, { product });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getProducts = async (req, res) => {
	try {
		console.log("sfd");
		const resultPerpage = 30;
		const currentPage = req.query.page || 1;
		const skip = resultPerpage * (currentPage - 1);
		// Math.ceil can be used on front end for number of pages on frontend
		const maxProductPrice = await Product.find().sort({ price: -1 }).limit(1);
		const ratings = req.query.ratings ? req.query.ratings : 0;

		// reason for not doing if statement price and not for ratings is that for price max price had to be know prior and may required extra database query
		if (req.query.price) {
			let conditions = filter(req.query.price);
			const count = await Product.where({
				price: conditions,
				ratings: { $gte: ratings },
			}).count();

			const products = await Product.find()
				.where({ price: conditions, ratings: { $gte: ratings } })
				.limit(resultPerpage)
				.skip(skip);
			console.log(products, count);
			return successfulResponse(res, {
				count,
				maxProductPrice: maxProductPrice[0].price,
				products,
			});
		}

		const count = await Product.where({
			ratings: { $gte: ratings },
		}).count();

		const products = await Product.find()
			.where({ ratings: { $gte: ratings } })
			.limit(resultPerpage)
			.skip(skip);
		return successfulResponse(res, { count, maxProductPrice, products });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getSearchedProducts = async (req, res) => {
	try {
		console.log("ererrerer");
		console.log(req.params);
		const searchedProducts = await Product.find(
			{
				$text: { $search: req.params.search_term },
			},
			{ score: { $meta: "textScore" } }
		).sort({ score: { $meta: "textScore" } });
		successfulResponse(res, { searchedProducts });
	} catch (error) {
		console.log(error);
	}
};

exports.getFeaturedProducts = async (req, res) => {
	try {
		const featuredProducts = await Product.find({ featured: true });
		const count = await Product.find({ featured: true }).count();
		successfulResponse(res, { count, featuredProducts });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getSaleProducts = async (req, res) => {
	try {
		const saleProducts = await Product.find({ sale: { $gt: 0 } });
		const count = await Product.find({ sale: { $gt: 0 } }).count();
		successfulResponse(res, { count, saleProducts });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.createProduct = async (req, res) => {
	console.log("product");
	try {
		req.body = {
			user: req.user,
			...req.body,
		};
		const product = await Product.create(req.body);
		successfulResponse(res, product);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndRemove(req.params.id);
		successfulResponse(res, product, 200, "deleted product");
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		successfulResponse(res, { product });
	} catch (error) {
		failedResponse(res, error);
	}
};

// exports.reviewProduct = async (req, res) => {
// 	try {
// 		const product = await Product.findById(req.params.id);
// 		const reviewExist =
// 			product.reviews.filter((review) => String(review.user) === req.user)
// 				.length > 0;
// 		if (reviewExist || product.reviews.length !== 0) {
// 			return failedResponse(res, null, 400, "review already exists");
// 		}
// 		console.log(req.params);
// 		const review = await Product.findByIdAndUpdate(
// 			req.params.id,
// 			{
// 				$push: {
// 					reviews: {
// 						user: req.user,
// 						product: req.params.product,
// 						order: req.body.order,
// 						rating: req.body.rating,
// 						comment: req.body.comment,
// 					},
// 				},
// 			},
// 			{
// 				new: true,
// 			}
// 		);
// 		return successfulResponse(res, review);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// exports.getAllReviews = async (req, res) => {
// 	try {
// 		const products = await Product.find()
// 			.populate("reviews.user")
// 			.populate("reviews.order");
// 		let reviews = products
// 			.map((product) => ({
// 				productName: product.name,
// 				reviews: product.reviews,
// 			}))
// 			.map((review) => ({
// 				name: review.productName,
// 				review: review.reviews,
// 			}))
// 			.filter((review) => review.length !== 0)
// 			.flat();
// 		successfulResponse(res, { reviews });
// 	} catch (error) {
// 		failedResponse(res, error);
// 	}
// };
