const http = require("http");
const routes = require("./route");

// const reqListener = (req, res) => {};

const server = http.createServer(routes.handler);

server.listen(3000);
