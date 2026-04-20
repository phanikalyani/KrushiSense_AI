const express = require("express");
const { checkHealth } = require("../Controllers/healthController");

const router = express.Router();

router.post("/health-check", checkHealth);

module.exports = router;
