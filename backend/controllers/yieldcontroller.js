const Prediction = require("../models/Prediction");

exports.predictYield = async (req, res) => {
  try {
    const { soilType, weather, cropType, landArea } = req.body;

    let baseYield = 20;

    if (soilType === "Black Soil") baseYield += 8;
    if (weather === "Good") baseYield += 10;
    if (cropType === "Rice") baseYield += 6;

    const estimatedYield = baseYield * Number(landArea || 1);

    const result = {
      estimatedYield: `${estimatedYield} quintals`,
      advice: "Use proper irrigation"
    };

    await Prediction.create({
      type: "yield",
      input: req.body,
      result
    });

    res.json({ success: true, prediction: result });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};