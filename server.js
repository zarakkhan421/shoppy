const express = require("express");
const connectDB = require("./config/db");
const cookiepParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookiepParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();

const products = require("./routes/products");
const user = require("./routes/users");
const orders = require("./routes/orders");

app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/orders", orders);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
