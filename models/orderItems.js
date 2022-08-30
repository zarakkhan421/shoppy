const mongoose = require("mongoose");
const orderItemsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please provide product name"],
		},
		price: {
			type: Number,
			required: [true, "please provide product price"],
		},
		quantity: {
			type: Number,
			required: [true, "please provide quantity of order items"],
			default: 1,
		},
		sale: {
			type: Number,
			default: 0,
			required: [true, "please provide sale"],
		},
		orderStatus: {
			type: String,
			required: [true, "please provide order status"],
			default: "processing",
			enum: ["processing", "shipped", "delivered", "cancelled"],
		},
		order: {
			type: mongoose.Schema.ObjectId,
			ref: "Orders",
			required: [true, "provide order id"],
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: "Products",
			required: [true, "provide product id"],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "Users",
		},
		shippedAt: Date,
		deliveredAt: Date,
		cancelledAt: Date,
	},
	{ timestamps: true }
);
module.exports = mongoose.model("OrdersItems", orderItemsSchema);
