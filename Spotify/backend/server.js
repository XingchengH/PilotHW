const express = require("express");
const cors = require("cors"); // cross origin access since current using two different port

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); // allow prase body info

// const userRoutes = require("./routes/user");
// const songRoutes = require("./routes/song");

// app.use("/user", userRoutes);
// app.use("/song", songRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
