const Product = require("../models/products");
const { failedResponse } = require("../utils/failedResponse");
const { filter } = require("../utils/filter");
const { successfulResponse } = require("../utils/successfulResponse");

exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		successfulResponse(res, product);
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
				.skip(skip);
			successfulResponse(res, { count, products });
		} else {
			const count = await Product.count();
			const products = await Product.find().limit(resultPerpage).skip(skip);
			successfulResponse(res, { count, products });
		}
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.createProduct = async (req, res) => {
	try {
		//req.body = req.userId;
		req.body = {
			user: req.userId,
			...req.body,
		};
		const product = await Product.create(req.body);
		console.log("s");
		successfulResponse(res, product);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id).remove();
		successfulResponse(res, product);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updateProduct = async (req, res) => {
	try {
		//const product = await Product.findById(req.params.id); can be used to find whether or not product exist
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		successfulResponse(res, product);
	} catch (error) {
		failedResponse(res, error);
	}
};
