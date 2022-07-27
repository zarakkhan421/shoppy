const express = require("express");
const {
	createOrder,
	getOrder,
	getMyOrders,
	shippedOrder,
	deliveredOrder,
	cancelledOrder,
} = require("../controllers/orders");
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");
const router = express.Router();

router.route("/mine").get(auth, getMyOrders);
router.route("/").post(createOrder);
router
	.route("/:id/shipped")
	.put(auth, roles(["admin", "editor"]), shippedOrder);
router
	.route("/:id/delivered")
	.put(auth, roles(["admin", "editor"]), deliveredOrder);
router
	.route("/:id/cancelled")
	.put(auth, roles(["admin", "editor"]), cancelledOrder);
router.route("/:id").get(auth, getOrder);

module.exports = router;
