const Order = require("../models/orders");
const OrderItems = require("../models/orderItems");
const { failedResponse } = require("../utils/failedResponse");
const { successfulResponse } = require("../utils/successfulResponse");
const { totalOrderCost } = require("../utils/totalOrderCost");
const { sendMail } = require("../utils/sendMail");

exports.createOrder = async (req, res) => {
	try {
		let { orderItemsData } = req.body;
		const shippingCost = req.body.orderItemsData.length * 2;
		const totalCost = totalOrderCost(orderItemsData);
		const orderData = { ...req.body, shippingCost, totalCost };
		const order = await Order.create(orderData);
		console.log("rrr", order);
		orderItemsData = orderItemsData.map((orderItem) => ({
			...orderItem,
			order: order.id,
		}));
		// send email
		await sendMail({
			email: req.body.customerDetails.email,
			subject: "Order Made",
			template: "orderMade",
			templateData: {
				customerDetails: req.body.customerDetails,
				orderItems: req.body.orderItemsData,
			},
		});
		console.log("dfdgeter");
		console.log("222", orderItemsData);
		const orderItems = await OrderItems.insertMany(orderItemsData);
		console.log("sss", orderItems);
		successfulResponse(res, { order, orderItems });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getOrder = async (req, res) => {
	try {
		console.log("ft4t45");
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
		const resultPerPage = 2;
		const currentPage = req.query.page || 1;
		const skip = resultPerPage * (currentPage - 1);
		const count = await Order.find({ user: req.user }).count();
		const orders = await Order.find({ user: req.user })
			.sort("-createdAt")
			.limit(resultPerPage)
			.skip(skip);
		successfulResponse(res, { orders, count, resultPerPage });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		const resultPerPage = 2;
		const currentPage = req.query.page || 1;
		const skip = resultPerPage * (currentPage - 1);
		const count = await Order.find().count();
		const orders = await Order.find()
			.sort("-createdAt")
			.limit(resultPerPage)
			.skip(skip);
		successfulResponse(res, { orders, count, resultPerPage });
	} catch (error) {
		failedResponse(res, error);
	}
};
