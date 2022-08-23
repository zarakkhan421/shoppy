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
		const product = await Product.findByIdAndUpdate(req.params.id, req.body);
		successfulResponse(res, { product });
	} catch (error) {
		failedResponse(res, error);
	}
};
