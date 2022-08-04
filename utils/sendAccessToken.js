const jwt = require("jsonwebtoken");
require("dotenv").config();
// takes id string not object "fneiunvwfnevn not ObjectId('efvsvsfvsfvsvsf') id not _id"
const sendAccessToken = (id) => {
	const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
	return accessToken;
};

module.exports = { sendAccessToken };
