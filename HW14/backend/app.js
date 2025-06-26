const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo");

app.use("todo", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => [
  console.log(`Server is running on http://localhost:${PORT}`),
]);
