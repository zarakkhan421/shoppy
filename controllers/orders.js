const Order = require("../models/orders");
const { failedResponse } = require("../utils/failedResponse");
const { successfulResponse } = require("../utils/successfulResponse");
const { totalOrderCost } = require("../utils/totalOrderCost");

exports.createOrder = async (req, res) => {
	try {
		const { customerDetails, deliveryAddress, orderItems, user, shippingCost } =
			req.body;
		const totalCost = totalOrderCost(orderItems);
		const order = await Order.create({
			customerDetails,
			deliveryAddress,
			orderItems,
			user,
			totalCost,
			shippingCost,
		});
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate("user", "name email")
			.populate("orderItems.product");
		successfulResponse(res, { order });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getMyOrders = async (req, res) => {
	try {
		let orders = await Order.find({ user: req.user }).populate(
			"orderItems.product"
		);
		// const products = await Product.find({ "reviews.user": req.user });
		// // orders.map((order) => ({...order, oo}));
		// console.log("sdsd", products);
		// console.log("rrr", orders);
		successfulResponse(res, { orders });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		successfulResponse(res, { orders });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.changeStatusToShipped = async (req, res) => {
	console.log("sssf4");
	try {
		const { id, item, status } = req.params;
		const order = await Order.findOneAndUpdate(
			{ id, "orderItems._id": item },
			{
				$set: {
					"orderItems.$.orderStatus": "shipped",
					"orderItems.$.shippedAt": Date.now(),
				},
			},
			{ new: true }
		);
		console.log("4545");
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};
exports.changeStatusToDelivered = async (req, res) => {
	console.log("sssf4");
	try {
		const { id, item, status } = req.params;
		const order = await Order.findOneAndUpdate(
			{ id, "orderItems._id": item },
			{
				$set: {
					"orderItems.$.orderStatus": "delivered",
					"orderItems.$.deliveredAt": Date.now(),
				},
			},
			{ new: true }
		);
		console.log("4545");
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};
exports.changeStatusToCancelled = async (req, res) => {
	console.log("sssf4");
	try {
		const { id, item, status } = req.params;
		const order = await Order.findOneAndUpdate(
			{ id, "orderItems._id": item },
			{
				$set: {
					"orderItems.$.orderStatus": "cancelled",
					"orderItems.$.cancelledAt": Date.now(),
				},
			},
			{ new: true }
		);
		console.log("4545");
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};
