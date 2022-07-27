const Category = require("../models/categories");
const { failedResponse } = require("../utils/failedResponse");
const { successfulResponse } = require("../utils/successfulResponse");
const slugify = require("slugify");
const Products = require("../models/products");

exports.getCategories = async (req, res) => {
	try {
		const category = await Category.find();
		successfulResponse(res, category);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.createCategory = async (req, res) => {
	try {
		let name = req.body.name;
		const slug = slugify(req.body.name, {
			replacement: "-",
			lower: true,
		});
		const category = await Category.create({ name, slug });
		successfulResponse(res, category);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updateCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		successfulResponse(res, category);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndRemove(req.params.id);
		successfulResponse(res, category);
	} catch (error) {
		failedResponse(res, error);
	}
};
