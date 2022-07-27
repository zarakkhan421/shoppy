const express = require("express");
const connectDB = require("./config/db");
const cookiepParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookiepParser());
const PORT = process.env.PORT || 5000;
connectDB();

const products = require("./routes/products");
const user = require("./routes/users");
const orders = require("./routes/orders");
const categories = require("./routes/categories");

app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/orders", orders);
app.use("/api/categories", categories);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
