const jwt = require("jsonwebtoken");
require("dotenv").config();

const sendRefreshToken = (id) => {
	const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
	return refreshToken;
};

module.exports = { sendRefreshToken };
