import { useState } from "react";
import axios from "axios";
import { FaLeaf, FaHeartbeat, FaChartBar, FaHistory } from "react-icons/fa";
import "./App.css";

const API_BASE = "http://localhost:5001";
const API_BASE = "https://krushisense-ai.onrender.com";

export default function App() {
  const [file, setFile] = useState(null);
  const [cropResult, setCropResult] = useState(null);
  const [yieldResult, setYieldResult] = useState(null);
  const [healthResult, setHealthResult] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const detectCrop = async () => {
    try {
      if (!file) {
        alert("Please choose an image first.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      setLoading(true);

      const res = await axios.post(`${API_BASE}/api/crop-detect`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCropResult(res.data.result);

      setHistory((prev) => [
        {
          type: "Crop",
          value: res.data.result.disease,
          time: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Crop detection error:", error);
      alert("Analyze failed. Check backend and API route.");
    } finally {
      setLoading(false);
    }
  };

  const predictYield = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/yield-predict`, {
        soilType: "Black Soil",
        weather: "Good",
        cropType: "Rice",
        landArea: 2,
      });

      setYieldResult(res.data.prediction);

      setHistory((prev) => [
        {
          type: "Yield",
          value: res.data.prediction.estimatedYield,
          time: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Yield prediction error:", error);
      alert("Yield prediction failed.");
    }
  };

  const checkHealth = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/health-check`, {
        symptoms,
      });

      setHealthResult(res.data.analysis);

      setHistory((prev) => [
        {
          type: "Health",
          value: res.data.analysis.status,
          time: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Health check error:", error);
      alert("Health check failed.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🌱 KrushiSense AI</h1>
        <p>Smart Farming • Smart Health</p>
      </header>

      <div className="grid">
        <div className="card">
          <FaLeaf size={30} />
          <h2>Crop Detection</h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button onClick={detectCrop}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          {cropResult && (
            <div className="result">
              <p>
                <b>{cropResult.disease}</b>
              </p>
              <p>{cropResult.confidence}% confidence</p>
              <p>{cropResult.recommendation}</p>
            </div>
          )}
        </div>

        <div className="card">
          <FaChartBar size={30} />
          <h2>Yield Prediction</h2>

          <button onClick={predictYield}>Predict</button>

          {yieldResult && (
            <div className="result">
              <p>
                <b>{yieldResult.estimatedYield}</b>
              </p>
              <p>{yieldResult.riskLevel}</p>
              <p>{yieldResult.advice}</p>
            </div>
          )}
        </div>

        <div className="card">
          <FaHeartbeat size={30} />
          <h2>Health Check</h2>

          <input
            placeholder="Enter symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <button onClick={checkHealth}>Analyze</button>

          {healthResult && (
            <div className="result">
              <p>
                <b>{healthResult.status}</b>
              </p>
              <p>{healthResult.recommendation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <FaHistory size={26} />
        <h2 style={{ marginTop: "10px" }}>Recent Activity</h2>

        {history.length === 0 ? (
          <p style={{ marginTop: "10px" }}>No activity yet.</p>
        ) : (
          <div className="result" style={{ marginTop: "12px" }}>
            {history.map((item, index) => (
              <p key={`${item.type}-${index}`}>
                <b>{item.type}:</b> {item.value} <br />
                <small>{item.time}</small>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
