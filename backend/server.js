const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const cropRoutes = require("./routes/cropRoutes");
const yieldRoutes = require("./routes/yieldRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api", cropRoutes);
app.use("/api", yieldRoutes);
app.use("/api", healthRoutes);

// Test
app.get("/", (req, res) => {
  res.send("KrushiSense Backend Running 🚀");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
