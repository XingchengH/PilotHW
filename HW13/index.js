const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url"); // parsing the URLs from incoming requests

const PORT = 3000;

//Parse body data from chunk
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk)); // colleting data, on() bind event handler
    req.on("end", () => {
      try {
        const json = JSON.parse(body); // decode JSON body
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
  });
};

// Alternative way to parse body data
// const parseBody = async (req) => {
//   let body = "";
//   for await (const chunk of req) {
//     body += chunk;
//   }
//   return JSON.parse(body);
// };

const getFilePath = (filename) => {
  return path.join(__dirname, "data", `${filename}.json`);
};

const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// Define Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const parts = parsedUrl.pathname.split("/"); // trying to split the, ["", todo, filename]

  if (parts[1] !== "todo" || !parts[2]) {
    sendJSON(res, 404, { message: "Invalid route" });
    return;
  }

  const filename = parts[2];
  const filePath = getFilePath(filename);

  try {
    // post data into the file
    if (req.method === "POST") {
      const body = await parseBody(req);
      const todos = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath))
        : []; // check if current file exists

      todos.push({ title: body.title, status: body.status });
      fs.writeFileSync(filePath, JSON.stringify(todos, null, 2)); // writing todos into filepath with 2 indent spacing
      sendJSON(res, 201, todos);
    } else if (req.method === "GET") {
      if (!fs.existsSync(filePath)) {
        sendJSON(res, 404, { message: "File not found" });
        return;
      }
      const data = JSON.parse(fs.readFileSync(filePath));
      sendJSON(res, 200, data);
    } else if (req.method === "PUT") {
      if (!fs.existsSync(filePath)) {
        sendJSON(res, 404, { message: "File not found" });
        return;
      }

      const body = await parseBody(req);
      let todos = JSON.parse(fs.readFileSync(filePath));

      const idx = todos.findIndex((todo) => todo.title === body.title);
      if (idx === -1) {
        sendJSON(res, 404, { message: "Unable to find Todo" });
        return;
      }

      todos[idx] = { title: body.newTitle, status: body.status };
      fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
      sendJSON(res, 200, todos);
    } else if (req.method === "DELETE") {
      if (!fs.existsSync(filePath)) {
        sendJSON(res, 404, { message: "File not found" });
        return;
      }

      const body = await parseBody(req);
      let todos = JSON.parse(fs.readFileSync(filePath));

      const filteredTodos = todos.filter((todo) => todo.title !== body.title);
      if (filteredTodos.length === todos.length) {
        sendJSON(res, 404, { message: "Todo not found" });
        return;
      }

      fs.writeFileSync(filePath, JSON.stringify(filteredTodos, null, 2));
      sendJSON(res, 200, filteredTodos);
    }
  } catch (err) {
    sendJSON(res, 500, { message: "No such method found at the Server" });
  }
});

// Create the Data folder in current folder if there is not such folder
if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

server.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});
