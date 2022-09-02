const express = require("express");
const {
	createOrder,
	getOrder,
	getMyOrders,
	getAllOrders,
	changeStatusToShipped,
	changeStatusToDelivered,
	changeStatusToCancelled,
	getOrderItem,
} = require("../controllers/orders");
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");
const router = express.Router();

router.route("/").get(auth, getMyOrders).post(createOrder);
router.route("/all").get(auth, roles(["admin", "editor"]), getAllOrders);

router.route("/:id").get(auth, getOrder);

module.exports = router;
