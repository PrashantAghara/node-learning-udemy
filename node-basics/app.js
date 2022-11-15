const http = require("http");
const routes = require("./route");

// const reqListener = (req, res) => {};

const server = http.createServer(routes);

server.listen(3000);
