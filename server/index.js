require("dotenv").config();
const express = require("express");
const cors = require("cors");
const interviewRoutes = require("./routes/interview");

const app = express();
const PORT = process.env.PORT || 5000;

// 🔥 CORS FIX
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// 🔥 ROUTES
app.use("/api", interviewRoutes);

// 🔥 ROOT ROUTE
app.get("/", (req, res) => {
  res.send("🚀 Smart Interview API is running");
});

// 🔥 HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Smart Interview Server is running" });
});

// 🔥 ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});