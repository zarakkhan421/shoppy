const successfulResponse = (
	res,
	serverData,
	status = 200,
	message = "action performed succesfully",
	success = true
) => {
	return res.status(status).json({ success, message, serverData });
};

module.exports = { successfulResponse };
