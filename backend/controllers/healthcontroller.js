const Prediction = require("../models/Prediction");

exports.checkHealth = async (req, res) => {
  try {
    const { symptoms } = req.body;

    let result = {
      status: "Normal",
      recommendation: "Stay hydrated"
    };

    if (symptoms.toLowerCase().includes("fever")) {
      result = {
        status: "Attention Needed",
        recommendation: "Consult doctor"
      };
    }

    await Prediction.create({
      type: "health",
      input: req.body,
      result
    });

    res.json({ success: true, analysis: result });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};