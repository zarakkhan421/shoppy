const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyAccessToken = (res, accessToken) => {
	console.log("vvver");
	try {
		const decodedToken = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);
		return decodedToken;
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "failed to verify access token",
			error,
		});
	}
};
module.exports = { verifyAccessToken };
