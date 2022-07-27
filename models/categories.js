const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "please provide category name"],
	},
	slug: {
		type: String,
		unique: true,
	},
	products: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Products",
		},
	],
});

module.exports = mongoose.model("Categories", categoriesSchema);
