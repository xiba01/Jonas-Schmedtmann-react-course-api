import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const getJSONData = (filePath, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "File not found or error reading file" });
    } else {
      res.json(JSON.parse(data));
    }
  });
};

app.get("/worldwise-api/cities", (req, res) => {
  getJSONData("./worldwise-api/cities.json", res);
});

app.get("/otherproject-api/db", (req, res) => {
  getJSONData("./otherproject-api/db.json", res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
