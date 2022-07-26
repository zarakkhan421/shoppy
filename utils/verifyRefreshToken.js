const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyRefreshToken = (res, refreshToken) => {
	try {
		const decodedToken = jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);
		return decodedToken;
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "failed to verify refresh token",
			error,
		});
	}
};
module.exports = { verifyRefreshToken };
