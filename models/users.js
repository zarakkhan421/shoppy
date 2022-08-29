const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
	{
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
		phoneNumber: {
			type: String,
		},
		addresses: {
			shippingAddress: {
				address: {
					type: String,
				},
				state: {
					type: String,
				},
				city: {
					type: String,
				},
				zipCode: {
					type: Number,
				},
			},
			homeAddress: {
				address: {
					type: String,
				},
				state: {
					type: String,
				},
				city: {
					type: String,
				},
				zipCode: {
					type: Number,
				},
			},
		},
		image: {
			id: {
				type: String,
				required: [true, "please provide an image id"],
			},
			url: {
				type: String,
				required: [true, "please provide an image url"],
			},
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
