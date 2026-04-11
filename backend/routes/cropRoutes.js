const express = require("express");
const multer = require("multer");

// FIXED PATH ✅
const { detectCrop } = require("../controllers/cropController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/crop-detect", upload.single("image"), detectCrop);

module.exports = router;
