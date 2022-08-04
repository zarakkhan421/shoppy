const jwt = require("jsonwebtoken");
require("dotenv").config();
// takes id string not object "fneiunvwfnevn not ObjectId('efvsvsfvsfvsvsf') id not _id"
const sendRefreshToken = (id) => {
	const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
	return refreshToken;
};

module.exports = { sendRefreshToken };
