const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Click</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      //   fs.writeFileSync = ("message.txt", message); //Blocking code
      //   Non Blocking Code
      fs.writeFile("message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<body><h1>Hello World</h1><h2>Hii</h2></body>");
  res.end();
};

// module.exports = requestHandler;
exports.handler = requestHandler;
