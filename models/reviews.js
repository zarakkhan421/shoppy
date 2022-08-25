const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			required: [true, "please provide a rating"],
		},
		comment: {
			type: String,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "Users",
			required: [true, "please provide user"],
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: "Products",
			required: [true, "please provide product"],
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Reviews", reviewSchema);
