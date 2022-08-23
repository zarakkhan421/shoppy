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
		const order = await Order.findById(req.params.id).populate(
			"user",
			"name email"
		);
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user });
		successfulResponse(res, orders);
	} catch (error) {}
};

exports.shippedOrder = async (req, res) => {
	try {
		const { id, status } = req.params;
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ orderStatus: "shipped", shippedAt: Date.now() },
			{ new: true }
		);
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.deliveredOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ orderStatus: "delivered", deliveredAt: Date.now() },
			{ new: true }
		);
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.cancelledOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ orderStatus: "cancelled", cancelledAt: Date.now() },
			{ new: true }
		);
		successfulResponse(res, order);
	} catch (error) {
		failedResponse(res, error);
	}
};
