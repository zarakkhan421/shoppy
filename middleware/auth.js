const jwt = require("jsonwebtoken");
const { failedResponse } = require("../utils/failedResponse");

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	try {
		const accessToken = authHeader.split(" ")[1];
		const decodedToken = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);
		const loggedInUserId = decodedToken.id;
		req.user = loggedInUserId;
		next();
	} catch (error) {
		if (!authHeader || !accessToken) {
			failedResponse(
				res,
				null,
				403,
				"auth header or access token not found, please login"
			);
		} else {
			failedResponse(res, error, 403, "auth error");
		}
	}
};

module.exports = { auth };
