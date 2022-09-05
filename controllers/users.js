const User = require("../models/users");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { successfulResponse } = require("../utils/successfulResponse");
const { failedResponse } = require("../utils/failedResponse");
const { sendAccessToken } = require("../utils/sendAccessToken");
const { sendRefreshToken } = require("../utils/sendRefreshToken");
const { cookieOptions } = require("../config/cookieOptions");
const { verifyRefreshToken } = require("../utils/verifyRefreshToken");
const crypto = require("crypto");
const { sendMail } = require("../utils/sendMail");
const sendUserData = require("../utils/sendUserData");
const { cloudinary, uploadImage, updateImage } = require("../utils/cloudinary");
const ejs = require("ejs");
const path = require("path");
exports.register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			phoneNumber,
			addresses,
			image,
		} = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return failedResponse(
				res,
				null,
				406,
				"User with this email already exist"
			);
		}
		if (password !== confirmPassword) {
			return failedResponse(
				res,
				null,
				400,
				"password does not match confirm password"
			);
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// upload image
		const { cloudinaryResponse, imageResponse } = await uploadImage(image);
		console.log("sssssssssssssssssssss", cloudinaryResponse);
		const userCreated = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			phoneNumber,
			addresses,
			image: {
				id: imageResponse.id,
				url: imageResponse.url,
			},
		});

		const user = sendUserData(userCreated);
		const accessToken = sendAccessToken(user._id);
		const refreshToken = sendRefreshToken(user._id);
		// refersh token to be added to user concerned as well
		res.cookie("token", refreshToken, cookieOptions);
		successfulResponse(res, { user, accessToken });
	} catch (error) {
		failedResponse(res, error, 406, "responded with error");
	}
};

