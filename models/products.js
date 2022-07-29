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
// mongoose
// 	.model("Products", productSchema)
// 	.watch()
// 	.on("change", (data) => {
// 		console.log(data);
// // 	});
// productSchema.post("save", async function (f, next) {
// 	// detect if categories if getting changned and reflect that on products model
// 	// console.log(f);
// 	// console.log(next);
// });

// productSchema.post("findOneAndUpdate", async function () {
// 	//detect if categories are getting changed on a product array ,find those categories each and add them to those product each
// 	if (this._update.$set.categories) {
// 		const categories = await Categories.find();
// 		// console.log("🚀 ~ file: products.js ~ line 81 ~ categories", categories);

// 		let docIds = [];
// 		categories.forEach((category) => {
// 			docIds.push(category.id);
// 		});
// 		console.log(
// 			"🚀 ~ file: products.js ~ line 85 ~ categories.forEach ~ docIds",
// 			docIds
// 		);

// 		const categoriesToSet = this._update.$set.categories;
// 		console.log(
// 			"🚀 ~ file: products.js ~ line 92 ~ categoriesToSet",
// 			categoriesToSet
// 		);
// 		const docToUpdate = await this.model.findOne(this.getQuery());
// 		const refs = docToUpdate.categories;
// 		console.log("🚀 ~ file: products.js ~ line 93 ~ refs", refs);

// 		// const docIds = ["6", "8", "9", "10"];
// 		// console.log("🚀 ~ file: products.js ~ line 96 ~ docIds", docIds);
// 		// const refs = ["2", "6", "9"];
// 		// console.log("🚀 ~ file: products.js ~ line 98 ~ refs", refs);
// 		// const diffs = _.difference(refs, docIds);
// 		// console.log("🚀 ~ file: products.js ~ line 100 ~ diffs", diffs);
// 		// let normalizedCats = _.pullAll(refs, diffs);
// 		// console.log(
// 		// 	"🚀 ~ file: products.js ~ line 102 ~ normalizedCats",
// 		// 	normalizedCats
// 		// );
// 		// const newRefs = ["11", "12"];
// 		// console.log("🚀 ~ file: products.js ~ line 104 ~ newRefs", newRefs);
// 		// const toBeupdated = _.union(normalizedCats, newRefs);
// 		// console.log("🚀 ~ file: products.js ~ line 106 ~ toBeupdated", toBeupdated);
// 	}
// });

module.exports = mongoose.model("Products", productSchema);
