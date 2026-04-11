const Prediction = require("../models/Prediction");

exports.detectCrop = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const filename = req.file.originalname.toLowerCase();

    let result = {
      disease: "Leaf Blight",
      confidence: 92,
      recommendation: "Apply bio-fungicide and reduce excess moisture."
    };

    if (filename.includes("healthy")) {
      result = {
        disease: "Healthy Crop",
        confidence: 95,
        recommendation: "No major issue detected."
      };
    }

    await Prediction.create({
      type: "crop",
      input: { file: filename },
      result
    });

    res.json({ success: true, result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};