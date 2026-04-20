const express = require("express");
const { predictYield } = require("../Controllers/yieldController");

const router = express.Router();

router.post("/yield-predict", predictYield);

module.exports = router;
