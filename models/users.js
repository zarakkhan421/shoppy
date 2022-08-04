const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "please provide a name"],
			minLength: [3, ",min length for name is 3"],
			maxLength: [15, ",max length for name is 15"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "please provide an email"],
			unique: true,
			validate: [validator.isEmail, "should be email"],
			trim: true,
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
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
