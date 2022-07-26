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
const router = express.Router();

router.route("/mine").get(auth, getMyOrders);
router.route("/").post(createOrder);
router.route("/:id/shipped").put(auth, shippedOrder);
router.route("/:id/delivered").put(auth, deliveredOrder);
router.route("/:id/cancelled").put(auth, cancelledOrder);
router.route("/:id").get(auth, getOrder);

module.exports = router;
