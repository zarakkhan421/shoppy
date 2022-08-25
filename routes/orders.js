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

router.route("/").get(auth, getMyOrders);
router
	.route("/all")
	.post(createOrder)
	.get(auth, roles(["admin", "editor"]), getAllOrders);
router
	.route("/shipped/:id/:item/")
	.put(auth, roles(["admin", "editor"]), changeStatusToShipped);
router
	.route("/delivered/:id/:item/")
	.put(auth, roles(["admin", "editor"]), changeStatusToDelivered);
router
	.route("/cancelled/:id/:item/")
	.put(auth, roles(["admin", "editor"]), changeStatusToCancelled);

router.route("/:id").get(auth, getOrder);

module.exports = router;
