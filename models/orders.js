const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
	{
		customerDetails: {
			firstName: {
				type: String,
				required: [true, "please provide first name"],
				minLength: [3, ",min length for name is 3"],
				maxLength: [15, ",max length for name is 15"],
				trim: true,
			},
			lastName: {
				type: String,
				required: [true, "please provide last name"],
				minLength: [3, ",min length for name is 3"],
				maxLength: [15, ",max length for name is 15"],
				trim: true,
			},
			email: {
				type: String,
				required: [true, "please provide an email"],
				validate: [validator.isEmail, "should be email"],
				trim: true,
			},
			phoneNumber: {
				type: String,
				required: [true, "please provide a phone number"],
			},
		},
		deliveryAddress: {
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
			zipCode: {
				type: Number,
				required: [true, "please provide a zip code"],
			},
		},
		orderItems: [
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
				product: {
					type: mongoose.Schema.ObjectId,
					ref: "Products",
					required: [true, "please provide product reference"],
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
				shippedAt: Date,
				deliveredAt: Date,
				cancelledAt: Date,
			},
		],
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "Users",
			default: "",
		},
		totalCost: {
			type: Number,
			required: [true, "please provide total order price"],
		},

		shippingCost: {
			type: Number,
			default: 0,
			required: [true, "please provide shipping cost"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
