require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("DB Connected");
	} catch (error) {
		console.error("DB Connection failed");
		process.exit(1);
	}
};
module.exports = connectDB;
