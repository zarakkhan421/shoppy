const express = require("express");
const connectDB = require("./config/db");
// const path = require("path");
const cookiepParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookiepParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 5000;
connectDB();
path = require("path");
app.set("view engine", "ejs");
require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const products = require("./routes/products");
const user = require("./routes/users");
const orders = require("./routes/orders");
const reviews = require("./routes/reviews");
const orderItems = require("./routes/orderItems");
const User = require("./models/users");

app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/orders", orders);
app.use("/api/reviews", reviews);
app.use("/api/order-items", orderItems);

// email template testing
app.get("/forget", (req, res) => {
	res.render(path.join(__dirname, "templates/forgetPasswordEmail.ejs"), {
		resetLink: `${process.env.SERVER_URL}/forget`,
		user: { firstName: "zarak" },
	});
});
app.get("/order", (req, res) => {
	res.render(path.join(__dirname, "templates/orderMade.ejs"), {
		templateData: {
			orderItems: [
				{
					name: "rwvfervetegbv",
					price: 43,
					quantity: 2,
					sale: 2,
				},
				{
					name: "fvdv",
					price: 435,
					quantity: 2,
					sale: 2,
				},
				{
					name: "fvdv",
					price: 423,
					quantity: 1,
					sale: 3,
				},
			],
			customerDetails: {
				firstName: "eveve",
				lastName: "sfvsfvsfv",
				email: "zavssfv@gmail.com",
				phoneNumber: "343435445",
			},
		},
	});
});
app.get("/get-all-images", async (req, res) => {
	let images = await cloudinary.v2.search
		.expression("resource_type:image AND folder:shoppy/*")
		.max_results(50)
		.execute();
	const users = await User.find();
	images = images.resources.map((image) => image.public_id);
	let usersImages = [];
	for (let i = 0; i < images.length; i++) {
		for (let j = 0; j < users.length; j++) {
			if (images[i] === users[j].image.id) {
				usersImages.push({
					firstName: users[j].firstName,
					lastName: users[j].lastName,
					url: images[i],
				});
			}
		}
	}
	res.json({ images, usersImages });
});
if (process.env.NODE_ENV === "production") {
	console.log("loading static");
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
app.listen(process.env.PORT || 5000, () =>
	console.log(`server running on ${process.env.PORT}`)
);
