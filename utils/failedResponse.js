const failedResponse = (
	res,
	serverError,
	status = 500,
	message = "failed to carry out desired action",
	success = false
) => {
	return res.status(status).json({ success, message, serverError });
};

module.exports = { failedResponse };
