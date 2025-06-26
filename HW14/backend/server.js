const express = require("express");
const cors = require("cors"); // cross origin access since current using two different port

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); // allow prase body info

const todoRoutes = require("./routes/todos");
app.use("/todo", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => [
  console.log(`Server is running on http://localhost:${PORT}`),
]);