exports.login = async (req, res) => {
	console.log("sdd");
	try {
		const { email, password } = req.body;
		let foundUser = await User.findOne({ email }).select("+password");

		if (!foundUser) {
			return failedResponse(res, null, 403, "user not found");
		}
		console.log("fdd");
		const matchUser = await bcrypt.compare(password, foundUser.password);
		if (matchUser) {
			const accessToken = sendAccessToken(foundUser.id);
			const refreshToken = sendRefreshToken(foundUser.id);

			// refersh token to be added to user concerned as well
			res.cookie("token", refreshToken, cookieOptions);

			const user = sendUserData(foundUser);
			console.log(user);
			return successfulResponse(res, { user, accessToken });
		} else {
			return failedResponse(res, {}, 400, "Incorrect Credentials");
		}
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.refreshAuth = async (req, res) => {
	try {
		if (!req.cookies.token) {
			return failedResponse(res, null, 401, "token not found");
		}
		const refreshToken = req.cookies.token;
		const decodedToken = verifyRefreshToken(res, refreshToken);
		if (!decodedToken) {
			return failedResponse(res, null, 403, "invalid token");
		}
		const user = await User.findById(decodedToken.id);

		const accessToken = sendAccessToken(decodedToken.id);
		return successfulResponse(res, { user: sendUserData(user), accessToken });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updatePassword = async (req, res) => {
	try {
		const founduser = await User.findById(req.user).select("+password");

		if (!founduser) {
			return failedResponse(res, null, 400, "this user does not exist");
		}
		const matchedPassword = await bcrypt.compare(
			req.body.oldPassword,
			founduser.password
		);
		if (!matchedPassword) {
			return failedResponse(res, null, 400, "old passoword is invalid");
		}
		if (req.body.password !== req.body.confirmPassword) {
			return failedResponse(
				res,
				null,
				400,
				"password does not match confirm password"
			);
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = await User.findByIdAndUpdate(
			req.user,
			{
				password: hashedPassword,
			},
			{ new: true }
		);
		successfulResponse(res, { user }, 201, "password updated successfully");
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updateProfile = async (req, res) => {
	try {
		// destructure each value from body and not update all body by its self as it may update passowrd accidentaly with has separate route and controller
		const { firstName, lastName, phoneNumber, addresses, image } = req.body;

		const onDbExists = await User.findById(req.user);

		const { cloudinaryResponse, imageResponse } = await updateImage(
			image,
			onDbExists
		);
		const user = await User.findByIdAndUpdate(
			req.user,
			{ firstName, lastName, phoneNumber, addresses, image: imageResponse },
			{ new: true }
		);

		successfulResponse(res, { user, cloudinaryResponse }, 201, "user updated");
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.updateRole = async (req, res) => {
	try {
		const { role, email } = req.body;
		if (email === "zarakkhan421@gmail.com") {
			return failedResponse(res, null, 400, "you can not change zarak's role");
		}
		const user = await User.findOneAndUpdate(email, { role }, { new: true });
		successfulResponse(res, { user }, 201, "user role changed");
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		successfulResponse(res, { users });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		successfulResponse(res, { user });
	} catch (error) {
		failedResponse(res, error, 400, "failed to get user");
	}
};

exports.getMyProfile = async (req, res) => {
	try {
		console.log(req.user);
		const user = await User.findById(req.user);
		console.log(user);
		successfulResponse(res, { user });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.getCheckoutDetailsById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const checkoutDetails = {
			addresses: user.addresses,
			phoneNumber: user.phoneNumber,
		};
		successfulResponse(res, { checkoutDetails });
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		successfulResponse(res, { user }, 200, "user deleted");
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.refreshAccessToken = async (req, res) => {
	console.log("reached");
	if (!req.cookies.token) {
		return failedResponse(res, null, 401, "token not found");
	}
	const refreshToken = req.cookies.token;
	// here refresh token can be checked with one stored in database against user concerned; it may allows server side to logout later
	const decodedToken = verifyRefreshToken(res, refreshToken);
	if (!decodedToken) {
		return failedResponse(res, null, 403, "invalid token");
	}
	const accessToken = sendAccessToken(decodedToken.id);
	successfulResponse(res, { accessToken });
};

exports.logout = async (req, res) => {
	console.log("eeee");
	if (!req.cookies.token) {
		return successfulResponse(res, null);
	}
	// if cookie is found then search database based on email and clear it
	const refreshToken = req.cookies.token;
	if (refreshToken) {
		res.clearCookie("token", { httpOnly: true });
		successfulResponse(res, null);
	}
};

exports.forgetPassword = async (req, res) => {
	const foundUser = await User.findOne({ email: req.body.email });
	if (!foundUser) {
		return failedResponse(res, null, 400, `${req.body.email} not found`);
	}
	const unHashedToken = crypto.randomBytes(20).toString("hex");

	const resetLink = `${process.env.CLIENT_URL}/reset-password/${unHashedToken}`;
	// const message = `Click this link ${resetLink} to reset your password`;
	const html = await ejs.renderFile(
		path.join(__dirname, "../templates/forgetPasswordEmail.ejs"),
		{ resetLink, user: sendUserData(foundUser) }
	);
	await sendMail({
		email: foundUser.email,
		subject: "Reset Password",
		template: html,
	});
	const hashedToken = crypto
		.createHash("sha256")
		.update(unHashedToken)
		.digest("hex");

	const user = await User.findOneAndUpdate(
		{ email: req.body.email },
		{
			resetPasswordToken: hashedToken,
			resetPasswordExpire: Date.now() + 15 * 60 * 1000,
		}
	);
	successfulResponse(res, null, 200, `email sent to ${user.email}`);
};

exports.resetPassword = async (req, res) => {
	try {
		const resetPasswordToken = crypto
			.createHash("sha256")
			.update(req.params.resetToken)
			.digest("hex");
		const foundUser = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});
		if (!foundUser) {
			return failedResponse(res, null, 404, "user not found or invalid link");
		}
		if (!req.body.password || !req.body.confirmPassword) {
			return failedResponse(
				res,
				null,
				404,
				"enter a password and confirm password"
			);
		}
		if (req.body.password !== req.body.confirmPassword) {
			return failedResponse(
				res,
				null,
				400,
				"password does not match confirm password"
			);
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		foundUser.password = hashedPassword;
		foundUser.resetPasswordToken = undefined;
		foundUser.resetPasswordExpire = undefined;
		await foundUser.save();

		const accessToken = sendAccessToken(foundUser.id);
		const refreshToken = sendRefreshToken(foundUser.id);
		res.cookie("token", refreshToken, cookieOptions);
		successfulResponse(res, { accessToken });
	} catch (error) {
		failedResponse(res, error);
	}
};
