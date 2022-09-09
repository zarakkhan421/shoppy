const express = require("express");

const {
	refreshAccessToken,
	register,
	login,
	logout,
	forgetPassword,
	resetPassword,
	updatePassword,
	updateProfile,
	updateRole,
	getUsers,
	getUser,
	deleteUser,
	getCheckoutDetailsById,
	getMyProfile,
	refreshAuth,
} = require("../controllers/users");

const router = express.Router();
const { auth } = require("../middleware/auth");
const { roles } = require("../middleware/roles");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/refresh-auth").post(refreshAuth);
router.route("/refresh-access-token").get(refreshAccessToken);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password/:resetToken").post(resetPassword);
router.route("/update-password").put(auth, updatePassword);
router.route("/").put(auth, updateProfile);
router.route("/update-role").put(auth, roles(["admin"]), updateRole);
router.route("/all").get(auth, roles("admin", "editor"), getUsers);
router
	.route("/:id")
	.get(auth, roles("admin", "editor"), getUser)
	.delete(auth, roles("admin"), deleteUser);
router.route("/").get(auth, getMyProfile);

router.route("/checkout-details/:id").get(auth, getCheckoutDetailsById);

module.exports = router;
