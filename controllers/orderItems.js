const OrderItems = require("../models/orderItems");
const { failedResponse } = require("../utils/failedResponse");
const { successfulResponse } = require("../utils/successfulResponse");

exports.getOrdersItemsByOrderId = async (req, res) => {
	try {
		const orderItems = await OrderItems.find({
			order: req.params.order,
		}).populate("product", "image");

		successfulResponse(res, { orderItems });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getOrderItemById = async (req, res) => {
	try {
		console.log("fddffderer34");
		const orderItem = await OrderItems.findById(req.params.id).populate(
			"product"
		);
		successfulResponse(res, { orderItem });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.changeStatusToShipped = async (req, res) => {
	console.log("23");
	console.log(req.params);
	try {
		const orderItem = await OrderItems.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					orderStatus: "shipped",
					shippedAt: Date.now(),
				},
			},
			{ new: true }
		);
		console.log("fv");
		successfulResponse(res, { orderItem });
	} catch (error) {
		failedResponse(res, error);
	}
};
exports.changeStatusToDelivered = async (req, res) => {
	console.log("sssf4");
	try {
		const orderItem = await OrderItems.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					orderStatus: "delivered",
					deliveredAt: Date.now(),
				},
			},
			{ new: true }
		);
		console.log("4545");
		successfulResponse(res, { orderItem });
	} catch (error) {
		failedResponse(res, error);
	}
};
exports.changeStatusToCancelled = async (req, res) => {
	console.log("t");
	try {
		const orderItem = await OrderItems.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					orderStatus: "cancelled",
					cancelledAt: Date.now(),
				},
			},
			{ new: true }
		);
		console.log("4");
		successfulResponse(res, { orderItem });
	} catch (error) {
		failedResponse(res, error);
	}
};
