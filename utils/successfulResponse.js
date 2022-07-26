const successfulResponse = (
	res,
	payload,
	status = 200,
	message = "action performed succesfully",
	success = true
) => {
	return res.status(status).json({ success, message, payload });
};

module.exports = { successfulResponse };
