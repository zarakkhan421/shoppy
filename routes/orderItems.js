const express = require("express");
const {
	changeStatusToCancelled,
	getOrdersItemsByOrderId,
	changeStatusToShipped,
	changeStatusToDelivered,
	getOrderItemById,
} = require("../controllers/orderItems");
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");
const router = express.Router();

router.route("/order/:order").get(auth, getOrdersItemsByOrderId);
router.route("/:id").get(auth, getOrderItemById);
router
	.route("/shipped/:id")
	.put(auth, roles(["admin", "editor"]), changeStatusToShipped);
router
	.route("/delivered/:id")
	.put(auth, roles(["admin", "editor"]), changeStatusToDelivered);
router
	.route("/cancelled/:id")
	.put(auth, roles(["admin", "editor"]), changeStatusToCancelled);

module.exports = router;
