const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("worldwise-api/cities.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
