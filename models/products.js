const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please enter product name"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "please enter product description"],
		},
		price: {
			type: Number,
			required: [true, "please enter product price"],
			default: 0,
		},
		ratings: {
			type: Number,
			default: 0,
		},
		categories: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Categories",
			},
		],
		stock: {
			type: Number,
			required: [true, "please provide stock number"],
			default: 0,
		},
		reviews: [
			{
				user: {
					type: mongoose.Schema.ObjectId,
					ref: "Users",
					required: true,
				},
				rating: {
					type: Number,
					required: [true, "please rate the product"],
				},
				comment: {
					type: String,
					required: true,
				},
			},
		],
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "Users",
			required: true,
		},
		published: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

productSchema.post("findOneAndUpdate", async function () {
	//
});

module.exports = mongoose.model("Products", productSchema);
