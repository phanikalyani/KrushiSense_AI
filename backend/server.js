const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const cropRoutes = require("./routes/croproutes");
const yieldRoutes = require("./routes/yieldroutes");
const healthRoutes = require("./routes/healthroutes");

const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api", croproutes);
app.use("/api", yieldroutes);
app.use("/api", healthroutes);

// Test
app.get("/", (req, res) => {
  res.send("KrushiSense Backend Running 🚀");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
