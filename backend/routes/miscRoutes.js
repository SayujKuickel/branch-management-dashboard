const express = require("express");

const router = express.Router();

const miscController = require("../controller/miscController");

router.route("/stats").get(miscController.getStats);

module.exports = router;
