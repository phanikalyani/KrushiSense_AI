const express = require("express");
const { checkHealth } = require("../controllers/healthController");

const router = express.Router();

router.post("/health-check", checkHealth);

module.exports = router;
