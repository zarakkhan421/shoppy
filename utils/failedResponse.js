const failedResponse = (
	res,
	payload,
	status = 500,
	message = "failed to carry out desired action",
	success = false
) => {
	return res.status(status).json({ success, message, payload });
};

module.exports = { failedResponse };
