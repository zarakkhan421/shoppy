const express = require("express");
const { register, login, token, logout } = require("../controllers/users");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").get(login);
router.route("/logout").get(logout);
router.route("/token").get(token);

module.exports = router;