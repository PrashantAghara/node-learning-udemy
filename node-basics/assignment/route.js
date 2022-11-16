const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write(
      "<body><h1>Hello User</h1><form action='/create-user' method='POST'><input type='text' name='user'/><button type='submit'>Click</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<body><ul><li>User 1</li><li>User 2</li></ul></body>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const user = parseBody.split("=")[1];
      console.log(user);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<body><h1>Hello World</h1></body>");
  res.end();
};

// module.exports = requestHandler;
exports.handler = requestHandler;
