const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please provide a name"],
		},
		email: {
			type: String,
			required: [true, "please provide an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "please provide a valid password"],
			minLength: [8, "password must be at least 8 characters"],
			select: false,
		},
		role: {
			type: String,
			default: "user",
			required: true,
			enum: ["admin", "editor", "user"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
