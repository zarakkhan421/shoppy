const Product = require("../models/products");
const Review = require("../models/reviews");
const { failedResponse } = require("../utils/failedResponse");
const { filter } = require("../utils/filter");
const { successfulResponse } = require("../utils/successfulResponse");
const _ = require("lodash");
const {
	uploadImage,
	updateImage,
	deleteImage,
} = require("../utils/cloudinary");

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
		const resultPerPage = 15;
		const currentPage = req.query.page || 1;
		const skip = resultPerPage * (currentPage - 1);
		// Math.ceil can be used on front end for number of pages on frontend
		const maxProductPrice = await Product.find().sort({ price: -1 }).limit(1);
		const ratings = req.query.ratings ? req.query.ratings : 0;

		// reason for not doing if statement price and not for ratings is that for price max price had to be know prior and may required extra database query
		if (req.query.price) {
			console.log("reqprive");
			let conditions = filter(req.query.price);
			const count = await Product.where({
				price: conditions,
				ratings: { $gte: ratings },
			}).count();

			const products = await Product.find()
				.where({ price: conditions, ratings: { $gte: ratings } })
				.limit(resultPerPage)
				.skip(skip);

			return successfulResponse(res, {
				count,
				maxProductPrice: maxProductPrice[0].price,
				products,
				resultPerPage,
			});
		}

		const count = await Product.where({
			ratings: { $gte: ratings },
		}).count();

		const products = await Product.find()
			.where({ ratings: { $gte: ratings } })
			.limit(resultPerPage)
			.skip(skip);
		return successfulResponse(res, {
			count,
			maxProductPrice: maxProductPrice[0].price,
			products,
			resultPerPage,
		});
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
		const { cloudinaryResponse, imageResponse } = await uploadImage(
			req.body.image
		);
		console.log("4", imageResponse);
		const product = await Product.create({
			...req.body,
			user: req.user,
			image: {
				id: imageResponse.id,
				url: imageResponse.url,
			},
		});
		successfulResponse(res, product);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const findProduct = await Product.findById(req.params.id);
		await deleteImage(findProduct.image.id);
		const product = await Product.findByIdAndRemove(req.params.id);
		successfulResponse(res, product, 200, "deleted product");
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const onDbExists = await Product.findById(req.params.id);

		const image = req.body.image;
		const { cloudinaryResponse, imageResponse } = await updateImage(
			image,
			onDbExists
		);
		console.log("ddee", imageResponse);
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
				image: {
					id:
						imageResponse !== undefined
							? imageResponse.id
							: onDbExists.image.id,
					url:
						imageResponse !== undefined
							? imageResponse.url
							: onDbExists.image.url,
				},
			},
			{
				new: true,
			}
		);
		successfulResponse(res, { product });
	} catch (error) {
		failedResponse(res, error);
	}
};
