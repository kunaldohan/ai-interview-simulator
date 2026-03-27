require("dotenv").config();
const express = require("express");
const cors = require("cors");
const interviewRoutes = require("./routes/interview");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", interviewRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Smart Interview Server is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
