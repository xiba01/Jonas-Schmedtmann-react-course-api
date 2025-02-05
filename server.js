const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (or specify allowed origins)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve JSON files for worldwise-api
app.get("/worldwise-api/cities", (req, res) => {
  const dataPath = path.join(__dirname, "worldwise-api", "cities.json");
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Serve JSON files for otherproject-api
app.get("/otherproject-api/db", (req, res) => {
  const dataPath = path.join(__dirname, "otherproject-api", "db.json");
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Default route for root
app.get("/", (req, res) => {
  res.send("Welcome to Jonas-Schmedtmann-react-course-api!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
