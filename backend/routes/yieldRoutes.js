const express = require("express");
const { predictYield } = require("./controllers/yieldController");

const router = express.Router();

router.post("/yield-predict", predictYield);

module.exports = router;
