const express = require("express");
const { createCategory } = require("../controllers/categories");
const router = express.Router();

router.route("/").get(createCategory);

module.exports = router;
