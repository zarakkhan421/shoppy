const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		shippingInfo: {
			address: {
				type: String,
				required: [true, "please provide address"],
			},
			city: {
				type: String,
				required: [true, "please provide city"],
			},
			state: {
				type: String,
				required: [true, "please provide state"],
			},
			phoneNumber: {
				type: String,
				required: [true, "please provide a phone number"],
			},
		},
		orderItems: [
			{
				name: {
					type: String,
					required: [true, "please provide product name"],
				},
				price: {
					type: String,
					required: [true, "please provide product price"],
				},
				quantity: {
					type: Number,
					required: [true, "please provide quantity of order items"],
					default: 0,
				},
				product: {
					type: mongoose.Schema.ObjectId,
					ref: "Products",
					required: [true, "please provide product reference"],
				},
			},
		],
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "Users",
		},
		totalPrice: {
			type: Number,
			required: [true, "please provide total order price"],
		},
		orderStatus: {
			type: String,
			required: [true, "please provide order status"],
			default: "processing",
			enum: ["processing", "shipped", "delivered", "cancelled"],
		},
		shippingCost: {
			type: Number,
			default: 0,
			required: [true, "please provide shipping cost"],
		},
		shippedAt: Date,
		deliveredAt: Date,
		cancelledAt: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
