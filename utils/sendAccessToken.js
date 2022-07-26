const jwt = require("jsonwebtoken");
require("dotenv").config();

const sendAccessToken = (id) => {
	const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
	return accessToken;
};

module.exports = { sendAccessToken };
