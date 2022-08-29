const sendUserData = (user) => {
	const userData = {
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		role: user.role,
		phoneNumber: user.phoneNumber,
		image: user.image,
	};
	return userData;
};
module.exports = sendUserData;
