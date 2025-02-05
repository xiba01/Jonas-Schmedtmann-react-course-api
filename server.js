const jsonServer = require("json-server");
const express = require("express");

const app = express();

const worldwiseRouter = jsonServer.router("worldwise-api/cities.json");

app.use("/worldwise", worldwiseRouter);

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
