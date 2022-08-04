const express = require("express");
const {
	register,
	login,
	token,
	logout,
	forgetPassword,
	resetPassword,
} = require("../controllers/users");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").get(login);
router.route("/logout").get(logout);
router.route("/token").get(token);
router.route("/forget-password").get(forgetPassword);
router.route("/reset-password/:resetToken").get(resetPassword);

module.exports = router;
