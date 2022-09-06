const jwt = require("jsonwebtoken");
const { failedResponse } = require("../utils/failedResponse");

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	try {
		const accessToken =
			authHeader === undefined ? "" : authHeader.split(" ")[1];
		if (accessToken.length === 0) {
			return failedResponse(res, null, 403, "no auth header found");
		}
		const decodedToken = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);
		const loggedInUserId = decodedToken.id;
		req.user = loggedInUserId;
		next();
	} catch (error) {
		failedResponse(res, error, 403, "auth error");
	}
};

module.exports = { auth };
