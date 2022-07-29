const categories = require("../models/categories");
const Categories = require("../models/categories");
const Product = require("../models/products");
const { failedResponse } = require("../utils/failedResponse");
const { filter } = require("../utils/filter");
const { successfulResponse } = require("../utils/successfulResponse");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");

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
		const resultPerpage = 3;
		const currentPage = req.query.page || 1;
		const skip = resultPerpage * (currentPage - 1);
		// Math.ceil can be used on front end for number of pages on frontend
		if (req.query.price) {
			let conditions = filter(req.query.price);
			const count = await Product.where({ price: conditions }).count();
			const products = await Product.find()
				.where({ price: conditions })
				.limit(resultPerpage)
				.skip(skip)
				.populate("categories");
			console.log(
				"🚀 ~ file: products.js ~ line 33 ~ exports.getProducts= ~ categories",
				categories
			);
			successfulResponse(res, { count, products });
		} else {
			const count = await Product.count();
			const products = await Product.find()
				.limit(resultPerpage)
				.skip(skip)
				.populate("categories");
			console.log(
				"🚀 ~ file: products.js ~ line 41 ~ exports.getProducts= ~ categories",
				categories
			);
			successfulResponse(res, { count, products });
		}
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getProductsByCategory = async (req, res) => {
	try {
		const products = await Categories.findOne({
			slug: req.params.slug,
		}).populate("products");
		successfulResponse(res, products);
	} catch (error) {
		failedResponse(res, error);
	}
};
exports.createProduct = async (req, res) => {
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
		const id = mongoose.Types.ObjectId(req.params.id);
		const categories = await Categories.updateMany(
			{ products: req.params.id },
			{ $pull: { products: id } }
		);
		const product = await Product.findByIdAndRemove(req.params.id);
		successfulResponse(res, { product, categories });
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
