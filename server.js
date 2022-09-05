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
// app.use(express.static(path.join(__dirname, "..", "templates/styles.css")));
const PORT = process.env.PORT || 5000;
connectDB();
path = require("path");
app.set("view engine", "ejs");

const products = require("./routes/products");
const user = require("./routes/users");
const orders = require("./routes/orders");
const reviews = require("./routes/reviews");
const orderItems = require("./routes/orderItems");

app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/orders", orders);
app.use("/api/reviews", reviews);
app.use("/api/order-items", orderItems);

// email template testing
app.get("/forget", (req, res) => {
	res.render(path.join(__dirname, "templates/forgetPasswordEmail.ejs"), {
		resetLink: "http://localhost:5000/forget",
		user: { firstName: "zarak" },
	});
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
