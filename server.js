const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

const dataPath = path.join(__dirname, "worldwise-api", "cities.json");

// Read cities.json
const readCities = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Write to cities.json
const writeCities = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
};

// GET all cities
app.get("/worldwise-api/cities", (req, res) => {
  res.json(readCities());
});

// POST - Add a new city
app.post("/worldwise-api/cities", (req, res) => {
  const cities = readCities();
  const newCity = { ...req.body, id: Date.now() }; // Generate unique ID
  cities.push(newCity);
  writeCities(cities);
  res.status(201).json(newCity);
});

// PUT - Replace a city by ID
app.put("/worldwise-api/cities/:id", (req, res) => {
  let cities = readCities();
  const { id } = req.params;
  const index = cities.findIndex((city) => city.id == id);

  if (index !== -1) {
    cities[index] = { ...req.body, id: Number(id) }; // Preserve ID
    writeCities(cities);
    res.json(cities[index]);
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

// PATCH - Update a city's properties by ID
app.patch("/worldwise-api/cities/:id", (req, res) => {
  let cities = readCities();
  const { id } = req.params;
  const index = cities.findIndex((city) => city.id == id);

  if (index !== -1) {
    cities[index] = { ...cities[index], ...req.body }; // Merge changes
    writeCities(cities);
    res.json(cities[index]);
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

// DELETE - Remove a city by ID
app.delete("/worldwise-api/cities/:id", (req, res) => {
  let cities = readCities();
  const { id } = req.params;
  const filteredCities = cities.filter((city) => city.id != id);

  if (filteredCities.length !== cities.length) {
    writeCities(filteredCities);
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Jonas-Schmedtmann-react-course-api!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
