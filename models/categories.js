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
mongoose
	.model("Categories", categoriesSchema)
	.watch()
	.on("change", (data) => {
		console.log(data);
	});
module.exports = mongoose.model("Categories", categoriesSchema);
