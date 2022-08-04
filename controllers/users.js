const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { successfulResponse } = require("../utils/successfulResponse");
const { failedResponse } = require("../utils/failedResponse");
const { sendAccessToken } = require("../utils/sendAccessToken");
const { sendRefreshToken } = require("../utils/sendRefreshToken");
const { cookieOptions } = require("../config/cookieOptions");
const { verifyRefreshToken } = require("../utils/verifyRefreshToken");
const crypto = require("crypto");
const { sendMail } = require("../utils/sendMail");
const { findOneAndUpdate } = require("../models/users");

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			failedResponse(res, null, 406, "user already exist");
			return;
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		if (user) {
			const accessToken = sendAccessToken(user.id);
			const refreshToken = sendRefreshToken(user.id);
			// refersh token to be added to user concerned as well
			res.cookie("token", refreshToken, cookieOptions);

			successfulResponse(res, { user, accessToken });
		}
	} catch (error) {
		failedResponse(res, error, 406, "responded with error");
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundUser = await User.findOne({ email }).select("+password");
		if (!foundUser) {
			failedResponse(res, null, 403, "user not found");
		}
		const matchUser = await bcrypt.compare(password, foundUser.password);
		if (matchUser) {
			const accessToken = sendAccessToken(foundUser.id);
			const refreshToken = sendRefreshToken(foundUser.id);

			// refersh token to be added to user concerned as wel
			res.cookie("token", refreshToken, cookieOptions);
			// foundUser should be removed in production
			successfulResponse(res, { foundUser, matchUser, accessToken });
		}
	} catch (error) {
		failedResponse(res, error);
	}
};

exports.token = async (req, res) => {
	if (!req.cookies.token) {
		failedResponse(res, null, 401, "token not found");
	}
	const refreshToken = req.cookies.token;
	// here refresh token can be checked with one stored in database against user concerned; it may allows server side to logout later
	const decodedToken = verifyRefreshToken(res, refreshToken);
	if (!decodedToken) {
		failedResponse(res, null, 403, "invalid token");
	}
	const accessToken = sendAccessToken(decodedToken.id);
	successfulResponse(res, { accessToken });
};

exports.logout = async (req, res) => {
	if (!req.cookies.token) {
		successfulResponse(res, null);
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
		failedResponse(res, { payload: "" }, 400, `${req.body.email} not found`);
	}
	const unHashedToken = crypto.randomBytes(20).toString("hex");

	const resetLink = `${req.protocol}://${req.get(
		"host"
	)}/api/user/reset-password/${unHashedToken}`;
	const message = `Click this link ${resetLink} to reset your password`;

	await sendMail({
		email: foundUser.email,
		subject: "Reset Password",
		message,
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
	successfulResponse(res, user, 200, `email sent to ${user.email}`);
};

exports.resetPassword = async (req, res) => {
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resetToken)
		.digest("hex");
	const foundUser = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});
	if (!foundUser) {
		failedResponse(res, { payload: "" }, 404, "user not found or invalid link");
	} else if (!req.body.password) {
		failedResponse(res, { payload: "" }, 404, "enter a password");
	} else {
		foundUser.password = req.body.password;
		foundUser.resetPasswordToken = undefined;
		foundUser.resetPasswordExpire = undefined;
		await foundUser.save();

		const accessToken = sendAccessToken(foundUser.id);
		const refreshToken = sendRefreshToken(foundUser.id);
		res.cookie("token", refreshToken, cookieOptions);
		successfulResponse(res, { accessToken });
	}
};
