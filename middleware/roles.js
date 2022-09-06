const User = require("../models/users");
const { failedResponse } = require("../utils/failedResponse");

const roles = (roles) => {
	try {
		return async (req, res, next) => {
			const user = await User.findById(req.user);
			if (!roles.includes(user.role)) {
				return failedResponse(res, null, 403, "not authorized for this action");
			} else {
				next();
			}
		};
	} catch {
		failedResponse(res, error);
	}
};
module.exports = { roles };
